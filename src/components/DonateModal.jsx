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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b4332]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-sage/80 shadow-float-lg overflow-hidden flex flex-col text-left max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-forest-700 via-forest-600 to-forest-700 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-sage transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 text-sand-300 fill-sand-300" />
            <span className="text-xs font-bold text-sage uppercase tracking-widest">
              Direct Community & Earth Support
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-white">
            Support Our Active Initiatives
          </h2>
          <p className="text-xs text-sage/90 mt-1">
            100% transparent funding. 80G / 501(c)(3) tax exemption receipts issued immediately.
          </p>
        </div>

        {/* Modal Body */}
        {!isCompleted ? (
          <form onSubmit={handleDonateSubmit} className="p-6 space-y-5 overflow-y-auto">
            
            {/* Frequency Toggle */}
            <div className="flex bg-sand-100 p-1 rounded-2xl border border-sand-300/60 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => setFrequency('once')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  frequency === 'once'
                    ? 'bg-forest-700 text-white shadow-sm'
                    : 'text-charcoal-500 hover:text-charcoal-700'
                }`}
              >
                One-Time Gift
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                  frequency === 'monthly'
                    ? 'bg-forest-700 text-white shadow-sm'
                    : 'text-charcoal-500 hover:text-charcoal-700'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-300" /> Monthly Impact
              </button>
            </div>

            {/* Select Initiative Category */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2">
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
                        ? 'bg-forest-50 border-forest-600 text-forest-800 shadow-sm ring-1 ring-forest-600'
                        : 'bg-white border-sand-200 text-charcoal-600 hover:bg-sand-50'
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
                <label className="text-xs font-bold text-charcoal-700 uppercase tracking-wider">
                  Select Amount ({currency})
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="text-xs font-bold bg-sand-100 border border-sand-300 text-forest-900 rounded-lg px-2 py-0.5"
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
                    className={`py-2.5 rounded-xl text-sm font-extrabold border transition-all ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-forest-700 text-white border-forest-800 shadow-md scale-[1.02]'
                        : 'bg-white border-sand-200 text-charcoal-700 hover:bg-sand-50'
                    }`}
                  >
                    {currency === 'INR' ? '₹' : '$'}{amt}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="mt-2.5 relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-charcoal-400">
                  Custom:
                </span>
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomChange}
                  placeholder="Enter other amount"
                  className="w-full pl-20 pr-4 py-2 rounded-xl border border-sand-300 text-xs font-bold text-forest-900 focus:ring-2 focus:ring-forest-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="grid sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs font-medium focus:ring-2 focus:ring-forest-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Tax Exemption Email Receipt
                </label>
                <input
                  type="email"
                  required
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="priya@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-sand-300 text-xs font-medium focus:ring-2 focus:ring-forest-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Donation Button */}
            <button
              type="submit"
              disabled={isProcessing || !finalAmount}
              className="w-full py-3.5 rounded-xl btn-glow-forest font-extrabold text-xs tracking-wider uppercase shadow-lg flex items-center justify-center gap-2 press-effect"
            >
              <Heart className="w-4 h-4 text-sand-300 fill-sand-300" />
              {isProcessing ? 'Processing Secure Donation...' : `Complete Donation of ${currency} ${finalAmount}`}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal-400">
              <Lock className="w-3.5 h-3.5 text-forest-600" />
              <span>256-bit SSL Encrypted • 80G Certified NGO Network</span>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-forest-100 text-forest-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-forest-900">
              Thank You for Your Generosity!
            </h3>
            <p className="text-xs text-charcoal-600 max-w-md mx-auto leading-relaxed">
              Your contribution of <strong>{currency} {finalAmount}</strong> allocated to <strong>{cause}</strong> has been received. An official 80G tax deductible receipt was generated for <strong>{donorEmail}</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-forest-700 text-white text-xs font-bold shadow hover:bg-forest-800"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
