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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl horizon-glass-panel rounded-3xl border border-slate-750 bg-slate-900/95 shadow-2xl overflow-hidden flex flex-col text-left max-h-[90vh] text-slate-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 text-white relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <Building className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Institutional Partnership Portal
            </span>
          </div>

          <h2 className="text-xl font-black text-white">
            Request Awareness Event Drive
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            For Government Offices, Corporate MNCs, Colleges, and Schools.
          </p>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 bg-slate-900">
          
          {/* Target NGO Selection Dropdown */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <label className="block text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              Select Targeted NGO Organization for this Event
            </label>
            <select
              value={selectedNgoId}
              onChange={(e) => setSelectedNgoId(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-700 text-xs font-bold bg-slate-900 text-slate-100 focus:border-amber-500 outline-hidden"
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
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Company / Office / Institution Name
              </label>
              <input
                type="text"
                required
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="e.g. State Treasury Dept / TechCorp MNC"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 placeholder-slate-500 text-xs font-medium focus:border-amber-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Institution Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-xs font-medium focus:border-amber-500 outline-hidden"
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
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Nodal Officer Name
              </label>
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Rajesh Kumar (HR Head)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 placeholder-slate-500 text-xs font-medium focus:border-amber-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Official Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hr@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 placeholder-slate-500 text-xs font-medium focus:border-amber-500 outline-hidden font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98000 00000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 placeholder-slate-500 text-xs font-medium focus:border-amber-500 outline-hidden font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Proposed Awareness Subject / Topic
            </label>
            <input
              type="text"
              required
              value={proposedTopic}
              onChange={(e) => setProposedTopic(e.target.value)}
              placeholder="e.g. Cyber Crime Prevention, RTI Rights, Mental Health, E-Waste Drive"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 placeholder-slate-500 text-xs font-medium focus:border-amber-500 outline-hidden"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Campaign Mode
              </label>
              <select
                value={proposedMode}
                onChange={(e) => setProposedMode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-xs font-medium focus:border-amber-500 outline-hidden"
              >
                <option value="Onfield">Onfield Physical Event</option>
                <option value="Online">Online Interactive Stream</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Expected Audience Size
              </label>
              <input
                type="text"
                required
                value={targetAudienceSize}
                onChange={(e) => setTargetAudienceSize(e.target.value)}
                placeholder="e.g. 200 Employees"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 placeholder-slate-500 text-xs font-medium focus:border-amber-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Proposed Date
              </label>
              <input
                type="date"
                required
                value={proposedDate}
                onChange={(e) => setProposedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-xs font-medium focus:border-amber-500 outline-hidden font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Venue / Location Address
            </label>
            <input
              type="text"
              required
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              placeholder="Full address of corporate auditorium / meeting room"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 placeholder-slate-500 text-xs font-medium focus:border-amber-500 outline-hidden"
            />
          </div>

          {/* PERMISSION LETTER UPLOAD SECTION (PDF or Image) */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/60 space-y-2">
            <label className="block text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-amber-400" />
              Upload Permission Letter from HR / CEO / Director (PDF or Image)*
            </label>

            <p className="text-[11px] text-amber-200/80 leading-relaxed">
              An official sanction NOC letter on organization letterhead signed by HR, CEO, or Principal is mandatory for audit compliance.
            </p>

            <div className="relative border-2 border-dashed border-amber-600/50 rounded-xl p-4 text-center hover:bg-slate-950/60 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              
              {permissionFile ? (
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span>{permissionFile.name} ({(permissionFile.size / 1024).toFixed(1)} KB)</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              ) : (
                <div className="space-y-1">
                  <Upload className="w-6 h-6 text-amber-400 mx-auto" />
                  <p className="text-xs font-bold text-amber-300">Click or Drag & Drop Permission Letter (PDF / PNG / JPG)</p>
                  <p className="text-[10px] text-slate-500">Max file size 5MB</p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-900/30 transition-all hover-lift active:scale-95 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit Event Conduction Request to NGO
          </button>
        </form>

      </div>
    </div>
  );
};
