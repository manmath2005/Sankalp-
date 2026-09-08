import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Smartphone,
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw, 
  X, 
  Sparkles, 
  AlertCircle,
  Lock,
  Send,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OtpVerificationModal = () => {
  const { otpModalData, setOtpModalData, verifyEmailOtp, resendEmailOtp, showToast } = useApp();
  
  // 6 separate box digits
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(30);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = useRef([]);

  // Timer: 5-minute countdown clock
  useEffect(() => {
    if (!otpModalData) return;
    
    // Reset inputs when modal opens
    setDigits(['', '', '', '', '', '']);
    setError('');
    setResendCooldown(30);

    // Calculate remaining seconds if expiresAt is provided
    if (otpModalData.expiresAt) {
      const remaining = Math.max(0, Math.floor((otpModalData.expiresAt - Date.now()) / 1000));
      setTimeLeft(remaining > 0 ? remaining : 300);
    } else {
      setTimeLeft(300);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [otpModalData]);

  // Timer: Resend cooldown
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Focus the first input box when modal opens
  useEffect(() => {
    if (otpModalData && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [otpModalData]);

  if (!otpModalData) return null;

  const formatMinutes = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentOtpValue = digits.join('');

  const submitOtp = async (code) => {
    if (code.length !== 6) return;
    if (timeLeft <= 0) {
      setError('This verification code has expired (5-minute limit). Please click "Resend Code" to get a new one.');
      return;
    }
    setError('');
    setIsVerifying(true);
    try {
      await verifyEmailOtp(code);
    } catch (err) {
      setError(err.message || 'Invalid verification code. Please try again.');
      // Auto highlight and focus back on first box for retry
      inputRefs.current[0]?.focus();
      inputRefs.current[0]?.select();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleInputChange = (index, value) => {
    // Only accept numeric inputs
    const cleanVal = value.replace(/\D/g, '');
    
    // If pasted or multi-char input inside an individual box:
    if (cleanVal.length > 1) {
      handlePastedCode(cleanVal);
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = cleanVal;
    setDigits(newDigits);

    // Auto advance to next box
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto trigger verify if all 6 filled
    const fullCode = newDigits.join('');
    if (fullCode.length === 6) {
      submitOtp(fullCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Move back and clear previous
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePastedCode = (pastedText) => {
    const cleanNumbers = pastedText.replace(/\D/g, '').slice(0, 6);
    if (!cleanNumbers) return;

    const newDigits = ['', '', '', '', '', ''];
    for (let i = 0; i < cleanNumbers.length; i++) {
      newDigits[i] = cleanNumbers[i];
    }
    setDigits(newDigits);

    // Focus on the next empty or last box
    const focusIndex = Math.min(cleanNumbers.length, 5);
    inputRefs.current[focusIndex]?.focus();

    if (cleanNumbers.length === 6) {
      submitOtp(cleanNumbers);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    handlePastedCode(pastedData);
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setDigits(['', '', '', '', '', '']);
    setError('');
    resendEmailOtp();
    setResendCooldown(45);
    setTimeLeft(300); // Reset 5-minute timer
    inputRefs.current[0]?.focus();
  };

  const isMobileAuth = Boolean(otpModalData.userPhone);
  const identifierDisplay = otpModalData.userPhone 
    ? otpModalData.userPhone 
    : otpModalData.userEmail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md horizon-glass-panel rounded-3xl border border-slate-800/90 bg-slate-900/95 shadow-2xl overflow-hidden flex flex-col text-left">
        <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-1 z-10"></div>
        
        {/* Header Banner */}
        <div className="p-6 bg-slate-950/90 text-white border-b border-slate-800 relative">
          <button
            onClick={() => setOtpModalData(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            {isMobileAuth ? (
              <Smartphone className="w-4 h-4 text-emerald-400" />
            ) : (
              <Mail className="w-4 h-4 text-amber-400" />
            )}
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              {isMobileAuth ? "Mobile OTP Authentication" : (otpModalData.isLogin ? "Secure Login Verification" : "Account Verification Step")}
            </span>
          </div>

          <h2 className="text-xl font-black text-white">
            {otpModalData.isLogin ? `Verify One-Time Password` : "Activate Your Account"}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Enter the 6-digit code delivered in real-time to <strong className="text-amber-300 font-mono">{identifierDisplay}</strong>
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">

          {/* Delivery & Expiration Status Bar */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-xs">
                {isMobileAuth ? <Smartphone className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-white">
                  {isMobileAuth ? "SMS & Email OTP Dispatched" : "Delivered to Primary Inbox"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {isMobileAuth ? "Auto-synced with phone & email record" : "Real-time delivery from Sankalp Network"}
                </p>
              </div>
            </div>

            {/* Live 5-minute countdown chip */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black font-mono tracking-tight border ${
              timeLeft < 60 
                ? 'bg-red-950/80 text-red-400 border-red-800 animate-pulse' 
                : 'bg-slate-900 text-amber-300 border-slate-800'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{formatMinutes(timeLeft)}</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-xs font-semibold text-red-200 flex items-center gap-2 animate-scale-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form with 6-Digit Individual Box Layout */}
          <form onSubmit={(e) => { e.preventDefault(); submitOtp(currentOtpValue); }} className="space-y-5">
            
            <div>
              <div className="flex items-center justify-between mb-2.5 px-1">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-300">
                  Enter 6-Digit Code:
                </label>
                <span className="text-[10px] text-slate-400 font-medium">
                  Auto-advances &amp; Paste supported
                </span>
              </div>

              {/* 6 Individual Square Input Boxes */}
              <div className="grid grid-cols-6 gap-2 sm:gap-3" onPaste={handlePaste}>
                {digits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className={`w-full h-13 sm:h-14 text-center text-2xl font-black font-mono rounded-2xl border-2 transition-all bg-slate-950 text-white shadow-inner focus:outline-none ${
                      digit 
                        ? 'border-amber-500 bg-amber-950/30 text-amber-300 ring-2 ring-amber-500/20' 
                        : 'border-slate-700/80 hover:border-slate-600 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Verify CTA Button */}
            <button
              type="submit"
              disabled={currentOtpValue.length !== 6 || isVerifying || timeLeft <= 0}
              className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 press-effect ${
                currentOtpValue.length === 6 && timeLeft > 0 && !isVerifying
                  ? 'bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 shadow-amber-500/10'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{otpModalData.isLogin ? "Verify Code & Sign In" : "Verify Code & Activate"}</span>
                </>
              )}
            </button>

            {/* Resend Action with cooldown */}
            <div className="pt-1 text-center flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs text-slate-400">
              <span>Didn't receive the one-time code?</span>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className={`font-black flex items-center gap-1 transition-colors ${
                  resendCooldown > 0
                    ? 'text-slate-500 cursor-not-allowed'
                    : 'text-amber-400 hover:text-amber-300 underline'
                }`}
              >
                <RefreshCw className={`w-3 h-3 ${resendCooldown > 0 ? '' : 'hover:rotate-180 transition-transform'}`} />
                {resendCooldown > 0 ? `Resend new code in ${resendCooldown}s` : 'Resend Code (5 min validity)'}
              </button>
            </div>

          </form>

        </div>

        {/* Security Footer Note */}
        <div className="px-6 py-3 bg-slate-950/90 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span>Encrypted with 5-Minute Time-Based Expiration • Do not share this code</span>
        </div>

      </div>
    </div>
  );
};
