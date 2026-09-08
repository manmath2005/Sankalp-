import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  KeyRound, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowLeft 
} from 'lucide-react';

export const ForgotPasswordView = ({ onNavigate }) => {
  const { requestPasswordResetOtp, completePasswordReset, showToast } = useApp();

  // Multi-step Flow: Step 1 = Request OTP, Step 2 = Enter OTP & New Password, Step 3 = Success
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(45);

  const [activeServerOtp, setActiveServerOtp] = useState(null);

  useEffect(() => {
    let timer;
    if (step === 2 && resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, resendCooldown]);

  // Step 1: Send OTP to User's Registered Email
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const result = await requestPasswordResetOtp(email);
      if (result?.otpCode) {
        setActiveServerOtp(result.otpCode);
      }
      setStep(2);
      setResendCooldown(45);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setErrorMessage('');
    setLoading(true);

    try {
      const result = await requestPasswordResetOtp(email);
      if (result?.otpCode) {
        setActiveServerOtp(result.otpCode);
      }
      setResendCooldown(45);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP & Save New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match. Please verify.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await completePasswordReset(email, otpInput, newPassword, activeServerOtp);
      setStep(3);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 text-left page-enter">
      <div className="horizon-glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/90 bg-slate-900/90 shadow-2xl relative overflow-hidden backdrop-blur-2xl space-y-6">
        <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-1"></div>
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">
                Account Recovery &amp; Password Reset
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {step === 1 && "Enter your registered email to receive a 6-digit reset code"}
                {step === 2 && "Enter the verification code sent to your email & choose a new password"}
                {step === 3 && "Password updated successfully"}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('volunteer-login')}
            className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="grid grid-cols-3 gap-2">
          <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-gradient-to-r from-amber-500 to-emerald-500' : 'bg-slate-800'}`} />
          <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-gradient-to-r from-amber-500 to-emerald-500' : 'bg-slate-800'}`} />
          <div className={`h-1.5 rounded-full transition-all ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-800'}`} />
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-800 text-xs font-semibold text-red-200 flex items-center gap-2 animate-scale-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Registered Account Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.org or name@example.com"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-700/80 bg-slate-950 text-xs font-bold text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all placeholder:text-slate-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                We will dispatch a secure 6-digit one-time password (OTP) directly to this email inbox.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 press-effect ${
                email
                  ? 'bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 shadow-amber-500/10'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending Verification Code...</span>
                </>
              ) : (
                <>
                  <span>Send Password Reset OTP Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: Enter OTP & Set New Password */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4 animate-scale-in">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">Reset Code Sent To:</span>
                <strong className="font-mono text-white">{email}</strong>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-amber-400 hover:underline font-bold"
              >
                Change Email
              </button>
            </div>

            {/* 6-Digit OTP */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 text-center">
                Enter 6-Digit Email OTP Code:
              </label>
              <input
                type="text"
                maxLength={6}
                required
                autoFocus
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                className="w-full text-center py-3 text-2xl font-black font-mono tracking-[0.4em] rounded-2xl border-2 border-amber-500/40 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/20 focus:outline-none transition-all bg-slate-950 text-amber-300 shadow-inner"
              />
            </div>

            {/* New Password */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-700/80 bg-slate-950 text-xs font-bold text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-950 text-xs font-bold text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otpInput.length !== 6 || !newPassword}
              className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 press-effect ${
                otpInput.length === 6 && newPassword
                  ? 'bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 shadow-amber-500/10'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying &amp; Resetting Password...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify OTP &amp; Save New Password</span>
                </>
              )}
            </button>

            {/* Resend Action */}
            <div className="pt-2 text-center flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>Didn't receive the email?</span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0}
                className={`font-extrabold flex items-center gap-1 transition-colors ${
                  resendCooldown > 0
                    ? 'text-slate-500 cursor-not-allowed'
                    : 'text-amber-400 hover:text-amber-300 underline'
                }`}
              >
                <RefreshCw className={`w-3 h-3 ${resendCooldown > 0 ? '' : 'hover:rotate-180 transition-transform'}`} />
                {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend Code'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 3 && (
          <div className="text-center py-6 space-y-4 animate-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white">Password Reset Successfully!</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your password has been updated securely. You can now use your new password to sign into any of the role portals.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('volunteer-login')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-black text-xs shadow-lg transition-all press-effect"
              >
                Go to Volunteer Sign In →
              </button>
              <button
                onClick={() => onNavigate('company-login')}
                className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs press-effect"
              >
                Company Sign In
              </button>
              <button
                onClick={() => onNavigate('ngo-login')}
                className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs press-effect"
              >
                NGO Portal
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
