import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Send, 
  X, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Landmark, 
  Upload, 
  FileText, 
  ShieldCheck, 
  Globe2, 
  Star 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CorporateRequestModal = ({ isOpen, onClose, targetNgo = null }) => {
  const { submitCorporateRequest, showToast, ngos } = useApp();

  const [selectedNgoId, setSelectedNgoId] = useState(targetNgo?.id || 'ALL');
  const [organizationName, setOrganizationName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('Public Office');
  const [proposedTopic, setProposedTopic] = useState('');
  const [proposedMode, setProposedMode] = useState('Onfield');
  const [targetAudienceSize, setTargetAudienceSize] = useState('100-250 People');
  const [proposedDate, setProposedDate] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');

  // Permission Letter Upload File State
  const [permissionFile, setPermissionFile] = useState(null);

  useEffect(() => {
    if (targetNgo) {
      setSelectedNgoId(targetNgo.id);
      if (targetNgo.specialization && !proposedTopic) {
        setProposedTopic(targetNgo.specialization.split(',')[0]);
      }
    }
  }, [targetNgo, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("File size should be less than 5MB.", "warning");
        return;
      }
      setPermissionFile(file);
      showToast(`Permission letter "${file.name}" attached successfully.`, "info");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!permissionFile) {
      showToast("Please upload an official Permission Letter (PDF/Image) from HR or CEO to submit request.", "warning");
      return;
    }

    const assignedNgo = ngos.find(n => n.id === selectedNgoId);

    submitCorporateRequest({
      organizationName,
      contactPerson,
      email,
      phone,
      type,
      targetNgoId: selectedNgoId,
      targetNgoName: assignedNgo ? assignedNgo.name : 'Open to All Partner NGOs',
      proposedCategory: type,
      proposedTopic,
      proposedMode,
      targetAudienceSize,
      proposedDate,
      locationAddress,
      specialRequirements,
      permissionLetterName: permissionFile ? permissionFile.name : "Sanction_NOC_Letter.pdf",
      permissionLetterStatus: "Uploaded & Verified"
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-200 shadow-float-lg overflow-hidden flex flex-col text-left max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Building className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              Institutional Partnership Portal
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-white">
            Request Awareness Event Drive
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            For Government Offices, Corporate MNCs, Colleges, and Schools.
          </p>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Target NGO Selection Dropdown */}
          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-1.5">
            <label className="block text-xs font-extrabold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-indigo-600" />
              Select Targeted NGO Organization for this Event
            </label>
            <select
              value={selectedNgoId}
              onChange={(e) => setSelectedNgoId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-indigo-200 text-xs font-bold bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="ALL">🌐 Broadcast to All Verified Partner NGOs</option>
              {ngos.map(n => (
                <option key={n.id} value={n.id}>
                  ⭐ {n.name} ({n.specialization?.slice(0, 45)}...)
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Company / Office / Institution Name
              </label>
              <input
                type="text"
                required
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="e.g. State Treasury Dept / TechCorp MNC"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Institution Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
              >
                <option value="Government Office">Government Office / Ministry</option>
                <option value="Public Office">Public Office / Corporate MNC</option>
                <option value="College">College / University</option>
                <option value="School">School / Educational Trust</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nodal Officer Name
              </label>
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Rajesh Kumar (HR Head)"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hr@company.com"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98000 00000"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Proposed Awareness Subject / Topic
            </label>
            <input
              type="text"
              required
              value={proposedTopic}
              onChange={(e) => setProposedTopic(e.target.value)}
              placeholder="e.g. Cyber Crime Prevention, RTI Rights, Mental Health, E-Waste Drive"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Campaign Mode
              </label>
              <select
                value={proposedMode}
                onChange={(e) => setProposedMode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
              >
                <option value="Onfield">Onfield Physical Event</option>
                <option value="Online">Online Interactive Stream</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Expected Audience Size
              </label>
              <input
                type="text"
                required
                value={targetAudienceSize}
                onChange={(e) => setTargetAudienceSize(e.target.value)}
                placeholder="e.g. 200 Employees"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Proposed Date
              </label>
              <input
                type="date"
                required
                value={proposedDate}
                onChange={(e) => setProposedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Venue / Location Address
            </label>
            <input
              type="text"
              required
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              placeholder="Full address of corporate auditorium / meeting room"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          {/* PERMISSION LETTER UPLOAD SECTION (PDF or Image) */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2">
            <label className="block text-xs font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-amber-600" />
              Upload Permission Letter from HR / CEO / Director (PDF or Image)*
            </label>

            <p className="text-[11px] text-amber-800">
              An official sanction NOC letter on organization letterhead signed by HR, CEO, or Principal is mandatory for audit compliance.
            </p>

            <div className="relative border-2 border-dashed border-amber-300 rounded-xl p-4 text-center hover:bg-white/60 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              
              {permissionFile ? (
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-800">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span>{permissionFile.name} ({(permissionFile.size / 1024).toFixed(1)} KB)</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              ) : (
                <div className="space-y-1">
                  <Upload className="w-6 h-6 text-amber-600 mx-auto" />
                  <p className="text-xs font-bold text-amber-900">Click or Drag & Drop Permission Letter (PDF / PNG / JPG)</p>
                  <p className="text-[10px] text-slate-500">Max size 5MB</p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all press-effect flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Event Conduction Request to NGO
          </button>
        </form>

      </div>
    </div>
  );
};
