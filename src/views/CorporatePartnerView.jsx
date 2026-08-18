import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CorporateRequestModal } from '../components/CorporateRequestModal';
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
  const [activeSection, setActiveSection] = useState('directory'); // 'directory', 'history', 'request', 'tracker'
  
  // Directory Filters
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNgoDetail, setSelectedNgoDetail] = useState(null);

  // GATE: Must be logged in as COMPANY_PARTNER
  if (!currentUser || currentUser.role !== 'COMPANY_PARTNER') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 page-enter">
        <div className="glass-panel p-10 rounded-3xl border border-indigo-200 shadow-float space-y-5">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-sky-400 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce-soft">
            <Shield className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            Institutional Login Required
          </h2>
          
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Companies, government offices, colleges, and schools must <strong>register or sign in</strong> to their Institutional Partner account before browsing verified NGO profiles, inspecting track records, and submitting awareness drive requests.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('company-login')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold text-xs shadow-lg press-effect flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Go to Company Login / Register Portal
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2 text-left max-w-sm mx-auto">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest text-center">Why Registration is Required:</p>
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span>Browse National Directory of 80G/12A accredited partner NGOs</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span>Select specific NGOs to conduct tailored onfield/online drives</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span>Upload HR/CEO sanction letters with end-to-end audit tracking</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter NGOs
  const filteredNgos = (ngos || []).filter(ngo => {
    const matchesSector = sectorFilter === 'ALL' || (ngo.primarySectors && ngo.primarySectors.includes(sectorFilter));
    const matchesSearch = searchQuery === '' || 
      ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-indigo-200 shadow-sm bg-gradient-to-r from-indigo-50 via-sky-50 to-emerald-50 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-float-up">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">{currentUser.companyName || currentUser.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-extrabold border border-indigo-200">
                Verified Institutional Partner
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">{currentUser.email} • Select an accredited NGO below to conduct awareness drives</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={() => onNavigate('esg-report')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs shadow-md press-effect flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" /> 📊 1-Click ESG/MCA Report
          </button>

          <button
            onClick={() => onNavigate('matchmaker')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md press-effect flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> AI CSR Matchmaker
          </button>
          
          <button
            onClick={() => { setSelectedTargetNgo(null); setModalOpen(true); }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white font-bold text-xs shadow-md press-effect flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Book General Event Request
          </button>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => onNavigate('esg-report')}
          className="px-4 py-2.5 rounded-xl text-xs font-black transition-all press-effect flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 hover:bg-emerald-200"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-700" /> MCA Section 135 & ESG Report Generator
        </button>
        <button 
          onClick={() => onNavigate('matchmaker')}
          className="px-4 py-2.5 rounded-xl text-xs font-black transition-all press-effect flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
        >
          <Sparkles className="w-4 h-4 text-amber-700" /> AI Event Matchmaker Wizard
        </button>
        <button 
          onClick={() => setActiveSection('directory')} 
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all press-effect flex items-center gap-1.5 ${activeSection === 'directory' ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
        >
          <Globe2 className="w-4 h-4" /> Browse NGOs for Event Conduction ({ngos?.length || 0})
        </button>
        <button 
          onClick={() => setActiveSection('history')} 
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all press-effect flex items-center gap-1.5 ${activeSection === 'history' ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
        >
          <Calendar className="w-4 h-4" /> Past Conducted Drives & History ({pastEvents.length})
        </button>
        <button 
          onClick={() => setActiveSection('tracker')} 
          className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all press-effect flex items-center gap-1.5 ${activeSection === 'tracker' ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`}
        >
          <FileText className="w-4 h-4" /> My Event Requests ({corporateRequests.length})
        </button>
      </div>

      {/* SECTION 1: MULTI-NGO DIRECTORY */}
      {activeSection === 'directory' && (
        <div className="space-y-6 animate-float-up">
          
          {/* Search & Sector Filters Bar */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search NGOs by name, specialization, or city (e.g. Cyber Security, Mental Health, Mumbai)..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                />
              </div>

              {/* Sector Filter Pills */}
              <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 shrink-0">
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
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all press-effect ${
                      sectorFilter === tab.id
                        ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* NGO Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredNgos.map((ngo, idx) => (
              <div 
                key={ngo.id}
                className={`glass-panel rounded-3xl border border-slate-200 shadow-sm hover-lift overflow-hidden flex flex-col justify-between animate-float-up stagger-${(idx % 6) + 1}`}
              >
                <div className="p-6 space-y-4">
                  
                  {/* Top Bar: Icon + Badges */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${ngo.logoBg || 'from-sky-600 to-indigo-600'} text-white flex items-center justify-center font-black text-xl shadow-md shrink-0`}>
                        {ngo.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-black text-slate-900">{ngo.name}</h3>
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-2.5 h-2.5" /> 80G Certified
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="bg-sky-50 text-sky-800 font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-sky-200">
                            Darpan: {ngo.darpanId || 'Verified'}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {ngo.city}, {ngo.state || 'India'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-xl shrink-0">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-black text-amber-900">{ngo.rating || '4.9'}</span>
                    </div>
                  </div>

                  {/* Domain & Campaign Focus */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 text-[11px] font-extrabold border border-indigo-100">
                        🎯 {ngo.sector || 'Social Impact'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {ngo.specialization || ngo.tagline}
                    </p>
                  </div>

                  {/* Official Contacts */}
                  <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-semibold">{ngo.phone || '011-26972351'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <a href={`mailto:${ngo.email}`} className="font-mono text-[11px] font-bold text-sky-700 hover:underline">
                        {ngo.email || 'contact@ngo.org'}
                      </a>
                    </div>
                  </div>

                  {/* Conduction History Snippet */}
                  <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed">
                    <span className="font-bold">Track Record:</span> {ngo.pastHistorySummary}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedNgoDetail(ngo)}
                    className="flex-1 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-all press-effect"
                  >
                    View History & Audit
                  </button>
                  <button
                    onClick={() => openRequestForNgo(ngo)}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white text-xs font-bold shadow-sm transition-all press-effect flex items-center justify-center gap-1.5"
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
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-600" />
              Verifiable Completed Event History & Task Audit Logs
            </h2>
            <p className="text-xs text-slate-500">Inspect completed drives with impact metrics and partner testimonials for corporate due diligence.</p>
          </div>

          <div className="space-y-5">
            {pastEvents.map((evt, idx) => (
              <div key={evt.id} className={`glass-panel p-6 rounded-3xl border border-slate-200 shadow-sm hover-lift animate-float-up stagger-${(idx % 6) + 1}`}>
                <div className="flex flex-col md:flex-row gap-5">
                  <img src={evt.image} alt={evt.title} className="w-full md:w-48 h-36 object-cover rounded-2xl shadow-sm" />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-extrabold">{evt.category}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">{evt.mode}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{evt.completedDate}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">{evt.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{evt.summary}</p>
                    
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="text-center p-2 rounded-xl bg-sky-50 border border-sky-100">
                        <p className="text-sm font-extrabold text-sky-700">{evt.attendees}</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase">Attendees</p>
                      </div>
                      <div className="text-center p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                        <p className="text-sm font-extrabold text-emerald-700">{evt.volunteersEngaged}</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase">Volunteers</p>
                      </div>
                      <div className="text-center p-2 rounded-xl bg-amber-50 border border-amber-100">
                        <p className="text-sm font-extrabold text-amber-700">{evt.certificatesIssued}</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase">Certificates</p>
                      </div>
                    </div>

                    {/* Partner Feedback */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-extrabold text-slate-800">{evt.partnerName}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 italic">"{evt.partnerFeedback}"</p>
                    </div>

                    {/* Tasks Completed */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {evt.tasksCompleted?.map((t, tidx) => (
                        <span key={tidx} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-100">
                          <CheckCircle2 className="w-2.5 h-2.5" /> {t}
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
              <h2 className="text-lg font-extrabold text-slate-900">Your Submitted Event Requests</h2>
              <p className="text-xs text-slate-500">Track real-time status of your awareness drive requests sent to NGOs</p>
            </div>
            <button 
              onClick={() => { setSelectedTargetNgo(null); setModalOpen(true); }} 
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white text-xs font-bold shadow press-effect flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> + New Request
            </button>
          </div>

          {corporateRequests.length > 0 ? (
            <div className="space-y-3">
              {corporateRequests.map((req, idx) => (
                <div key={req.id} className={`glass-panel p-5 rounded-2xl border border-slate-200 shadow-sm hover-lift animate-float-up stagger-${(idx % 6) + 1} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{req.id}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">{req.type}</span>
                      {req.targetNgoName && (
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 text-[10px] font-bold border border-sky-200">
                          Assigned NGO: {req.targetNgoName}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{req.organizationName}</h4>
                    <p className="text-xs text-slate-600">Topic: <strong>"{req.proposedTopic}"</strong> • {req.proposedMode} • {req.proposedDate}</p>
                    {req.permissionLetterName && (
                      <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Sanction NOC: {req.permissionLetterName}
                      </p>
                    )}
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold shrink-0 ${
                    req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                    req.status === 'Completed' ? 'bg-sky-100 text-sky-800 border border-sky-200' :
                    'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-3xl border border-slate-200 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No event requests submitted yet</p>
              <p className="text-xs text-slate-500">Browse the NGO directory above, choose an organization, and submit your first awareness drive request!</p>
            </div>
          )}
        </div>
      )}

      {/* NGO Full Detail Modal */}
      {selectedNgoDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-200 shadow-float-lg overflow-hidden flex flex-col text-left max-h-[90vh]">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${selectedNgoDetail.logoBg || 'from-sky-600 to-indigo-600'} text-white flex items-center justify-center font-bold text-lg`}>
                  {selectedNgoDetail.name.charAt(0)}
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
                <p className="text-sm text-slate-800 mt-1 font-medium">{selectedNgoDetail.tagline}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Track Record & Audit Summary</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedNgoDetail.pastHistorySummary}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Accreditations & Compliance</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNgoDetail.accreditations?.map((acc, aidx) => (
                    <span key={aidx} className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {acc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedNgoDetail(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const target = selectedNgoDetail;
                    setSelectedNgoDetail(null);
                    openRequestForNgo(target);
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white text-xs font-bold shadow press-effect flex items-center gap-1.5"
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
