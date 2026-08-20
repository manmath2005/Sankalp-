import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw, 
  X, 
  Sparkles, 
  AlertCircle,
  Lock,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OtpVerificationModal = () => {
  const { otpModalData, setOtpModalData, verifyEmailOtp, resendEmailOtp, showToast } = useApp();
  const [otpInput, setOtpInput] = useState('');
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(30);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  if (!otpModalData) return null;

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await verifyEmailOtp(otpInput.trim());
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    resendEmailOtp();
    setResendCooldown(45);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-white/80 shadow-float-lg overflow-hidden flex flex-col text-left">
        
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white relative">
          <button
            onClick={() => setOtpModalData(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <Mail className="w-4 h-4 text-sky-400" />
            <span className="text-[11px] font-extrabold text-sky-400 uppercase tracking-widest">
              {otpModalData.isLogin ? "Secure Login Verification" : "Email Verification Step"}
            </span>
          </div>

          <h2 className="text-xl font-black text-white">
            {otpModalData.isLogin ? `Sign In Verification` : "Verify Your Account"}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            We sent a secure 6-digit code to <strong className="text-sky-300 font-mono">{otpModalData.userEmail}</strong>
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">

          {/* Email Dispatch Notice Card */}
          <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <Send className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-700 space-y-0.5">
              <p className="font-extrabold text-slate-900">Check your Email Inbox</p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Open your email app and enter the 6-digit OTP code sent from <strong>Sankalp NGO Network</strong>. Valid for 5 minutes.
              </p>
            </div>
          </div>

          {/* OTP Form Input */}
          <form onSubmit={handleVerify} className="space-y-4 pt-1">
            
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2 animate-scale-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2 text-center">
                Enter 6-Digit OTP:
              </label>
              <input
                type="text"
                maxLength={6}
                required
                autoFocus
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                className="w-full text-center py-3.5 text-2xl font-black font-mono tracking-[0.4em] rounded-2xl border-2 border-slate-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 focus:outline-none transition-all bg-white shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={otpInput.length !== 6}
              className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 press-effect ${
                otpInput.length === 6
                  ? 'btn-glow-primary'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {otpModalData.isLogin ? "Verify OTP & Log In" : "Verify OTP & Activate Account"}
            </button>

            {/* Live Email Dispatch Status & Emergency Code Fallback */}
            <div className="p-3 rounded-2xl bg-sky-50 dark:bg-slate-800/80 border border-sky-200/80 dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-sky-800 dark:text-sky-300 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>Dispatched via AgentMail SES</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Inbox delay? Code: <strong className="font-mono text-sky-700 dark:text-sky-300">{otpModalData.generatedOtp}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOtpInput(otpModalData.generatedOtp);
                  showToast("Security code inserted!", "info");
                }}
                className="px-2.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-[10px] uppercase tracking-wider shadow-xs press-effect shrink-0"
              >
                Insert Code
              </button>
            </div>

            {/* Resend Action */}
            <div className="pt-2 text-center flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Didn't receive the email?</span>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className={`font-extrabold flex items-center gap-1 transition-colors ${
                  resendCooldown > 0
                    ? 'text-slate-400 cursor-not-allowed'
                    : 'text-sky-600 hover:text-sky-700 underline'
                }`}
              >
                <RefreshCw className={`w-3 h-3 ${resendCooldown > 0 ? '' : 'hover:rotate-180 transition-transform'}`} />
                {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend Code'}
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
