import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Database, 
  Users, 
  Calendar, 
  Building2, 
  ShieldCheck, 
  Plus, 
  Search, 
  CheckCircle2, 
  Award, 
  LogOut, 
  Download, 
  RefreshCw, 
  KeyRound,
  AlertTriangle,
  BarChart3,
  PieChart,
  MapPin,
  Briefcase,
  FileText,
  Paperclip,
  Check,
  Eye,
  X
} from 'lucide-react';

export const AdminDbmsView = () => {
  const { 
    events, 
    volunteers, 
    corporateRequests, 
    users, 
    activeSessions, 
    createNewEvent, 
    updateEvent, 
    updateCorporateRequestStatus, 
    issueCertificateToVolunteer, 
    invalidateUserSession,
    resetSystemData,
    currentUser,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics', 'volunteers', 'events', 'requests', 'users'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNocDoc, setSelectedNocDoc] = useState(null); // Full NOC letter reader & download modal

  // New Event Form State inside DBMS
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState('Government Office');
  const [newEventMode, setNewEventMode] = useState('Onfield');
  const [newEventVenue, setNewEventVenue] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventSeats, setNewEventSeats] = useState(30);
  const [newEventCoordinator, setNewEventCoordinator] = useState('Rajesh Sharma (Lead)');
  const [newEventContact, setNewEventContact] = useState('+91 98211 00234');
  
  // Emergency SOS fields
  const [isEmergency, setIsEmergency] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState('Critical');
  const [requiredResources, setRequiredResources] = useState('50 Volunteers for Flood Food Packet Packing, O+ Blood Donors');

  // Issue Cert State
  const [certVolId, setCertVolId] = useState('');
  const [certTitle, setCertTitle] = useState('');
  const [certHours, setCertHours] = useState(8);

  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    createNewEvent({
      title: newEventTitle,
      category: newEventCategory,
      mode: newEventMode,
      venue: newEventVenue,
      location: newEventLocation,
      date: newEventDate,
      time: newEventTime,
      description: newEventDescription,
      targetAudience: newEventCategory,
      volunteerSeats: parseInt(newEventSeats),
      coordinator: newEventCoordinator,
      organizerContact: newEventContact,
      isEmergency,
      urgencyLevel: isEmergency ? urgencyLevel : null,
      requiredResources: isEmergency ? requiredResources : null,
      targetRadiusKm: 50,
      tasksRequired: isEmergency 
        ? ["Urgent disaster relief packaging", "First aid & donor intake", "Local distribution logistics"]
        : ["Registration & Logistics", "Attendee Assistance", "Documentation"]
    });
    setShowAddEventModal(false);
    setIsEmergency(false);
  };

  const handleIssueCertSubmit = (e) => {
    e.preventDefault();
    if (!certVolId || !certTitle) return;
    issueCertificateToVolunteer(certVolId, certTitle, certHours);
    setCertVolId('');
    setCertTitle('');
  };

  const exportDbToJson = () => {
    const dbData = {
      events,
      volunteers,
      corporateRequests,
      users,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(dbData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sankalp_dbms_backup_${Date.now()}.json`;
    a.click();
    showToast("Full DBMS records exported to JSON successfully!", "success");
  };

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';
  const currentNgoName = currentUser?.ngoName || 'Sankalp Social Foundation';

  // Super Admin NGO Filter State (defaults to 'ALL' for super admin)
  const [selectedNgoFilter, setSelectedNgoFilter] = useState('ALL');

  // Determine effective NGO filter: if logged in as NGO, strictly their NGO; if Super Admin, based on selector
  const activeNgoName = isSuperAdmin 
    ? (selectedNgoFilter === 'ALL' ? null : selectedNgoFilter)
    : currentNgoName;

  // Scoped Events: if activeNgoName is set, filter events by that NGO (or events with matching coordinator/ngo)
  const scopedEvents = events.filter(e => {
    if (!activeNgoName) return true;
    const evtNgo = e.ngoName || 'Sankalp Social Foundation';
    return evtNgo.toLowerCase().includes(activeNgoName.toLowerCase()) || 
           activeNgoName.toLowerCase().includes(evtNgo.toLowerCase()) ||
           e.coordinator?.toLowerCase().includes(currentUser?.name?.toLowerCase() || '');
  });

  const scopedEventIds = new Set(scopedEvents.map(e => e.id));

  // Scoped Volunteers: volunteers who registered for or participated in the scoped events (or all if super admin and ALL)
  const scopedVolunteers = volunteers.filter(v => {
    if (!activeNgoName) return true;
    const hasAssignedEvent = v.assignedEventIds?.some(id => scopedEventIds.has(id));
    const hasParticipatedEvent = v.eventsParticipated?.some(id => scopedEventIds.has(id));
    const hasCert = v.certificates?.some(c => scopedEventIds.has(c.eventId) || c.eventTitle?.toLowerCase().includes(activeNgoName.toLowerCase()));
    // Fallback: If newly assigned or in demo, include if assigned
    return hasAssignedEvent || hasParticipatedEvent || hasCert || (v.assignedEventIds && v.assignedEventIds.length === 0 && !isSuperAdmin);
  });

  // Scoped Corporate Requests
  const scopedCorporateRequests = corporateRequests.filter(r => {
    if (!activeNgoName) return true;
    return !r.assignedNgoName || r.assignedNgoName.toLowerCase().includes(activeNgoName.toLowerCase()) || activeNgoName.toLowerCase().includes(r.assignedNgoName?.toLowerCase() || '');
  });

  // Analytics Computation for Scoped Volunteers
  const professionCounts = scopedVolunteers.reduce((acc, v) => {
    const prof = v.profession || 'Student';
    acc[prof] = (acc[prof] || 0) + 1;
    return acc;
  }, {});

  const cityCounts = scopedVolunteers.reduce((acc, v) => {
    const city = v.city || 'Mumbai';
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const ageGroups = scopedVolunteers.reduce((acc, v) => {
    const age = parseInt(v.age) || 22;
    if (age <= 22) acc['18-22 (Students)'] = (acc['18-22 (Students)'] || 0) + 1;
    else if (age <= 30) acc['23-30 (Young Professionals)'] = (acc['23-30 (Young Professionals)'] || 0) + 1;
    else acc['31+ (Senior Professionals)'] = (acc['31+ (Senior Professionals)'] || 0) + 1;
    return acc;
  }, {});

  const filteredVolunteers = scopedVolunteers.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.city && v.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (v.profession && v.profession.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredEvents = scopedEvents.filter(e =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-emerald-400 text-slate-950 flex items-center justify-center font-bold">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-extrabold text-white">
                {isSuperAdmin ? 'Master Super Admin DBMS & Analytics' : `${currentNgoName} — Management Dashboard`}
              </h1>
              <span className="bg-sky-500/20 text-sky-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border border-sky-400/30">
                {isSuperAdmin ? 'All-India Central View' : 'Scoped NGO Data'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {isSuperAdmin 
                ? 'Central master command ledger viewing and managing awareness drives, volunteer demographics, and corporate requests across all partner NGOs in India.'
                : `Managing specific awareness drives, participating volunteers, participant demographics, and corporate CSR requests for ${currentNgoName}.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={exportDbToJson}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export {isSuperAdmin ? 'Master DB' : 'NGO Records'}
          </button>

          {isSuperAdmin && (
            <button
              onClick={resetSystemData}
              title="Reset to default mock data"
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/10"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset DBMS
            </button>
          )}
        </div>
      </div>

      {/* Super Admin NGO Selector Banner */}
      {isSuperAdmin && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Super Admin Scope Filter: Inspecting <strong>{selectedNgoFilter === 'ALL' ? 'All Partner NGOs Across India' : selectedNgoFilter}</strong>
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Filter demographic analytics and volunteer directories for individual non-profits or view aggregated nationwide totals.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Filter by NGO:</span>
            <select
              value={selectedNgoFilter}
              onChange={(e) => setSelectedNgoFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">🌟 All Non-Profits (Consolidated View)</option>
              <option value="Sankalp Social Foundation">Sankalp Social Foundation</option>
              <option value="Goonj">Goonj</option>
              <option value="The Akshaya Patra Foundation">The Akshaya Patra Foundation</option>
              <option value="Child Rights and You (CRY)">Child Rights and You (CRY)</option>
              <option value="HelpAge India">HelpAge India</option>
              <option value="Pratham Education Foundation">Pratham Education Foundation</option>
            </select>
          </div>
        </div>
      )}

      {/* DBMS Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
            activeTab === 'analytics' ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> {isSuperAdmin ? 'All-NGO Demographics' : 'My Volunteer Demographics'}
        </button>

        <button
          onClick={() => setActiveTab('volunteers')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
            activeTab === 'volunteers' ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Users className="w-4 h-4" /> {isSuperAdmin ? 'Master Volunteers Directory' : 'Participating Volunteers'} ({scopedVolunteers.length})
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
            activeTab === 'events' ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" /> {isSuperAdmin ? 'All Drives Manager' : 'My Conducted Drives'} ({scopedEvents.length})
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
            activeTab === 'requests' ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" /> Corporate Requests & NOCs ({scopedCorporateRequests.length})
        </button>

        {isSuperAdmin && (
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === 'users' ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Master Session Audit ({users.length})
          </button>
        )}
      </div>

      {/* SEARCH BAR */}
      {activeTab !== 'analytics' && (
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${isSuperAdmin ? 'all records' : 'your NGO records'} by name, city, profession, or title...`}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
          />
        </div>
      )}

      {/* TAB 0: VOLUNTEER DEMOGRAPHICS ANALYTICS DASHBOARD */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* 1. Profession Breakdown */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-sky-600" />
                Volunteer Profession Breakdown
              </h3>
              
              <div className="space-y-2.5">
                {Object.entries(professionCounts).map(([prof, count]) => {
                  const percentage = Math.round((count / volunteers.length) * 100);
                  return (
                    <div key={prof} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-800">
                        <span>{prof}</span>
                        <span className="text-sky-700">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. City Distribution */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Top Cities Distribution
              </h3>

              <div className="space-y-2.5">
                {Object.entries(cityCounts).map(([c, count]) => {
                  const percentage = Math.round((count / volunteers.length) * 100);
                  return (
                    <div key={c} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-800">
                        <span>{c}</span>
                        <span className="text-emerald-700">{count} Volunteers</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Age Demographic Breakdown */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-amber-600" />
                Age Group Demographics
              </h3>

              <div className="space-y-2.5">
                {Object.entries(ageGroups).map(([group, count]) => {
                  const percentage = Math.round((count / volunteers.length) * 100);
                  return (
                    <div key={group} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-800">
                        <span>{group}</span>
                        <span className="text-amber-700">{count}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 1: VOLUNTEERS DIRECTORY */}
      {activeTab === 'volunteers' && (
        <div className="space-y-6">
          
          {/* Issue Certificate Tool Box */}
          <div className="glass-panel p-5 rounded-2xl border border-amber-200 space-y-3 bg-gradient-to-r from-amber-50 to-orange-50">
            <h3 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              Issue Direct Accredited Certificate to Volunteer
            </h3>

            <form onSubmit={handleIssueCertSubmit} className="grid sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-4">
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Select Volunteer</label>
                <select
                  value={certVolId}
                  onChange={(e) => setCertVolId(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                >
                  <option value="">-- Choose Volunteer --</option>
                  {volunteers.map(v => (
                    <option key={v.id} value={v.id}>{v.name} ({v.profession} • {v.city})</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-5">
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Awareness Campaign Title</label>
                <input
                  type="text"
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                  placeholder="e.g. Cyber Safety & Digital Rights Drive"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                />
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-sm"
                >
                  Issue Certificate
                </button>
              </div>
            </form>
          </div>

          {/* Volunteers Data Table */}
          <div className="glass-panel rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-[11px] font-extrabold uppercase border-b border-slate-200">
                    <th className="p-3">ID</th>
                    <th className="p-3">Volunteer Name</th>
                    <th className="p-3">Profession</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Age</th>
                    <th className="p-3">Institution</th>
                    <th className="p-3">Certificates</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs font-medium text-slate-800">
                  {filteredVolunteers.map(v => (
                    <tr key={v.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-slate-500 font-bold">{v.id}</td>
                      <td className="p-3 font-bold text-slate-900">{v.name}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold text-[10px]">
                          {v.profession || 'Student'}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-700">{v.city || 'Mumbai'}</td>
                      <td className="p-3 text-slate-600 font-semibold">{v.age || 22} yrs</td>
                      <td className="p-3 text-slate-600">{v.institution}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                          {v.certificates?.length || 0} Certificates
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: EVENTS MANAGER */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-extrabold text-slate-900">
              Active Awareness Events List ({filteredEvents.length})
            </h3>

            <button
              onClick={() => setShowAddEventModal(true)}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create New Event
            </button>
          </div>

          <div className="glass-panel rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-[11px] font-extrabold uppercase border-b border-slate-200">
                    <th className="p-3">ID</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Mode</th>
                    <th className="p-3">Venue</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Volunteer Quota</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs font-medium text-slate-800">
                  {filteredEvents.map(e => (
                    <tr key={e.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-slate-500 font-bold">{e.id}</td>
                      <td className="p-3 font-bold text-slate-900 max-w-[200px] truncate">{e.title}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                          {e.category}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          e.mode === 'Online' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {e.mode}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 max-w-[150px] truncate">{e.venue}</td>
                      <td className="p-3 text-slate-600">{e.date}</td>
                      <td className="p-3 font-bold text-sky-700">
                        {e.volunteersRegistered} / {e.volunteerSeats}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => updateEvent(e.id, { status: e.status === 'Completed' ? 'Upcoming' : 'Completed' })}
                          className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-[10px] font-bold"
                        >
                          Toggle {e.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CORPORATE REQUESTS & HR/CEO PERMISSION NOC AUDIT */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-[11px] font-extrabold uppercase border-b border-slate-200">
                    <th className="p-3">Req ID</th>
                    <th className="p-3">Organization Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Nodal Contact</th>
                    <th className="p-3">Proposed Topic</th>
                    <th className="p-3">Target Date</th>
                    <th className="p-3">HR/CEO Permission NOC</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs font-medium text-slate-800">
                  {scopedCorporateRequests.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-slate-500 font-bold">{r.id}</td>
                      <td className="p-3 font-bold text-slate-900">{r.organizationName}</td>
                      <td className="p-3 text-slate-600">{r.type}</td>
                      <td className="p-3 text-slate-600">{r.contactPerson} ({r.phone})</td>
                      <td className="p-3 text-slate-700 font-semibold">{r.proposedTopic}</td>
                      <td className="p-3 text-slate-600 font-mono text-[11px]">{r.proposedDate || '2026-09-18'}</td>
                      
                      {/* Permission Letter Document Column with Interactive Preview & Download */}
                      <td className="p-3">
                        {r.permissionLetterName ? (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <button
                              onClick={() => setSelectedNocDoc(r)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold text-[11px] border border-amber-300 dark:border-amber-700 transition-all hover-lift press-effect"
                              title="Inspect full permission letter & download"
                            >
                              <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                              <span className="max-w-[110px] truncate">{r.permissionLetterName}</span>
                              <Eye className="w-3 h-3 text-amber-500 ml-0.5" />
                            </button>

                            <button
                              onClick={() => {
                                const dummyContent = `========================================================\nOFFICIAL SANCTION / PERMISSION LETTER (NOC)\n========================================================\nOrganization: ${r.organizationName}\nAuthorized Officer: ${r.contactPerson} (${r.email})\nDesignation: HR Director / Executive Administration\nApproved Subject: Permission for Onfield Awareness Campaign on "${r.proposedTopic}"\nTarget Date: ${r.proposedDate || '2026-09-18'}\nEstimated Participants: ${r.targetAudienceSize || '250-300 attendees'}\nVenue Address: ${r.locationAddress || 'Main Campus Auditorium'}\n\nThis is to certify that management grants full permission to the partner NGO and verified volunteer team to conduct the scheduled social awareness drive.\n\n[Digitally Verified Signature & Seal]\nStamp: CERTIFIED NOC - MCA SECTION 135\nGenerated via BridgeImpact CSR Network\n========================================================`;
                                const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = r.permissionLetterName.endsWith('.pdf') ? r.permissionLetterName.replace('.pdf', '_Sanction_NOC.txt') : `${r.permissionLetterName}_Sanction_NOC.txt`;
                                a.click();
                                showToast(`Downloading official sanction letter: ${r.permissionLetterName}`, "success");
                              }}
                              className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-sky-900 text-slate-700 dark:text-slate-300 hover:text-sky-700 transition-colors"
                              title="Download official sanction file"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[10px]">No NOC Attached</span>
                        )}
                      </td>

                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          r.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <select
                          value={r.status}
                          onChange={(e) => updateCorporateRequestStatus(r.id, e.target.value)}
                          className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approve Drive</option>
                          <option value="Completed">Mark Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dedicated Full Document Viewer Modal */}
          {selectedNocDoc && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
              <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col text-left">
                
                {/* Header */}
                <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-white">
                          Official HR/CEO Sanction Letter (NOC)
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        {selectedNocDoc.organizationName} • {selectedNocDoc.permissionLetterName}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedNocDoc(null)}
                    className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Letter Body Preview */}
                <div className="p-6 space-y-5 overflow-y-auto max-h-[60vh] bg-slate-50 dark:bg-slate-950">
                  
                  {/* Formal Letter Paper Simulation */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 font-serif text-slate-800 dark:text-slate-200 leading-relaxed text-xs">
                    
                    {/* Letterhead */}
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex justify-between items-start font-sans">
                      <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                          {selectedNocDoc.organizationName}
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">
                          Corporate & Institutional CSR Directorate
                        </p>
                      </div>
                      <div className="text-right text-[10px] text-slate-400 font-mono">
                        Date: {selectedNocDoc.submittedDate || '2026-08-14'}<br/>
                        Ref: NOC-{selectedNocDoc.id}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="font-bold text-slate-900 dark:text-white font-sans text-xs">
                      SUBJECT: OFFICIAL PERMISSION & NO-OBJECTION SANCTION FOR HOSTING ONFIELD AWARENESS DRIVE ON "{selectedNocDoc.proposedTopic.toUpperCase()}"
                    </div>

                    <p>
                      To Whom It May Concern / The Lead Non-Profit Executive Director,
                    </p>

                    <p>
                      This official communication confirms that <strong>{selectedNocDoc.organizationName}</strong> has formally authorized and sanctioned the conduction of a dedicated institutional social awareness drive on our premises.
                    </p>

                    {/* Details Table */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-sans space-y-1 text-[11px]">
                      <div><strong>Nodal Officer:</strong> {selectedNocDoc.contactPerson} ({selectedNocDoc.phone})</div>
                      <div><strong>Proposed Schedule:</strong> {selectedNocDoc.proposedDate || '2026-09-18'}</div>
                      <div><strong>Target Audience Size:</strong> {selectedNocDoc.targetAudienceSize}</div>
                      <div><strong>Venue / Hall:</strong> {selectedNocDoc.locationAddress || 'Campus Auditorium'}</div>
                      <div><strong>Special Provisions:</strong> {selectedNocDoc.specialRequirements || 'AV equipment, seating, and volunteer registration desks are approved.'}</div>
                    </div>

                    <p>
                      Our security and HR administrative teams will facilitate smooth entry and logistics for all registered NGO personnel and accredited citizen volunteers.
                    </p>

                    {/* Sign-off Seal */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-end font-sans">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-8 h-8 text-emerald-600" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">Digitally Verified Document</p>
                          <p className="text-[9px] text-slate-400 font-mono">SHA-256 Hash: e3b0c44298fc1c149afbf4c8996fb924</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-xs text-slate-900 dark:text-white">{selectedNocDoc.contactPerson}</p>
                        <p className="text-[10px] text-slate-500">Head of Human Resources & Institutional Relations</p>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">
                    File: {selectedNocDoc.permissionLetterName}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const dummyContent = `========================================================\nOFFICIAL SANCTION / PERMISSION LETTER (NOC)\n========================================================\nOrganization: ${selectedNocDoc.organizationName}\nAuthorized Officer: ${selectedNocDoc.contactPerson} (${selectedNocDoc.email})\nDesignation: HR Director / Executive Administration\nApproved Subject: Permission for Onfield Awareness Campaign on "${selectedNocDoc.proposedTopic}"\nTarget Date: ${selectedNocDoc.proposedDate || '2026-09-18'}\nEstimated Participants: ${selectedNocDoc.targetAudienceSize || '250-300 attendees'}\nVenue Address: ${selectedNocDoc.locationAddress || 'Main Campus Auditorium'}\n\nThis is to certify that management grants full permission to the partner NGO and verified volunteer team to conduct the scheduled social awareness drive.\n\n[Digitally Verified Signature & Seal]\nStamp: CERTIFIED NOC - MCA SECTION 135\nGenerated via BridgeImpact CSR Network\n========================================================`;
                        const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = selectedNocDoc.permissionLetterName.endsWith('.pdf') ? selectedNocDoc.permissionLetterName.replace('.pdf', '_Sanction_NOC.txt') : `${selectedNocDoc.permissionLetterName}_Sanction_NOC.txt`;
                        a.click();
                        showToast(`Downloaded official sanction file: ${selectedNocDoc.permissionLetterName}`, "success");
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm press-effect"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Sanction Letter
                    </button>
                    <button
                      onClick={() => setSelectedNocDoc(null)}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      Close
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 4: SESSION AUDIT */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-[11px] font-extrabold uppercase border-b border-slate-200">
                    <th className="p-3">User ID</th>
                    <th className="p-3">User Name</th>
                    <th className="p-3">Email Address</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Email Verified</th>
                    <th className="p-3">Active Session State</th>
                    <th className="p-3">Security Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs font-medium text-slate-800">
                  {users.map(u => {
                    const session = activeSessions[u.id];
                    return (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono text-slate-500 font-bold">{u.id}</td>
                        <td className="p-3 font-bold text-slate-900">{u.name}</td>
                        <td className="p-3 text-slate-600">{u.email}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-sky-100 text-sky-800">
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified OTP
                          </span>
                        </td>
                        <td className="p-3">
                          {session ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] animate-pulse">
                              🟢 Active Session
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Inactive</span>
                          )}
                        </td>
                        <td className="p-3">
                          {session ? (
                            <button
                              onClick={() => invalidateUserSession(u.id)}
                              className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 text-[10px] font-bold border border-red-200"
                            >
                              Terminate Session
                            </button>
                          ) : (
                            <span className="text-slate-300 text-[10px]">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Event Form */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-slate-200 p-6 space-y-4 text-left max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-extrabold text-slate-900">Create New Awareness Event</h3>
            
            <form onSubmit={handleAddEventSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Digital Rights & Anti-Cyber Fraud Drive"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sector Category</label>
                  <select
                    value={newEventCategory}
                    onChange={(e) => setNewEventCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  >
                    <option value="Government Office">Government Office</option>
                    <option value="Public Office">Public Office / Corporate</option>
                    <option value="College">College / University</option>
                    <option value="School">School / Community</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Drive Mode</label>
                  <select
                    value={newEventMode}
                    onChange={(e) => setNewEventMode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  >
                    <option value="Onfield">Onfield Event</option>
                    <option value="Online">Online Webinar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Venue Name</label>
                  <input
                    type="text"
                    required
                    value={newEventVenue}
                    onChange={(e) => setNewEventVenue(e.target.value)}
                    placeholder="Collectorate Auditorium"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location Zone</label>
                  <input
                    type="text"
                    required
                    value={newEventLocation}
                    onChange={(e) => setNewEventLocation(e.target.value)}
                    placeholder="Civil Lines, Central Hub"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    placeholder="10:00 AM - 02:00 PM"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Volunteer Quota</label>
                  <input
                    type="number"
                    required
                    value={newEventSeats}
                    onChange={(e) => setNewEventSeats(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
              </div>

              {/* SOS Emergency Campaign Toggle & Inputs */}
              <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <div>
                      <h4 className="text-xs font-black text-red-950">SOS Emergency Mode (Disaster Response)</h4>
                      <p className="text-[10px] text-red-700">Triggers nationwide high-visibility banner and 50km radius volunteer mobilization.</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isEmergency}
                    onChange={(e) => setIsEmergency(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                  />
                </div>

                {isEmergency && (
                  <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-red-200/80 animate-fade-in">
                    <div>
                      <label className="block text-[10px] font-bold text-red-900 uppercase mb-1">Urgency Level</label>
                      <select
                        value={urgencyLevel}
                        onChange={(e) => setUrgencyLevel(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-red-300 text-xs font-bold bg-white text-red-900"
                      >
                        <option value="Critical">Critical (Immediate Deployment Required)</option>
                        <option value="High">High (Disaster Support Within 24 Hours)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-red-900 uppercase mb-1">Immediate Required Resources</label>
                      <input
                        type="text"
                        value={requiredResources}
                        onChange={(e) => setRequiredResources(e.target.value)}
                        placeholder="e.g. 50 Volunteers for Food Packing, O+ Donors"
                        className="w-full px-3 py-2 rounded-xl border border-red-300 text-xs font-medium bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Overview Description</label>
                <textarea
                  rows={2}
                  required
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                  placeholder="Detailed objectives of the awareness drive..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold shadow"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
