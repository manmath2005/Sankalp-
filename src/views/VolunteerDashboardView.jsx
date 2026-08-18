import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CertificateStudio } from '../components/CertificateStudio';
import { 
  Award, 
  User, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Building, 
  ShieldCheck, 
  MailCheck, 
  Download, 
  Printer, 
  Zap, 
  LogOut,
  Edit3,
  Save,
  Phone,
  Briefcase,
  MapPin,
  Heart,
  Sparkles,
  CalendarCheck,
  Tag,
  Shield,
  Layers,
  FileText
} from 'lucide-react';

export const VolunteerDashboardView = ({ onNavigate }) => {
  const { currentUser, volunteers, events, logoutUser, updateVolunteerProfile, setAuthModalOpen, setAuthMode } = useApp();
  const [activeCertModal, setActiveCertModal] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'profile', 'events', 'certificates'

  // Editable Profile States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [profession, setProfession] = useState(currentUser?.profession || 'Student');
  const [city, setCity] = useState(currentUser?.city || 'Mumbai');
  const [age, setAge] = useState(currentUser?.age || 22);
  const [institution, setInstitution] = useState(currentUser?.institution || '');
  const [bio, setBio] = useState(currentUser?.bio || 'Dedicated community volunteer passionate about social awareness drives, civic education, and student mentoring.');
  const [skillsInput, setSkillsInput] = useState((currentUser?.skills || ['Public Speaking', 'Digital Literacy', 'First Aid']).join(', '));
  const [emergencyContact, setEmergencyContact] = useState(currentUser?.emergencyContact || '+91 98000 00000');
  const [bloodGroup, setBloodGroup] = useState(currentUser?.bloodGroup || 'O+');

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 page-enter">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto shadow-sm">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            Volunteer Hub & Accredited Certificate Studio
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-600">
            Please log in or register to view your registered events, track community service hours, and generate official Sankalp NGO completion certificates.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
            >
              Sign In to Volunteer Portal
            </button>
            <button
              onClick={() => { setAuthMode('register'); setAuthModalOpen(true); }}
              className="px-6 py-2.5 rounded-xl btn-glow-primary font-bold text-xs shadow-md"
            >
              New Volunteer Signup (OTP Step)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Find volunteer profile record
  const volunteerProfile = volunteers.find(v => v.email.toLowerCase() === currentUser.email.toLowerCase()) || {
    name: currentUser.name,
    email: currentUser.email,
    institution: currentUser.institution || 'Independent Volunteer',
    profession: currentUser.profession || 'Student',
    city: currentUser.city || 'Mumbai',
    age: currentUser.age || 22,
    phone: currentUser.phone || '',
    skills: currentUser.skills || ['Public Speaking', 'Digital Literacy'],
    status: 'Verified',
    assignedEventIds: [],
    certificates: []
  };

  const assignedEvents = events.filter(e => volunteerProfile.assignedEventIds?.includes(e.id));
  const totalCertificates = volunteerProfile.certificates || [];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const skillsArray = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    
    updateVolunteerProfile(currentUser.email, {
      phone,
      profession,
      city,
      age: parseInt(age) || 22,
      institution,
      bio,
      emergencyContact,
      bloodGroup,
      skills: skillsArray
    });

    setIsEditingProfile(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left page-enter">
      
      {/* 1. Header Profile Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 shadow-float flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-emerald-500 text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{currentUser.name}</h1>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Volunteer
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1 flex flex-wrap items-center gap-2">
              <span className="font-mono text-slate-800">{currentUser.email}</span>
              <span>•</span>
              <span className="font-semibold text-slate-700">{volunteerProfile.profession || 'Volunteer'}</span>
              <span>•</span>
              <span className="text-slate-600">{volunteerProfile.city || 'India'}</span>
            </p>
            <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
              <span className="bg-sky-50 text-sky-800 px-2.5 py-0.5 rounded-lg border border-sky-100 font-bold">
                ID: {volunteerProfile.id || `VOL-${currentUser.id?.slice(-4)}`}
              </span>
              <span>Institution: <strong className="text-slate-700">{volunteerProfile.institution || 'Independent'}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('events')}
            className="btn-glow-primary px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 press-effect"
          >
            <Zap className="w-3.5 h-3.5 fill-current" /> Browse Awareness Events
          </button>
          <button
            onClick={logoutUser}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 press-effect"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3 overflow-x-auto">
        {[
          { id: 'overview', label: 'Dashboard & Events', icon: Layers },
          { id: 'profile', label: 'My Volunteer Profile', icon: User },
          { id: 'certificates', label: 'My Certificates', icon: Award },
          { id: 'verify', label: 'Verify Credential Studio', icon: ShieldCheck }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white/80 dark:bg-slate-800 hover:bg-white text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & REGISTERED EVENTS */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left: Selected Events */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sky-600" />
                  My Selected Upcoming Events ({assignedEvents.length})
                </h2>
                <button
                  onClick={() => onNavigate('events')}
                  className="text-xs font-bold text-sky-600 hover:underline"
                >
                  Browse All Events →
                </button>
              </div>

              {assignedEvents.length > 0 ? (
                <div className="space-y-3">
                  {assignedEvents.map(evt => (
                    <div key={evt.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between gap-4 hover-lift">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-lg bg-sky-50 text-sky-700 text-[10px] font-bold">
                            {evt.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-lg bg-purple-50 text-purple-700 text-[10px] font-bold">
                            {evt.mode}
                          </span>
                        </div>
                        <h4 className="text-sm font-extrabold text-slate-900">{evt.title}</h4>
                        <p className="text-xs text-slate-500">{evt.venue} • {evt.date} ({evt.time})</p>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold shrink-0 border border-emerald-200">
                        Confirmed RSVP
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs font-semibold text-slate-600">You haven't chosen any awareness events to volunteer for yet.</p>
                  <button
                    onClick={() => onNavigate('events')}
                    className="px-5 py-2.5 rounded-xl btn-glow-primary text-white text-xs font-bold shadow-md press-effect"
                  >
                    Explore Upcoming Drives Now
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Quick Profile Summary & Certificate Count */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-white/80 shadow-sm space-y-4">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Certificates Summary ({totalCertificates.length})
              </h2>

              {totalCertificates.length > 0 ? (
                <div className="space-y-3">
                  {totalCertificates.map(cert => (
                    <div key={cert.id} className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-lg border border-amber-200">
                          {cert.id}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold">{cert.issuedDate}</span>
                      </div>

                      <h4 className="text-xs font-extrabold text-slate-900">{cert.eventTitle}</h4>
                      <p className="text-[11px] text-slate-600">Verified Service: {cert.hoursContributed} Hours</p>

                      <button
                        onClick={() => setActiveCertModal(cert)}
                        className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow press-effect"
                      >
                        <Printer className="w-3.5 h-3.5 text-amber-400" />
                        View QR Certificate
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <Award className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">No Certificates Issued Yet</p>
                  <p className="text-[11px] text-slate-500">
                    Participate in completed drives to receive verifiable QR certificates.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: EDITABLE PROFILE & DEMOGRAPHICS */}
      {activeTab === 'profile' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 shadow-float space-y-6 animate-scale-in">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-sky-600" />
                Volunteer Demographics & Profile Management
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Update your mobile number, profession, city, emergency contact, and skills. Email and Full Name are verified and locked.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all press-effect ${
                isEditingProfile
                  ? 'bg-slate-200 text-slate-700'
                  : 'btn-glow-primary'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditingProfile ? "Cancel Editing" : "Edit Profile"}
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            
            {/* Non-editable Locked Information */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                  Full Name (Locked - Verified on Registration)
                </label>
                <input
                  type="text"
                  disabled
                  value={currentUser.name}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                  Verified Email Address (Locked - OTP Authenticated)
                </label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono font-bold text-slate-800 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Editable Demographics & Fields */}
            <div className="grid sm:grid-cols-3 gap-4">
              
              {/* Mobile Phone */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-sky-600" /> Mobile Number
                </label>
                <input
                  type="tel"
                  disabled={!isEditingProfile}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                    isEditingProfile
                      ? 'border-sky-300 focus:ring-2 focus:ring-sky-500 bg-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                />
              </div>

              {/* Profession */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-600" /> Profession / Occupation
                </label>
                {isEditingProfile ? (
                  <select
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sky-300 text-xs font-medium bg-white focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Student">Student</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Doctor / Healthcare">Doctor / Healthcare</option>
                    <option value="Teacher / Academic">Teacher / Academic</option>
                    <option value="Corporate Executive">Corporate Executive</option>
                    <option value="Government Staff">Government Staff</option>
                    <option value="Social Activist">Social Activist</option>
                    <option value="Self-Employed">Self-Employed</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    disabled
                    value={profession}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700"
                  />
                )}
              </div>

              {/* City / Location */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" /> City / District
                </label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Mumbai, Pune, Delhi"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                    isEditingProfile
                      ? 'border-sky-300 focus:ring-2 focus:ring-sky-500 bg-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                />
              </div>

            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              
              {/* Age */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Age
                </label>
                <input
                  type="number"
                  disabled={!isEditingProfile}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min={14}
                  max={90}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                    isEditingProfile
                      ? 'border-sky-300 focus:ring-2 focus:ring-sky-500 bg-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                />
              </div>

              {/* Institution / College */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-500" /> Institution / University
                </label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. Mumbai University / TCS"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                    isEditingProfile
                      ? 'border-sky-300 focus:ring-2 focus:ring-sky-500 bg-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-red-500" /> Blood Group (Emergency)
                </label>
                <select
                  disabled={!isEditingProfile}
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                    isEditingProfile
                      ? 'border-sky-300 focus:ring-2 focus:ring-sky-500 bg-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

            </div>

            {/* Volunteer Skills & Focus Tags */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-emerald-600" /> Skills & Specializations (Comma Separated)
              </label>
              <input
                type="text"
                disabled={!isEditingProfile}
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="e.g. Public Speaking, Cyber Safety, First Aid, Content Writing"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                  isEditingProfile
                    ? 'border-sky-300 focus:ring-2 focus:ring-sky-500 bg-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              />
            </div>

            {/* Volunteer Bio */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Volunteer Statement & Bio
              </label>
              <textarea
                rows={3}
                disabled={!isEditingProfile}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Briefly describe your motivation to volunteer..."
                className={`w-full p-3 rounded-xl border text-xs font-medium leading-relaxed transition-all ${
                  isEditingProfile
                    ? 'border-sky-300 focus:ring-2 focus:ring-sky-500 bg-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              />
            </div>

            {/* Save Button */}
            {isEditingProfile && (
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-glow-primary px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md press-effect"
                >
                  <Save className="w-4 h-4" /> Save Profile Changes
                </button>
              </div>
            )}

          </form>

        </div>
      )}

      {/* TAB 3: ACCREDITED CERTIFICATES */}
      {activeTab === 'certificates' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 shadow-float space-y-6 animate-scale-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                Accredited QR Certificate Studio
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official certificates issued by Sankalp Social Foundation with dynamic QR code authentication.
              </p>
            </div>
          </div>

          {totalCertificates.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-5">
              {totalCertificates.map(cert => {
                const issueYear = new Date(cert.issuedDate || Date.now()).getFullYear();
                const issueMonth = new Date(cert.issuedDate || Date.now()).getMonth() + 1;
                const verifyLink = `${window.location.origin}/?verify=${encodeURIComponent(cert.id)}`;
                const linkedInAddUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(cert.eventTitle)}&organizationName=${encodeURIComponent('ImpactBridge & Sankalp NGO Network')}&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${encodeURIComponent(verifyLink)}&certId=${encodeURIComponent(cert.certificateNumber || cert.id)}`;

                return (
                  <div key={cert.id} className="p-6 rounded-3xl bg-white border border-amber-200/90 shadow-sm hover:shadow-md transition-all space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-black text-amber-900 bg-amber-100/90 px-3 py-1 rounded-xl border border-amber-300 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-700" />
                        {cert.id}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{cert.issuedDate}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-slate-900 leading-snug">{cert.eventTitle}</h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Recognized for contributing <strong className="text-slate-900 font-extrabold">{cert.hoursContributed || 4} verified hours</strong> of onfield community service.
                      </p>
                    </div>

                    {/* Skills Tag Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['Community Mobilization', 'Civic Awareness', 'Impact Fieldwork'].map((s, idx) => (
                        <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Action Button Strip */}
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        onClick={() => setActiveCertModal(cert)}
                        className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all press-effect"
                      >
                        <Printer className="w-3.5 h-3.5 text-amber-400" />
                        <span>Download PDF</span>
                      </button>

                      <a
                        href={linkedInAddUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-[11px] font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all press-effect"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.44a1.64 1.64 0 1 0 1.64 1.64A1.64 1.64 0 0 0 7.83 6.44Z"/>
                        </svg>
                        <span>LinkedIn</span>
                      </a>

                      <button
                        onClick={() => onNavigate(`verify-certificate-${cert.id}`)}
                        className="py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-[11px] font-extrabold flex items-center justify-center gap-1 border border-sky-200 transition-all press-effect"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                        <span>Public Audit</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <Award className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-extrabold text-slate-800">No Certificates Earned Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Participate in awareness drives in government complexes, schools, or colleges to get verified certificates generated by NGO directors.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: IN-HUB CERTIFICATE VERIFIER & AUDIT STUDIO */}
      {activeTab === 'verify' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 dark:border-slate-800 shadow-float space-y-6 animate-scale-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-1 border border-emerald-300 dark:border-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Live Cryptographic Verification Ledger
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Verify Any ImpactBridge Digital Certificate
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Input any Certificate ID or Unique Hash to verify authentic hours and Darpan NGO signatures.
              </p>
            </div>

            <button
              onClick={() => onNavigate('verify-certificate')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto press-effect"
            >
              <span>Open Public Verification Page</span>
              <ShieldCheck className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Quick Search Tool */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                Instant Credential Lookup
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Test and audit your earned credentials or scan volunteer certificates from partner NGOs:
              </p>

              <div className="space-y-2">
                {totalCertificates.map(cert => (
                  <div 
                    key={cert.id}
                    onClick={() => onNavigate(`verify-certificate-${cert.id}`)}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:border-emerald-400 dark:hover:border-emerald-500 cursor-pointer transition-all hover-lift"
                  >
                    <div>
                      <p className="text-xs font-black text-slate-900 dark:text-white">{cert.eventTitle}</p>
                      <p className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">{cert.id} • {cert.hoursContributed || 4} Hours Logged</p>
                    </div>
                    <span className="text-[10px] font-extrabold text-sky-700 dark:text-sky-400 uppercase tracking-wider bg-sky-50 dark:bg-sky-950 px-2 py-1 rounded-lg border border-sky-200 dark:border-sky-800">
                      Audit QR →
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Security & Verification Guarantee */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800/80 dark:to-slate-900/80 border border-emerald-200/80 dark:border-slate-700 space-y-4 text-slate-800 dark:text-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black">BridgeImpact Authenticity Standard</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Section 135 & NGO Darpan Verified</p>
                </div>
              </div>

              <ul className="space-y-2 text-xs leading-relaxed font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Immutable SHA-256 digital certificate signature hash</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Direct 1-click LinkedIn Certification profile integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Real-time QR code scannable by HRs, recruiters & institutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Studio Modal */}
      {activeCertModal && (
        <CertificateStudio 
          certificate={activeCertModal} 
          volunteerName={currentUser.name} 
          onClose={() => setActiveCertModal(null)} 
        />
      )}
    </div>
  );
};
