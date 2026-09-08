import React, { useState } from 'react';
import { 
  Heart, 
  X, 
  CheckCircle2, 
  DollarSign, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  CreditCard, 
  Building2, 
  Lock 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DonateModal = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [cause, setCause] = useState('Reforestation');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [frequency, setFrequency] = useState('once'); // 'once', 'monthly'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const presetAmounts = [25, 50, 100, 250, 500];

  const handlePresetClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    if (val) setSelectedAmount(Number(val));
  };

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      showToast(`Thank you ${donorName || 'generous friend'}! Your donation of ${currency} ${finalAmount} was successfully recorded.`, 'success');
    }, 1200);
  };

  const handleClose = () => {
    setIsCompleted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl horizon-glass-panel rounded-3xl border border-slate-800/90 bg-slate-900/95 shadow-2xl overflow-hidden flex flex-col text-left max-h-[90vh]">
        <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-1 z-20"></div>
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-950/90 text-white border-b border-slate-800 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-300 transition-colors border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
              Direct Community &amp; Earth Support
            </span>
          </div>

          <h2 className="text-2xl font-black text-white">
            Support Our Active Initiatives
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            100% transparent funding. 80G / 501(c)(3) tax exemption receipts issued immediately.
          </p>
        </div>

        {/* Modal Body */}
        {!isCompleted ? (
          <form onSubmit={handleDonateSubmit} className="p-6 space-y-5 overflow-y-auto">
            
            {/* Frequency Toggle */}
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => setFrequency('once')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all ${
                  frequency === 'once'
                    ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                One-Time Gift
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 ${
                  frequency === 'monthly'
                    ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3 text-slate-950" /> Monthly Impact
              </button>
            </div>

            {/* Select Initiative Category */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Allocate Contribution To:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Reforestation', label: '🌱 Reforestation' },
                  { id: 'Clean Water', label: '💧 Clean Water' },
                  { id: 'Education', label: '📚 Girl STEM & Civics' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCause(item.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      cause === item.id
                        ? 'bg-amber-950/30 border-amber-500 text-white shadow-sm ring-1 ring-amber-500'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preset Amounts */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Select Amount ({currency})
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="text-xs font-bold bg-slate-950 border border-slate-800 text-amber-300 rounded-lg px-2 py-0.5"
                >
                  <option value="USD">USD ($)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {presetAmounts.map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handlePresetClick(amt)}
                    className={`py-2.5 rounded-xl text-sm font-black border transition-all ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 border-amber-400 shadow-md scale-[1.02]'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    {currency === 'INR' ? '₹' : '$'}{amt}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="mt-2.5 relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">
                  Custom:
                </span>
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomChange}
                  placeholder="Enter other amount"
                  className="w-full pl-20 pr-4 py-2 rounded-xl border border-slate-700/80 bg-slate-950 text-xs font-bold text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="grid sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700/80 bg-slate-950 text-xs font-bold text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Tax Exemption Email Receipt
                </label>
                <input
                  type="email"
                  required
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="priya@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700/80 bg-slate-950 text-xs font-bold text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Submit Donation Button */}
            <button
              type="submit"
              disabled={isProcessing || !finalAmount}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-black text-xs tracking-wider uppercase shadow-lg flex items-center justify-center gap-2 press-effect shadow-amber-500/10"
            >
              <Heart className="w-4 h-4 text-slate-950 fill-current" />
              {isProcessing ? 'Processing Secure Donation...' : `Complete Donation of ${currency} ${finalAmount}`}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-bit SSL Encrypted • 80G Certified NGO Network</span>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">
              Thank You for Your Generosity!
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your contribution of <strong>{currency} {finalAmount}</strong> allocated to <strong>{cause}</strong> has been received. An official 80G tax deductible receipt was generated for <strong>{donorEmail}</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 text-xs font-black shadow-lg"
              >
                Close &amp; Return
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
