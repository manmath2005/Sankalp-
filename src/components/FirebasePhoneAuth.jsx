import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  ShieldCheck, 
  Send, 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { 
  initRecaptchaVerifier, 
  sendFirebasePhoneOtp, 
  confirmFirebasePhoneOtp, 
  formatFirebaseError,
  isFirebaseConfigured 
} from '../lib/firebase';
import { useApp } from '../context/AppContext';

export const FirebasePhoneAuth = ({ 
  expectedRole = 'VOLUNTEER', 
  isRegistration = false, 
  registrationData = {}, 
  onSuccess = null, 
  onCancel = null 
}) => {
  const { loginWithFirebasePhone, registerUser, showToast } = useApp();

  // Step state: 'PHONE_INPUT' -> 'OTP_INPUT' -> 'VERIFIED'
  const [step, setStep] = useState('PHONE_INPUT');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [simulatedCode, setSimulatedCode] = useState('');
  
  // 6 separate box digits
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [resendCooldown, setResendCooldown] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = useRef([]);
  const recaptchaVerifierRef = useRef(null);

  // Initialize invisible reCAPTCHA on component mount
  useEffect(() => {
    try {
      recaptchaVerifierRef.current = initRecaptchaVerifier('recaptcha-container');
    } catch (e) {
      console.warn("reCAPTCHA verifier initialization notice:", e);
    }

    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          // ignore
        }
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // 5-minute countdown clock
  useEffect(() => {
    if (step !== 'OTP_INPUT') return;

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
  }, [step]);

  // Resend cooldown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0 && step === 'OTP_INPUT') {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown, step]);

  // Focus first OTP box when entering OTP step
  useEffect(() => {
    if (step === 'OTP_INPUT' && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    }
  }, [step]);

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePhoneInputChange = (e) => {
    const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(clean);
    if (errorMessage) setErrorMessage('');
  };

  const fillDemoPhone = () => {
    if (expectedRole === 'VOLUNTEER') setPhoneNumber('9876543210');
    else if (expectedRole === 'NGO_PARTNER' || expectedRole === 'NGO_STAFF') setPhoneNumber('9822334455');
    else setPhoneNumber('9911223344');
    setErrorMessage('');
  };

  // Step 1: Send Phone OTP via Firebase
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const clean = phoneNumber.replace(/\D/g, '');
    if (clean.length < 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const fullPhoneNumber = `+91${clean}`;
    setLoading(true);

    try {
      // Ensure recaptcha verifier is ready
      if (!recaptchaVerifierRef.current && isFirebaseConfigured) {
        recaptchaVerifierRef.current = initRecaptchaVerifier('recaptcha-container');
      }

      const result = await sendFirebasePhoneOtp(fullPhoneNumber, recaptchaVerifierRef.current);
      setConfirmationResult(result.confirmationResult);
      if (result.simulatedOtp) {
        setSimulatedCode(result.simulatedOtp);
      }

      // Reset OTP states and move to step 2
      setDigits(['', '', '', '', '', '']);
      setTimeLeft(300);
      setResendCooldown(30);
      setStep('OTP_INPUT');

      showToast(`6-Digit OTP sent to ${fullPhoneNumber}! Valid for 5 minutes.`, 'info');
    } catch (err) {
      console.error("Firebase sendPhoneOtp error:", err);
      setErrorMessage(formatFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle 6-digit OTP input boxes
  const handleDigitChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, '');

    // Handle paste inside single box
    if (cleanVal.length > 1) {
      handlePastedCode(cleanVal);
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = cleanVal;
    setDigits(newDigits);
    if (errorMessage) setErrorMessage('');

    // Auto-advance
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit on 6th digit
    const fullCode = newDigits.join('');
    if (fullCode.length === 6) {
      executeVerifyOtp(fullCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
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

    const focusIndex = Math.min(cleanNumbers.length, 5);
    inputRefs.current[focusIndex]?.focus();

    if (cleanNumbers.length === 6) {
      executeVerifyOtp(cleanNumbers);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    handlePastedCode(pastedData);
  };

  const autoFillSimulatedCode = () => {
    const code = simulatedCode || '123456';
    handlePastedCode(code);
  };

  // Step 3: Verify OTP Code with Firebase
  const executeVerifyOtp = async (codeToVerify) => {
    const fullCode = codeToVerify || digits.join('');
    if (fullCode.length !== 6) {
      setErrorMessage('Please enter all 6 digits of the verification code.');
      return;
    }

    if (timeLeft <= 0) {
      setErrorMessage('This verification code has expired (5-minute limit). Please click "Resend Code".');
      return;
    }

    setErrorMessage('');
    setIsVerifying(true);

    try {
      const userCredential = await confirmFirebasePhoneOtp(confirmationResult, fullCode);
      const firebaseUser = userCredential.user;

      // Registration vs Login completion
      if (isRegistration && registrationData) {
        // Complete registration with Firebase-verified phone
        const registered = await registerUser({
          ...registrationData,
          phone: `+91 ${phoneNumber}`,
          isPhoneVerified: true
        }, 'MOBILE');

        setStep('VERIFIED');
        showToast("Account created and phone number verified successfully!", "success");
        if (onSuccess) onSuccess(registered);
      } else {
        // Log in user linked to phone
        const loggedUser = await loginWithFirebasePhone(firebaseUser, phoneNumber, expectedRole);
        setStep('VERIFIED');
        showToast(`Signed in successfully with Firebase Phone OTP! Welcome, ${loggedUser.name}!`, "success");
        if (onSuccess) onSuccess(loggedUser);
      }
    } catch (err) {
      console.error("Firebase confirmPhoneOtp error:", err);
      setErrorMessage(formatFirebaseError(err));
      // Focus first box for retry
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setDigits(['', '', '', '', '', '']);
    setErrorMessage('');
    await handleSendOtp();
  };

  return (
    <div className="w-full space-y-4">
      {/* Invisible reCAPTCHA container required by Firebase */}
      <div id="recaptcha-container"></div>

      {errorMessage && (
        <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-xs font-semibold text-red-700 dark:text-red-300 flex items-start gap-2 animate-scale-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="flex-1">{errorMessage}</span>
        </div>
      )}

      {/* STATE 1: PHONE NUMBER INPUT */}
      {step === 'PHONE_INPUT' && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Mobile Phone Number
              </label>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                ⚡ Firebase Realtime SMS
              </span>
            </div>

            <div className="flex rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 bg-white dark:bg-slate-900 transition-all shadow-xs">
              <div className="flex items-center px-3.5 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs select-none">
                <span className="mr-1.5 text-base">🇮🇳</span> +91
              </div>
              <input
                type="tel"
                required
                maxLength={10}
                value={phoneNumber}
                onChange={handlePhoneInputChange}
                placeholder="98765 43210"
                className="w-full bg-transparent px-3 py-2.5 text-slate-900 dark:text-white text-xs font-bold font-mono tracking-wider focus:outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>Enter 10-digit Indian mobile number</span>
              <button
                type="button"
                onClick={fillDemoPhone}
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
              >
                Auto-fill Demo
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || phoneNumber.length < 10}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 press-effect disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Initializing reCAPTCHA & Sending OTP...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send 6-Digit OTP</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* STATE 2: 6-DIGIT OTP VERIFICATION INPUT */}
      {step === 'OTP_INPUT' && (
        <div className="space-y-4 animate-scale-in">
          
          {/* Header Status & Live Countdown Clock */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                SMS Code Dispatched to
              </div>
              <div className="text-xs font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                +91 {phoneNumber.slice(0, 5)} •••••
              </div>
            </div>

            {/* Live 5-Min Timer Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-black border transition-all ${
              timeLeft <= 60 && timeLeft > 0
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-600 dark:text-amber-400 animate-pulse'
                : (timeLeft === 0 
                  ? 'bg-red-500/20 border-red-500/50 text-red-600 dark:text-red-400' 
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400')
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{timeLeft === 0 ? 'EXPIRED' : formatCountdown(timeLeft)}</span>
            </div>
          </div>

          {/* Dev Simulation Helper if non-prod keys */}
          {!isFirebaseConfigured && simulatedCode && (
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between">
              <span>Dev OTP: <strong className="font-mono text-slate-900 dark:text-white font-bold">{simulatedCode}</strong></span>
              <button
                type="button"
                onClick={autoFillSimulatedCode}
                className="px-2 py-0.5 rounded-lg bg-amber-200 dark:bg-amber-800 hover:bg-amber-300 text-[10px] font-extrabold"
              >
                Auto-fill
              </button>
            </div>
          )}

          {/* 6 Individual Square Numeric Boxes */}
          <div>
            <label className="block text-center text-xs font-bold text-slate-600 dark:text-slate-400 mb-2.5">
              Enter the 6-digit code sent via SMS
            </label>
            <div className="flex justify-between gap-1.5 sm:gap-2 max-w-xs mx-auto" onPaste={handlePaste}>
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  value={digit}
                  disabled={timeLeft <= 0}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-10 h-12 sm:w-11 sm:h-13 text-center text-lg sm:text-xl font-bold font-mono rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:outline-none transition-all shadow-xs disabled:opacity-50"
                />
              ))}
            </div>
          </div>

          {/* Verify & Actions */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={() => executeVerifyOtp()}
              disabled={isVerifying || digits.join('').length < 6 || timeLeft <= 0}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 press-effect disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Code with Firebase...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isRegistration ? "Verify & Complete Registration" : "Verify & Sign In"}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => { setStep('PHONE_INPUT'); setErrorMessage(''); }}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-bold transition"
              >
                ← Change Number
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0}
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold disabled:opacity-50 disabled:no-underline"
              >
                {resendCooldown > 0 ? `Resend Code in ${resendCooldown}s` : "Resend OTP"}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* STATE 3: VERIFIED SUCCESS */}
      {step === 'VERIFIED' && (
        <div className="p-6 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 animate-scale-in">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-black text-slate-900 dark:text-white">Phone Authentication Verified</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Authenticated via Firebase (+91 {phoneNumber}). Redirecting to your dashboard...
          </p>
        </div>
      )}
    </div>
  );
};
