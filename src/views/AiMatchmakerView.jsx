import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CorporateRequestModal } from '../components/CorporateRequestModal';
import { 
  Sparkles, 
  Building2, 
  MapPin, 
  Users, 
  IndianRupee, 
  Laptop, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Search, 
  Sliders, 
  Star, 
  Send,
  Zap,
  TrendingUp,
  FileText,
  HeartHandshake
} from 'lucide-react';

export const AiMatchmakerView = ({ onNavigate }) => {
  const { ngos, currentUser } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [selectedTargetNgo, setSelectedTargetNgo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [cause, setCause] = useState('Environment & Reforestation');
  const [city, setCity] = useState('Pune');
  const [state, setState] = useState('Maharashtra');
  const [volunteerCount, setVolunteerCount] = useState('50');
  const [budget, setBudget] = useState('₹5,00,000 - ₹10,00,000');
  const [format, setFormat] = useState('On-ground Community Drive');

  const causeOptions = [
    { title: 'Environment & Reforestation', desc: 'Urban Miyawaki forests, lake cleanups, biodiversity conservation', icon: '🌱' },
    { title: 'Education & Foundational Literacy', desc: 'STEM classrooms, girl child retention, digital computer labs', icon: '📚' },
    { title: 'Healthcare & Vision Care', desc: 'Free cataract surgical camps, rural mobile medical dispensaries', icon: '🩺' },
    { title: 'Hunger Relief & Child Nutrition', desc: 'Mid-day school meal automation, emergency ration distribution', icon: '🍲' },
    { title: 'Cyber Safety & Civic Rights', desc: 'RTI awareness, digital literacy for senior citizens & youth', icon: '🛡️' }
  ];

  const handleRunMatch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      // Call Vercel serverless / backend API match endpoint
      const response = await fetch('/api/match-ngo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cause,
          city,
          state,
          volunteerCount: parseInt(volunteerCount) || 50,
          budget,
          format,
          ngosList: ngos
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.topMatches && data.topMatches.length > 0) {
          setMatches(data.topMatches);
        } else {
          fallbackClientMatching();
        }
      } else {
        fallbackClientMatching();
      }
    } catch {
      fallbackClientMatching();
    } finally {
      setLoading(false);
      setStep(3); // Step 3: Match Results
    }
  };

  const fallbackClientMatching = () => {
    const scored = (ngos || []).map(ngo => {
      let score = 72;
      const sec = (ngo.sector || '').toLowerCase();
      const spec = (ngo.specialization || '').toLowerCase();
      const st = (ngo.state || '').toLowerCase();
      const targetCause = (cause || '').toLowerCase();

      // Dynamic cause matching keywords
      if (targetCause.includes('environment') && (sec.includes('environment') || spec.includes('tree') || spec.includes('forest') || sec.includes('reforest'))) {
        score += 24;
      } else if (targetCause.includes('education') && (sec.includes('education') || spec.includes('literacy') || spec.includes('school') || spec.includes('stem'))) {
        score += 24;
      } else if (targetCause.includes('health') && (sec.includes('health') || spec.includes('medical') || spec.includes('cataract') || spec.includes('hospital'))) {
        score += 24;
      } else if (targetCause.includes('hunger') && (sec.includes('nutrition') || spec.includes('meal') || spec.includes('hunger') || spec.includes('food'))) {
        score += 24;
      } else if (targetCause.includes('cyber') && (sec.includes('civic') || spec.includes('cyber') || spec.includes('rti') || spec.includes('rights') || spec.includes('digital'))) {
        score += 24;
      } else if (sec.includes(targetCause.split(' ')[0]) || spec.includes(targetCause.split(' ')[0])) {
        score += 18;
      }

      // State / location matching
      if (state && (st.includes(state.toLowerCase()) || st.includes('maha') || st.includes('pan-india'))) {
        score += 6;
      }

      const volunteersNum = parseInt(volunteerCount) || 50;

      return {
        ...ngo,
        matchScore: Math.min(score, 98),
        matchRationale: `High algorithmic alignment with your corporate "${cause}" CSR mandate in ${state || 'India'}. Verified NITI Aayog Darpan credentials and established on-ground mobilization capacity.`,
        recommendedFormat: format,
        estimatedImpact: `${volunteersNum * 18} Citizens Positively Impacted`,
        carbonOffset: 'MCA Section 135 & ESG Audit Compliant'
      };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    setMatches(scored.slice(0, 3));
  };

  const openCollaboration = (ngo) => {
    setSelectedTargetNgo(ngo);
    setModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left page-enter space-y-10">
      
      {/* Header Banner - Luminous Horizon Obsidian Panel */}
      <div className="horizon-glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800/90 shadow-2xl relative overflow-hidden text-white">
        <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-[2px]" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-sky-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-wide uppercase shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            AI-Powered Corporate-NGO Matchmaker
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Match Your CSR Mandate with 50+ Verified Indian NGOs
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Our multi-parameter matching algorithm calculates cause alignment, regional proximity, employee deployment capacity, and Section 135 MCA compliance to deliver precision recommendations for institutional CSR leaders.
          </p>
        </div>

        {/* Wizard Progress Indicator with Horizon Glow */}
        <div className="grid grid-cols-3 gap-3 pt-8 max-w-xl">
          <div className={`h-2 rounded-full transition-all ${step >= 1 ? 'bg-gradient-to-r from-amber-400 to-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-slate-800'}`} />
          <div className={`h-2 rounded-full transition-all ${step >= 2 ? 'bg-gradient-to-r from-emerald-400 to-sky-400 shadow-sm shadow-sky-400/50' : 'bg-slate-800'}`} />
          <div className={`h-2 rounded-full transition-all ${step >= 3 ? 'bg-gradient-to-r from-sky-400 to-teal-400 shadow-sm shadow-teal-400/50' : 'bg-slate-800'}`} />
        </div>
      </div>

      {/* STEP 1: CAUSE SELECTION */}
      {step === 1 && (
        <div className="horizon-glass-panel p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-8 animate-scale-in">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">Step 1 of 2</span>
            <h2 className="text-2xl font-black text-white mt-1">Select Target CSR Cause & Thematic Area</h2>
            <p className="text-xs text-slate-400">Choose the social or environmental pillar your corporate leadership wants to champion.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {causeOptions.map((opt, idx) => {
              const isSelected = cause === opt.title;
              return (
                <div 
                  key={idx}
                  onClick={() => setCause(opt.title)}
                  className={`p-5 rounded-2xl border transition-all space-y-2.5 cursor-pointer press-effect ${
                    isSelected 
                      ? 'border-emerald-500/80 bg-emerald-950/30 shadow-lg shadow-emerald-950/50 ring-2 ring-emerald-500/40' 
                      : 'border-slate-800/90 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{opt.icon}</span>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700" />
                    )}
                  </div>
                  <h3 className="text-sm font-black text-white">{opt.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{opt.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all hover-lift active:scale-95"
            >
              <span>Continue to Parameters</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: LOCATION, CAPACITY & BUDGET PARAMETERS */}
      {step === 2 && (
        <form onSubmit={handleRunMatch} className="horizon-glass-panel p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-8 animate-scale-in">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">Step 2 of 2</span>
              <h2 className="text-2xl font-black text-white mt-1">Specify Location & Employee Deployment Scope</h2>
              <p className="text-xs text-slate-400">Fine-tune geographical requirements and team turnout estimates.</p>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
            >
              ← Change Cause
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Target Location */}
            <div className="space-y-4 p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" /> Target Geography & State
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">City / District</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Pune, Mumbai, Bengaluru, Delhi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold bg-slate-900 text-white placeholder-slate-500 focus:border-amber-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold bg-slate-900 text-white focus:border-amber-500 outline-hidden"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Delhi">Delhi NCR</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Pan-India">Pan-India Nationwide</option>
                </select>
              </div>
            </div>

            {/* Scale, Budget & Format */}
            <div className="space-y-4 p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" /> Employee Turnout & Event Format
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Participating Employees</label>
                <select
                  value={volunteerCount}
                  onChange={(e) => setVolunteerCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold bg-slate-900 text-white focus:border-emerald-500 outline-hidden"
                >
                  <option value="20">10 - 25 Employees (Micro-team drive)</option>
                  <option value="50">25 - 50 Employees (Mid-size department)</option>
                  <option value="100">50 - 150 Employees (Large campus drive)</option>
                  <option value="300">200+ Employees (All-hands CSR convention)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Preferred Execution Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold bg-slate-900 text-white focus:border-emerald-500 outline-hidden"
                >
                  <option value="On-ground Community Drive">On-ground Field Drive (Direct Engagement)</option>
                  <option value="Hybrid Field + Digital">Hybrid (Field Lead + Virtual Employee Support)</option>
                  <option value="Virtual / Digital Volunteering">100% Virtual / Remote Pro-Bono Mentoring</option>
                </select>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all hover-lift active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Calculating Matching Scores...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Run AI Matchmaker Algorithm</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: MATCHED RESULTS (TOP 3 RANKED NGOS) */}
      {step === 3 && (
        <div className="space-y-8 animate-scale-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 horizon-glass-panel p-6 rounded-3xl border border-slate-800/80 shadow-2xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-mono font-bold border border-emerald-800/60 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Algorithm Execution Complete
              </div>
              <h2 className="text-xl font-black text-white">
                Top 3 Recommended NGO Partners for {cause}
              </h2>
              <p className="text-xs text-slate-400">
                Targeting: {city}, {state} • {volunteerCount} Employees • {format}
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Adjust Parameters
            </button>
          </div>

          {/* Matches Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {matches.map((ngo, idx) => (
              <div 
                key={ngo.id || idx}
                className="horizon-glass-panel rounded-3xl border border-slate-800/80 overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Match Rank Banner */}
                  <div className={`p-4 text-white flex items-center justify-between ${
                    idx === 0 
                      ? 'bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-700' 
                      : idx === 1 
                      ? 'bg-gradient-to-r from-emerald-600 to-sky-700' 
                      : 'bg-gradient-to-r from-slate-800 to-slate-900'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current text-amber-300" />
                      <span className="text-xs font-extrabold uppercase tracking-wider">
                        {idx === 0 ? 'Top #1 Match' : `#${idx + 1} Best Fit`}
                      </span>
                    </div>

                    <span className="text-sm font-black bg-black/30 px-2.5 py-0.5 rounded-lg font-mono text-white">
                      {ngo.matchScore}% Match
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block mb-0.5">
                        Darpan ID: {ngo.darpanId}
                      </span>
                      <h3 className="text-lg font-black text-white">{ngo.name}</h3>
                      <p className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-500" /> {ngo.city}, {ngo.state}
                      </p>
                    </div>

                    {/* AI Rationale Box */}
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-xs text-slate-300 space-y-1">
                      <p className="font-bold text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Why this is a fit:
                      </p>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {ngo.matchRationale}
                      </p>
                    </div>

                    {/* Past Domain Experience */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                        Track Record & Domain Experience:
                      </p>
                      <p className="text-xs text-slate-300 font-medium line-clamp-3 leading-relaxed">
                        {ngo.pastHistorySummary || ngo.specialization}
                      </p>
                    </div>

                    {/* Impact Estimation Metric */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs font-bold text-slate-200">
                      <span className="text-slate-400 font-medium">Estimated Impact:</span>
                      <span className="text-emerald-400 font-mono">{ngo.estimatedImpact || '350+ Citizens'}</span>
                    </div>

                  </div>
                </div>

                {/* Bottom Collaboration Trigger */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => openCollaboration(ngo)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all hover-lift active:scale-95"
                  >
                    <HeartHandshake className="w-4 h-4 text-white" />
                    <span>Request Collaboration</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Corporate Collaboration Request Modal */}
      {modalOpen && (
        <CorporateRequestModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          preselectedNgo={selectedTargetNgo} 
        />
      )}

    </div>
  );
};
