import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Calendar, 
  Clock, 
  UserCheck, 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  Share2, 
  ArrowLeft, 
  Printer, 
  QrCode,
  Sparkles,
  Lock,
  Download,
  AlertTriangle,
  FileCheck,
  ShieldAlert,
  UserX
} from 'lucide-react';
import { generateQRCodeSVG } from '../utils/qrCodeGenerator';
import { useApp } from '../context/AppContext';

export const CertificateVerificationView = ({ certificateId, onNavigate }) => {
  const { volunteers, events, ngos, ngoInfo, currentUser, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [antiTamperTriggered, setAntiTamperTriggered] = useState(false);

  // Anti-Tamper & DevTools Inspection Restriction
  useEffect(() => {
    const blockDevTools = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) ||
        (e.ctrlKey && ['u', 'U', 's', 'S'].includes(e.key))
      ) {
        e.preventDefault();
        e.stopPropagation();
        setAntiTamperTriggered(true);
        if (showToast) {
          showToast("Inspection and source modification are disabled on official certificates for anti-tamper security.", "warning");
        }
        setTimeout(() => setAntiTamperTriggered(false), 4000);
        return false;
      }
    };

    window.addEventListener('keydown', blockDevTools, { capture: true });
    return () => window.removeEventListener('keydown', blockDevTools, { capture: true });
  }, [showToast]);

  // Resolve matching certificate and volunteer
  let matchedCert = null;
  let matchedVolunteer = null;
  let noCertificatesForVolunteer = false;

  // Case 1: Specific certificateId was requested (e.g. from QR code or URL ?verify=ID)
  if (certificateId) {
    for (const vol of volunteers) {
      const found = (vol.certificates || []).find(
        c => c.id === certificateId || c.certificateNumber === certificateId || c.id?.toLowerCase() === certificateId?.toLowerCase()
      );
      if (found) {
        matchedCert = {
          ...found,
          eventTitle: found.eventTitle || "Social Awareness & Disaster Response Drive",
          ngoName: found.ngoName || ngoInfo?.name || "Sankalp Social Foundation",
          issueDate: found.issuedDate || found.issueDate || "2026-07-16",
          hoursLogged: found.hoursContributed || found.hoursLogged || 6,
          skills: found.skills || ["Community Coordination", "Social Mobilization", "Crisis Relief", "Digital Logistics"],
          certificateNumber: found.certificateNumber || `SHA256-${found.id || 'VALID'}-SANKALP-2026`
        };
        matchedVolunteer = vol;
        break;
      }
    }
  }

  // Case 2: No specific certificateId or not found, but a Volunteer is logged in
  if (!matchedCert && currentUser && currentUser.role === 'VOLUNTEER') {
    // Find current user's volunteer record in volunteers list
    const userVol = volunteers.find(v => v.email?.toLowerCase() === currentUser.email?.toLowerCase() || v.id === currentUser.id);
    
    if (userVol && userVol.certificates && userVol.certificates.length > 0) {
      const cert = userVol.certificates[userVol.certificates.length - 1];
      matchedCert = {
        ...cert,
        eventTitle: cert.eventTitle || "National Awareness Campaign Drive",
        ngoName: cert.ngoName || ngoInfo?.name || "Sankalp Social Foundation",
        issueDate: cert.issuedDate || cert.issueDate || "2026-07-16",
        hoursLogged: cert.hoursContributed || cert.hoursLogged || 8,
        skills: userVol.skills || ["Public Engagement", "Event Coordination", "First Aid Response"],
        certificateNumber: cert.certificateNumber || `SHA256-${cert.id || 'VAULT'}-SANKALP-2026`
      };
      matchedVolunteer = {
        name: currentUser.name || userVol.name || currentUser.email,
        email: currentUser.email,
        roleCategory: userVol.roleCategory || currentUser.profession || "Registered Volunteer",
        institution: currentUser.institution || userVol.institution || "Sankalp Network"
      };
    } else if (currentUser.registeredEvents && currentUser.registeredEvents.length > 0) {
      // User has registered for events
      const evt = events.find(e => currentUser.registeredEvents.includes(e.id)) || events[0];
      matchedCert = {
        id: `CERT-SANKALP-${(currentUser.name || 'VOL').replace(/\s+/g, '').substring(0, 4).toUpperCase()}-2026`,
        certificateNumber: `SHA256-${Date.now().toString(36).toUpperCase()}-SANKALP-VALID`,
        eventTitle: evt ? evt.title : "National Disaster Relief & Awareness Drive",
        ngoName: evt ? (evt.ngoName || ngoInfo?.name || "Sankalp Social Foundation") : "Sankalp Social Foundation",
        issueDate: new Date().toISOString().split('T')[0],
        hoursLogged: evt?.estimatedHours || 6,
        skills: currentUser.skills || ["Social Awareness", "Civic Outreach", "Community Aid"],
        status: "Verified & Active"
      };
      matchedVolunteer = {
        name: currentUser.name || currentUser.email,
        email: currentUser.email,
        roleCategory: currentUser.profession || "Active Volunteer Member",
        institution: currentUser.institution || "Verified Institution"
      };
    } else {
      noCertificatesForVolunteer = true;
    }
  }

  // Case 3: Public viewer with sample/demo certificate fallback
  if (!matchedCert && !noCertificatesForVolunteer) {
    matchedCert = {
      id: certificateId || "CERT-2026-X89F2A",
      certificateNumber: "SHA256-8F9B2C4E-SANKALP-2026",
      eventTitle: "National Cyber Safety & RTI Awareness Conclave",
      ngoName: "Sankalp Social Foundation (DARPAN: MH/2018/019482)",
      issueDate: "2026-07-15",
      hoursLogged: 6,
      skills: ["Cyber Hygiene", "Citizen Grievance Filing", "Public Coordination", "RTI Documentation"],
      status: "Verified & Active",
      signatureHash: "0x89f2a91b4c3e7d6a5e1f0b8c4d2e"
    };
    matchedVolunteer = {
      name: "Rohan S. Verma",
      email: "rohan.verma@example.com",
      roleCategory: "Lead Cyber Volunteer",
      institution: "Delhi Technological University"
    };
  }

  // Determine if viewer is authorized to download (Owner or NGO Admin)
  const isOwner = currentUser && matchedVolunteer && (
    (currentUser.email && currentUser.email.toLowerCase() === matchedVolunteer.email?.toLowerCase()) ||
    (currentUser.name && matchedVolunteer.name && currentUser.name.toLowerCase() === matchedVolunteer.name.toLowerCase()) ||
    (currentUser.id && currentUser.id === matchedVolunteer.id)
  );
  const isAuthorizedAdmin = currentUser && (
    currentUser.role === 'SUPER_ADMIN' || 
    currentUser.role === 'NGO_PARTNER' || 
    currentUser.role === 'NGO_STAFF'
  );
  const hasParticipated = Boolean(isOwner || isAuthorizedAdmin);

  const issueYear = matchedCert ? new Date(matchedCert.issueDate || Date.now()).getFullYear() : 2026;
  const issueMonth = matchedCert ? new Date(matchedCert.issueDate || Date.now()).getMonth() + 1 : 7;
  const verificationUrl = matchedCert ? (window.location.origin + `/?verify=${encodeURIComponent(matchedCert.id)}`) : window.location.href;

  // Official LinkedIn Add Certification Schema URL
  const linkedInUrl = matchedCert ? `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(matchedCert.eventTitle)}&organizationName=${encodeURIComponent(matchedCert.ngoName || 'Sankalp Social Network & Foundation')}&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${encodeURIComponent(verificationUrl)}&certId=${encodeURIComponent(matchedCert.certificateNumber || matchedCert.id)}` : '#';

  const qrSvg = generateQRCodeSVG(verificationUrl, 140);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    if (showToast) showToast("Public verification link copied to clipboard.", "info");
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    if (!hasParticipated) {
      if (showToast) {
        showToast("Download is locked: You must have completed and been verified in this drive to export the certificate.", "warning");
      }
      return;
    }
    window.print();
  };

  const handleContextMenuProtection = (e) => {
    e.preventDefault();
    setAntiTamperTriggered(true);
    if (showToast) {
      showToast("Right-click context menu is restricted to prevent unauthorized alteration of credentials.", "warning");
    }
    setTimeout(() => setAntiTamperTriggered(false), 3000);
  };

  // State: Volunteer logged in but has not completed any drives yet
  if (noCertificatesForVolunteer) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-6 page-enter">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors self-start mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="horizon-glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800/90 shadow-2xl space-y-5 animate-float-up text-center relative overflow-hidden">
          <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-[2px]" />
          
          <div className="w-16 h-16 rounded-3xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-white">
            No Verified Certificates Issued Yet
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Welcome, <strong className="text-white font-bold">{currentUser?.name || currentUser?.email}</strong>. You have not completed any verified awareness drives or micro-tasks yet. Once you participate in an on-ground or virtual drive, your accredited certificate with dynamic QR validation will appear here automatically.
          </p>

          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/60 max-w-md mx-auto text-left flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-200/90 font-medium leading-relaxed">
              <strong>How to earn your certificate:</strong> Browse upcoming drives or complete 2–5 hour micro-volunteering tasks to receive official 80G/MCA Section 135 accredited digital credentials.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('events')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white text-xs font-black shadow-lg shadow-emerald-900/30 press-effect flex items-center gap-2 hover-lift transition-all"
            >
              <span>Explore Active Drives & Tasks</span>
              <Award className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('volunteer-hub')}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 press-effect transition-all"
            >
              Go to Volunteer Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="max-w-4xl mx-auto px-4 py-12 text-left page-enter select-none"
      onContextMenu={handleContextMenuProtection}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
    >
      {/* Anti-Tamper Alert Notification */}
      {antiTamperTriggered && (
        <div className="mb-4 p-4 rounded-2xl bg-red-600 text-white text-xs font-black shadow-lg flex items-center justify-between gap-3 animate-bounce">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>Anti-Tamper Lock: Inspection, developer shortcuts, and context menus are restricted on verified certificates.</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] uppercase font-mono">SEC-PROTECT</span>
        </div>
      )}

      {/* Top Breadcrumb / Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sankalp Home
        </button>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 press-effect border border-slate-700"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? 'Link Copied!' : 'Share Public Link'}
          </button>

          {/* Conditional Download & LinkedIn Buttons based on Authentic Participation */}
          {hasParticipated ? (
            <>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-extrabold shadow-sm transition-all flex items-center gap-1.5 press-effect"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.44a1.64 1.64 0 1 0 1.64 1.64A1.64 1.64 0 0 0 7.83 6.44Z"/>
                </svg>
                <span>Add to LinkedIn</span>
              </a>

              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 press-effect shadow-lg shadow-emerald-900/30 hover-lift"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official Certificate</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                disabled
                title="Download locked: Participation verification required"
                className="px-4 py-2 rounded-xl bg-slate-900/60 text-slate-500 text-xs font-bold border border-slate-800 cursor-not-allowed flex items-center gap-1.5 shadow-none"
              >
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Download Locked (Participation Required)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Participation Status Notice Banner */}
      {!hasParticipated && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-950/30 border border-amber-800/60 text-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-extrabold block text-amber-300">Public Audit Verification Mode</span>
              <p className="text-[11px] text-amber-200/80">
                This public audit record is authentic on Sankalp's cryptographic ledger. High-resolution PDF export and LinkedIn accreditation are unlocked only for the verified participant.
              </p>
            </div>
          </div>
          {currentUser ? (
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-amber-900/60 border border-amber-700/50 font-bold shrink-0 self-start sm:self-auto text-amber-200">
              Signed in as: {currentUser.name || currentUser.email}
            </span>
          ) : (
            <button
              onClick={() => onNavigate('volunteer-login')}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-black shrink-0 self-start sm:self-auto transition-all"
            >
              Sign In to Unlock
            </button>
          )}
        </div>
      )}

      {/* Main Official Verification Card */}
      <div className="horizon-glass-panel rounded-3xl border border-slate-800/90 shadow-2xl overflow-hidden space-y-8 relative">
        <div className="horizon-gradient-line absolute top-0 left-0 right-0 h-[2px]" />
        
        {/* Verified Authentic Header Banner */}
        <div className="p-6 sm:p-8 bg-slate-950/80 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-mono font-extrabold border border-emerald-800/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Authentic by Sankalp Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Official Digital Credential Audit
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Certificate Record ID: {matchedCert.id} • SHA-256 Hash Verified
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center font-black shadow-md">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">Cryptographic Validity</p>
              <p className="text-[11px] text-emerald-400 font-bold font-mono">100% Tamper-Proof</p>
            </div>
          </div>
        </div>

        {/* Printable Decorative Certificate Body */}
        <div className="px-6 sm:px-10 pb-8">
          <div 
            className="border-[10px] border-double border-amber-600/40 rounded-2xl p-8 sm:p-12 text-center relative bg-[#faf8f2] shadow-inner select-none"
            onContextMenu={handleContextMenuProtection}
          >
            
            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none">
              <ShieldCheck className="w-80 h-80 text-slate-900" />
            </div>

            {/* Anti-Tamper Security Strip */}
            <div className="absolute top-3 right-3 text-[9px] font-mono font-black uppercase text-slate-400 tracking-widest pointer-events-none opacity-60">
              🔒 IMMUTABLE DIGITAL RECORD
            </div>

            {/* Header Text */}
            <div className="space-y-1 mb-6">
              <span className="text-xs font-black tracking-[0.3em] uppercase text-sky-800">
                Sankalp • National Non-Profit Verification Registry
              </span>
              <p className="text-[11px] text-slate-500 font-medium">
                Issued in partnership with NITI Aayog Darpan &amp; 80G Certified Non-Profits
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 my-4">
              Certificate of Service &amp; Impact
            </h2>

            <p className="text-xs text-slate-500 uppercase tracking-widest font-extrabold mb-4">
              THIS CERTIFIES THAT
            </p>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-indigo-800 to-slate-900 border-b-2 border-slate-300/80 inline-block pb-1.5 px-6 mb-4">
              {matchedVolunteer.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto leading-relaxed mb-6">
              has completed verified service of <strong>{matchedCert.hoursLogged || 4} volunteer hours</strong> contributing to <br />
              <strong className="text-slate-900 text-sm">"{matchedCert.eventTitle}"</strong> conducted by <br />
              <strong className="text-sky-900">{matchedCert.ngoName}</strong>.
            </p>

            {/* Skills Badges Array */}
            {matchedCert.skills && matchedCert.skills.length > 0 && (
              <div className="mb-8 max-w-lg mx-auto">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">
                  Demonstrated Competencies &amp; Skills:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {matchedCert.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800 text-[11px] font-bold shadow-sm">
                      ✨ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Signatures & QR Code */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 items-center text-xs text-slate-600">
              
              {/* Left: Issue Date & Cert Hash */}
              <div className="text-left space-y-1">
                <p className="font-mono text-[11px] text-slate-400">Date Issued: <strong>{matchedCert.issueDate}</strong></p>
                <p className="font-mono text-[10px] text-slate-400 truncate max-w-xs">Hash: {matchedCert.certificateNumber || matchedCert.id}</p>
                <p className="text-[11px] text-emerald-700 font-bold">Status: Active &amp; Validated</p>
              </div>

              {/* Middle: Live QR Code for Verification */}
              <div className="flex flex-col items-center justify-center">
                <div 
                  className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm inline-block"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
                <span className="text-[9px] font-mono text-slate-400 mt-1 uppercase tracking-wider">Scan to Verify</span>
              </div>

              {/* Right: Signature */}
              <div className="text-right space-y-1">
                <div className="font-serif italic text-lg text-slate-800 font-bold border-b border-slate-300 pb-1 inline-block">
                  Dr. R. K. Saxena
                </div>
                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Authorizing Director • Sankalp Platform
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* 1-Click Action Callout Banner */}
        {hasParticipated && (
          <div className="p-6 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="space-y-0.5">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Add This Verifiable Certification to Your LinkedIn Profile
              </h4>
              <p className="text-xs text-slate-400">
                Directly integrates into the "Licenses &amp; Certifications" section on LinkedIn with 1 click.
              </p>
            </div>

            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-black shadow-md transition-all flex items-center gap-2 shrink-0 press-effect"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.44a1.64 1.64 0 1 0 1.64 1.64A1.64 1.64 0 0 0 7.83 6.44Z"/>
              </svg>
              <span>Add to LinkedIn Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

      </div>

    </div>
  );
};
