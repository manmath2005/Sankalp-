import React, { useState } from 'react';
import { EventCard } from '../components/EventCard';
import { EventModal } from '../components/EventModal';
import { useApp } from '../context/AppContext';
import { Search, Filter, Calendar, MapPin, Monitor, CheckCircle2, Zap, Sparkles, Check, Laptop } from 'lucide-react';

export const EventsView = () => {
  const { events } = useApp();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [modeFilter, setModeFilter] = useState('ALL');

  // Skill & Micro-Volunteering Filters
  const [virtualOnly, setVirtualOnly] = useState(false);
  const [microOnly, setMicroOnly] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const availableSkills = [
    "Graphic Design", 
    "Content Writing", 
    "Legal Aid", 
    "Accounting", 
    "Video Editing",
    "Translation",
    "Cyber Awareness",
    "First Aid",
    "Environmental Science"
  ];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.venue.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'ALL' || e.category === categoryFilter;
    const matchesMode = modeFilter === 'ALL' || e.mode === modeFilter;
    const matchesVirtual = !virtualOnly || (e.isVirtual || e.mode === 'Online');
    const matchesMicro = !microOnly || (e.isMicroTask || (e.estimatedHours && e.estimatedHours <= 5));
    
    const matchesSkill = selectedSkills.length === 0 || 
      (e.requiredSkills && selectedSkills.some(s => e.requiredSkills.includes(s)));

    return matchesSearch && matchesCategory && matchesMode && matchesVirtual && matchesMicro && matchesSkill;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left page-enter">
      
      {/* Page Header */}
      <div className="bg-slate-900/80 backdrop-blur-2xl p-8 rounded-3xl border border-slate-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6 relative overflow-hidden">
        {/* Luminous Horizon Top Rim */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/50 via-emerald-500/50 to-blue-500/50" />
        
        <div>
          <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block mb-1">
            Choose Your Volunteer Drive or Micro-Task
          </span>
          <h1 className="text-3xl font-extrabold text-white font-display">
            Skill-Based & Micro-Volunteering Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Browse on-ground community drives or quick 2–5 hour virtual tasks. Contribute your professional skills (Design, Content, Legal, Accounting, Translation) and earn verifiable digital certificates.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid md:grid-cols-12 gap-3 pt-2">
          
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, skills, or venue..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-700/80 text-xs font-medium focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none bg-slate-950/80 text-white placeholder-slate-400"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-700/80 text-xs font-medium focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none bg-slate-950/80 text-white"
            >
              <option value="ALL">All Categories & Sectors</option>
              <option value="Government Office">Government Offices</option>
              <option value="Public Office">Public Sector Units</option>
              <option value="College">Colleges & Universities</option>
              <option value="School">Schools & Education</option>
            </select>
          </div>

          {/* Mode Dropdown */}
          <div className="md:col-span-3">
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-700/80 text-xs font-medium focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none bg-slate-950/80 text-white"
            >
              <option value="ALL">All Modes (Onfield & Remote)</option>
              <option value="Onfield">Onfield Only</option>
              <option value="Online">Online / Virtual</option>
            </select>
          </div>

        </div>

        {/* Specialized Micro-Volunteering & Skill Toggles */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Toggle 1: Remote / Virtual Only */}
            <button
              type="button"
              onClick={() => setVirtualOnly(!virtualOnly)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 press-effect ${
                virtualOnly 
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-2 ring-purple-400' 
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/80'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Remote / Virtual Only</span>
              {virtualOnly && <Check className="w-3.5 h-3.5" />}
            </button>

            {/* Toggle 2: Quick Micro-Tasks (< 5 Hours) */}
            <button
              type="button"
              onClick={() => setMicroOnly(!microOnly)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 press-effect ${
                microOnly 
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-2 ring-amber-300' 
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/80'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Quick Tasks (&lt; 5 Hours)</span>
              {microOnly && <Check className="w-3.5 h-3.5" />}
            </button>

            {(virtualOnly || microOnly || selectedSkills.length > 0) && (
              <button
                onClick={() => { setVirtualOnly(false); setMicroOnly(false); setSelectedSkills([]); }}
                className="text-[11px] font-bold text-slate-400 hover:text-amber-400 underline ml-auto"
              >
                Reset Filters
              </button>
            )}

          </div>

          {/* Multi-Select Skill Badges Strip */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1 mr-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Filter by Skill:
            </span>

            {availableSkills.map((skill, idx) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-slate-950 shadow-xs font-black'
                      : 'bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(evt => (
            <EventCard 
              key={evt.id} 
              event={evt} 
              onSelect={(e) => setSelectedEvent(e)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/90 text-white">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No matching events found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search query or category filters.
          </p>
        </div>
      )}

      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};
