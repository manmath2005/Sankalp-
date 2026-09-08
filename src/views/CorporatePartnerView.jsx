import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CorporateRequestModal } from '../components/CorporateRequestModal';
import { HorizonGlowDivider, HorizonBadge } from '../components/HorizonPrimitives';
import { 
  Building2, 
  Landmark, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Send, 
  Globe2, 
  Award, 
  Star, 
  Calendar, 
  MapPin, 
  Clock, 
  BarChart3, 
  Shield, 
  Heart, 
  Sparkles, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Check 
} from 'lucide-react';

export const CorporatePartnerView = ({ onNavigate }) => {
  const { ngos, pastEvents, corporateRequests, currentUser } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTargetNgo, setSelectedTargetNgo] = useState(null);
  const [activeSection, setActiveSection] = useState('directory'); // 'directory', 'history', 'tracker'
  
  // Directory Filters
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNgoDetail, setSelectedNgoDetail] = useState(null);

  const isCompanyUser = currentUser && currentUser.role === 'COMPANY_PARTNER';

  // Filter NGOs
  const filteredNgos = (ngos || []).filter(ngo => {
    const matchesSector = sectorFilter === 'ALL' || (ngo.primarySectors && ngo.primarySectors.includes(sectorFilter));
    const matchesSearch = searchQuery === '' || 
      ngo.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ngo.specialization && ngo.specialization.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ngo.city && ngo.city.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSector && matchesSearch;
  });

  const openRequestForNgo = (ngo) => {
    setSelectedTargetNgo(ngo);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left page-enter">
      
      {/* Welcome / Header Banner - Luminous Horizon Glass */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-slate-800/90 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-emerald-400 to-sky-500 opacity-90" />
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/20 shrink-0">
            {isCompanyUser ? ((currentUser?.companyName || currentUser?.name || currentUser?.email || 'C').charAt(0).toUpperCase()) : <Building2 className="w-7 h-7" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {isCompanyUser ? (currentUser?.companyName || currentUser?.name || 'Institutional Partner') : "Host an Institutional Awareness Drive"}
              </h1>
              <HorizonBadge variant={isCompanyUser ? "emerald" : "sky"}>
                {isCompanyUser ? "Verified Institutional Partner" : "Govt Offices • MNCs • Colleges • Schools"}
              </HorizonBadge>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {isCompanyUser 
                ? `${currentUser.email} • Select an accredited NGO below to conduct verified awareness drives`
                : "Browse verified 80G/12A accredited NGOs, inspect past audit tracks, and submit event drive requests with official HR/CEO sanction letters."
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {!isCompanyUser && (
            <button
              onClick={() => onNavigate('company-login')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-sm press-effect flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-sky-400" /> Sign In as Institution
            </button>
          )}

          <button
            onClick={() => onNavigate('esg-report')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-500/20 press-effect flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" /> 1-Click ESG/MCA Report
          </button>

          <button
            onClick={() => onNavigate('matchmaker')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 press-effect flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> AI CSR Matchmaker
          </button>
          
          <button
            onClick={() => { setSelectedTargetNgo(null); setModalOpen(true); }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-sm press-effect flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-emerald-400" /> Book General Event Request
          </button>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => onNavigate('esg-report')}
          className="px-4 py-2.5 rounded-xl text-xs font-black transition-all press-effect flex items-center gap-1.5 bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> MCA Section 135 & ESG Report Generator
        </button>
        <button 
          onClick={() => onNavigate('matchmaker')}
          className="px-4 py-2.5 rounded-xl text-xs font-black transition-all press-effect flex items-center gap-1.5 bg-amber-950/60 text-amber-300 border border-amber-500/40 hover:bg-amber-900/60"
        >
          <Sparkles className="w-4 h-4 text-amber-400" /> AI Event Matchmaker Wizard
        </button>
        <button 
          onClick={() => setActiveSection('directory')} 
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all press-effect flex items-center gap-1.5 ${activeSection === 'directory' ? 'bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 text-slate-950 font-black shadow-lg' : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
        >
          <Globe2 className="w-4 h-4" /> Browse NGOs for Event Conduction ({ngos?.length || 0})
        </button>
        <button 
          onClick={() => setActiveSection('history')} 
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all press-effect flex items-center gap-1.5 ${activeSection === 'history' ? 'bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 text-slate-950 font-black shadow-lg' : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
        >
          <Calendar className="w-4 h-4" /> Past Conducted Drives & History ({pastEvents?.length || 0})
        </button>
        <button 
          onClick={() => setActiveSection('tracker')} 
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all press-effect flex items-center gap-1.5 ${activeSection === 'tracker' ? 'bg-gradient-to-r from-amber-500 via-emerald-500 to-sky-500 text-slate-950 font-black shadow-lg' : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
        >
          <FileText className="w-4 h-4" /> My Event Requests ({corporateRequests?.length || 0})
        </button>
      </div>

      {/* SECTION 1: MULTI-NGO DIRECTORY */}
      {activeSection === 'directory' && (
        <div className="space-y-6 animate-float-up">
          
          {/* Search & Sector Filters Bar */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 p-5 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search NGOs by name, specialization, or city (e.g. Cyber Security, Mental Health, Mumbai)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-950/70 text-white placeholder-slate-400 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Sector Filter Pills */}
              <div className="flex flex-wrap gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/80 shrink-0">
                {[
                  { id: 'ALL', label: 'All Sectors' },
                  { id: 'Government Office', label: 'Govt Offices' },
                  { id: 'Public Office', label: 'Corporate / MNC' },
                  { id: 'College', label: 'Colleges' },
                  { id: 'School', label: 'Schools' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSectorFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all press-effect ${
                      sectorFilter === tab.id
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* NGO Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite">
            {filteredNgos.map((ngo, idx) => (
              <div 
                key={ngo.id}
                className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 shadow-xl hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div className="p-6 space-y-4">
                  
                  {/* Top Bar: Icon + Badges */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${ngo.logoBg || 'from-sky-600 to-indigo-600'} text-white flex items-center justify-center font-black text-xl shadow-lg shrink-0`}>
                        {(ngo.name || 'N').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-black text-white">{ngo.name}</h3>
                          <span className="inline-flex items-center gap-1 bg-emerald-950/80 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                            <CheckCircle2 className="w-2.5 h-2.5" /> 80G Certified
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="bg-sky-950/80 text-sky-300 font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-sky-500/40">
                            Darpan: {ngo.darpanId || 'Verified'}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {ngo.city}, {ngo.state || 'India'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-xl shrink-0">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-black text-amber-300">{ngo.rating || '4.9'}</span>
                    </div>
                  </div>

                  {/* Domain & Campaign Focus */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-950/80 text-indigo-300 text-[11px] font-extrabold border border-indigo-500/40">
                        🎯 {ngo.sector || 'Social Impact'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      {ngo.specialization || ngo.tagline}
                    </p>
                  </div>

                  {/* Official Contacts */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="font-semibold">{ngo.phone || '011-26972351'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <a href={`mailto:${ngo.email}`} className="font-mono text-[11px] font-bold text-sky-400 hover:underline">
                        {ngo.email || 'contact@ngo.org'}
                      </a>
                    </div>
                  </div>

                  {/* Conduction History Snippet */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 leading-relaxed">
                    <span className="font-bold">Track Record:</span> {ngo.pastHistorySummary}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-950/80 border-t border-slate-800/90 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedNgoDetail(ngo)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all press-effect"
                  >
                    View History & Audit
                  </button>
                  <button
                    onClick={() => openRequestForNgo(ngo)}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black shadow-md transition-all press-effect flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Request Event Drive
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: PAST EVENT HISTORY & AUDIT */}
      {activeSection === 'history' && (
        <div className="space-y-6 animate-float-up">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 p-6 space-y-2">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-400" />
              Verifiable Completed Event History & Task Audit Logs
            </h2>
            <p className="text-xs text-slate-400">Inspect completed drives with impact metrics and partner testimonials for corporate due diligence.</p>
          </div>

          <div className="space-y-5">
            {pastEvents?.map((evt) => (
              <div key={evt.id} className="relative overflow-hidden rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 p-6 shadow-lg hover:border-slate-700 transition-all">
                <div className="flex flex-col md:flex-row gap-5">
                  <img src={evt.image} alt={evt.title} className="w-full md:w-48 h-36 object-cover rounded-2xl shadow-md border border-slate-800" />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-950/80 text-sky-300 text-[10px] font-extrabold border border-sky-500/40">{evt.category}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/40">{evt.mode}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{evt.completedDate}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-white">{evt.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{evt.summary}</p>
                    
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="text-center p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                        <p className="text-sm font-black text-sky-400 font-mono">{evt.attendees}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Attendees</p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                        <p className="text-sm font-black text-emerald-400 font-mono">{evt.volunteersEngaged}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Volunteers</p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                        <p className="text-sm font-black text-amber-400 font-mono">{evt.certificatesIssued}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">Certificates</p>
                      </div>
                    </div>

                    {/* Partner Feedback */}
                    <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-[10px] font-extrabold text-white">{evt.partnerName}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 italic">"{evt.partnerFeedback}"</p>
                    </div>

                    {/* Tasks Completed */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {evt.tasksCompleted?.map((t, tidx) => (
                        <span key={tidx} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-950/70 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: MY SUBMITTED REQUESTS */}
      {activeSection === 'tracker' && (
        <div className="space-y-4 animate-float-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">Your Submitted Event Requests</h2>
              <p className="text-xs text-slate-400">Track real-time status of your awareness drive requests sent to NGOs</p>
            </div>
            <button 
              onClick={() => { setSelectedTargetNgo(null); setModalOpen(true); }} 
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black shadow-md press-effect flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> + New Request
            </button>
          </div>

          {corporateRequests && corporateRequests.length > 0 ? (
            <div className="space-y-3">
              {corporateRequests.map((req) => (
                <div key={req.id} className="relative overflow-hidden rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/90 p-5 shadow-md hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{req.id}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">{req.type}</span>
                      {req.targetNgoName && (
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-950/80 text-sky-300 text-[10px] font-bold border border-sky-500/30">
                          Assigned NGO: {req.targetNgoName}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white">{req.organizationName}</h4>
                    <p className="text-xs text-slate-300">Topic: <strong className="text-white">"{req.proposedTopic}"</strong> • {req.proposedMode} • {req.proposedDate}</p>
                    {req.permissionLetterName && (
                      <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Sanction NOC: {req.permissionLetterName}
                      </p>
                    )}
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold shrink-0 ${
                    req.status === 'Approved' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40' :
                    req.status === 'Completed' ? 'bg-sky-950/80 text-sky-300 border border-sky-500/40' :
                    'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 p-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-sm font-bold text-white">No event requests submitted yet</p>
              <p className="text-xs text-slate-400">Browse the NGO directory above, choose an organization, and submit your first awareness drive request!</p>
            </div>
          )}
        </div>
      )}

      {/* NGO Full Detail Modal */}
      {selectedNgoDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col text-left max-h-[90vh]">
            <div className="p-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${selectedNgoDetail.logoBg || 'from-sky-600 to-indigo-600'} text-white flex items-center justify-center font-bold text-lg`}>
                  {(selectedNgoDetail.name || 'N').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-extrabold">{selectedNgoDetail.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">Reg: {selectedNgoDetail.registrationNo} • Darpan: {selectedNgoDetail.darpanId || 'N/A'}</p>
                </div>
              </div>
              <button onClick={() => setSelectedNgoDetail(null)} className="text-slate-400 hover:text-white p-2 text-sm font-bold">✕</button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mission Statement & Focus</h4>
                <p className="text-sm text-slate-200 mt-1 font-medium">{selectedNgoDetail.tagline}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Track Record & Audit Summary</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedNgoDetail.pastHistorySummary}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Accreditations & Compliance</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNgoDetail.accreditations?.map((acc, aidx) => (
                    <span key={aidx} className="px-3 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {acc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedNgoDetail(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-slate-700"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const target = selectedNgoDetail;
                    setSelectedNgoDetail(null);
                    openRequestForNgo(target);
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black shadow-md press-effect flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Book Event with {selectedNgoDetail.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Request Modal with Selected NGO pre-filled */}
      <CorporateRequestModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        targetNgo={selectedTargetNgo}
      />
    </div>
  );
};
