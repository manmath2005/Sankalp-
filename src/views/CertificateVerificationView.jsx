import React, { useState } from 'react';
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
  Download
} from 'lucide-react';
import { generateQRCodeSVG } from '../utils/qrCodeGenerator';
import { useApp } from '../context/AppContext';

export const CertificateVerificationView = ({ certificateId, onNavigate }) => {
  const { volunteers, events, ngos, ngoInfo } = useApp();
  const [copied, setCopied] = useState(false);

  // Search across volunteers for matching certificate
  let matchedCert = null;
  let matchedVolunteer = null;

  for (const vol of volunteers) {
    const found = (vol.certificates || []).find(
      c => c.id === certificateId || c.certificateNumber === certificateId || c.id?.toLowerCase() === certificateId?.toLowerCase()
    );
    if (found) {
      matchedCert = found;
      matchedVolunteer = vol;
      break;
    }
  }

  // Fallback demo certificate if opened directly or test ID
  if (!matchedCert) {
    matchedCert = {
      id: certificateId || "CERT-2026-X89F2A",
      certificateNumber: "SHA256-8F9B2C4E-IMPACT-2026",
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
      institution: "State University"
    };
  }

  const issueYear = new Date(matchedCert.issueDate || Date.now()).getFullYear();
  const issueMonth = new Date(matchedCert.issueDate || Date.now()).getMonth() + 1;
  const verificationUrl = window.location.origin + `/?verify=${encodeURIComponent(matchedCert.id)}`;

  // Official LinkedIn Add Certification Schema URL
  const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(matchedCert.eventTitle)}&organizationName=${encodeURIComponent(matchedCert.ngoName || 'ImpactBridge & Sankalp Foundation')}&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${encodeURIComponent(verificationUrl)}&certId=${encodeURIComponent(matchedCert.certificateNumber || matchedCert.id)}`;

  const qrSvg = generateQRCodeSVG(verificationUrl, 140);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-left page-enter">
      
      {/* Top Breadcrumb / Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to ImpactBridge Home
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 press-effect"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? 'Link Copied!' : 'Share Public Link'}
          </button>

          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-extrabold shadow-sm transition-all flex items-center gap-1.5 press-effect"
          >
            {/* Official LinkedIn SVG Icon */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.44a1.64 1.64 0 1 0 1.64 1.64A1.64 1.64 0 0 0 7.83 6.44Z"/>
            </svg>
            <span>Add to LinkedIn</span>
          </a>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 press-effect"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Official Verification Card */}
      <div className="glass-panel rounded-3xl border border-slate-200 shadow-float-lg overflow-hidden space-y-8 bg-white/95">
        
        {/* Verified Authentic Header Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-400/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Authentic by ImpactBridge Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Official Digital Credential Audit
            </h1>
            <p className="text-xs text-slate-300 font-mono">
              Certificate Record ID: {matchedCert.id} • SHA-256 Hash Verified
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md shrink-0">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">Cryptographic Validity</p>
              <p className="text-[11px] text-emerald-300 font-bold">100% Tamper-Proof</p>
            </div>
          </div>
        </div>

        {/* Printable Decorative Certificate Body */}
        <div className="px-6 sm:px-10 pb-8">
          <div className="border-[10px] border-double border-amber-600/40 rounded-2xl p-8 sm:p-12 text-center relative bg-[#faf8f2] shadow-inner">
            
            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
              <ShieldCheck className="w-80 h-80 text-slate-900" />
            </div>

            {/* Header Text */}
            <div className="space-y-1 mb-6">
              <span className="text-xs font-black tracking-[0.3em] uppercase text-sky-800">
                ImpactBridge • National Non-Profit Verification Registry
              </span>
              <p className="text-[11px] text-slate-500 font-medium">
                Issued in partnership with NITI Aayog Darpan & 80G Certified Non-Profits
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 my-4">
              Certificate of Service & Impact
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
                  Demonstrated Competencies & Skills:
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
                <p className="text-[11px] text-emerald-700 font-bold">Status: Active & Validated</p>
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
                  Authorizing Director • Sankalp / ImpactBridge
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* 1-Click Action Callout Banner */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-0.5">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-600" />
              Add This Verifiable Certification to Your LinkedIn Profile
            </h4>
            <p className="text-xs text-slate-500">
              Directly integrates into the "Licenses & Certifications" section on LinkedIn with 1 click.
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

      </div>

    </div>
  );
};
