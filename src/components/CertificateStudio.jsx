import React, { useRef, useState } from 'react';
import { Award, Printer, ShieldCheck, CheckCircle2, QrCode, Sparkles, X, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { generateQRCodeSVG } from '../utils/qrCodeGenerator';

export const CertificateStudio = ({ certificate, volunteerName, onClose }) => {
  const { ngoInfo } = useApp();
  const certRef = useRef(null);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  React.useEffect(() => {
    triggerConfetti();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!certificate) return null;

  // Verification URL for QR Code
  const verificationUrl = `https://sankalp.org/verify-certificate?id=${certificate.id}&volunteer=${encodeURIComponent(volunteerName)}`;
  const qrSvgHtml = generateQRCodeSVG(verificationUrl, 110);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-amber-300 shadow-float-lg overflow-hidden my-6">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="p-4 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">
              Verified Accredited Volunteer Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(certificate.eventTitle)}&organizationName=${encodeURIComponent(ngoInfo.name || 'ImpactBridge & Sankalp Foundation')}&issueYear=${new Date(certificate.issuedDate || Date.now()).getFullYear()}&issueMonth=${new Date(certificate.issuedDate || Date.now()).getMonth() + 1}&certUrl=${encodeURIComponent(verificationUrl)}&certId=${encodeURIComponent(certificate.certificateNumber || certificate.id)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold shadow transition-all flex items-center gap-1.5 press-effect"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.44a1.64 1.64 0 1 0 1.64 1.64A1.64 1.64 0 0 0 7.83 6.44Z"/>
              </svg>
              <span>Add to LinkedIn</span>
            </a>

            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black shadow transition-all flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE TEMPLATE WITH QR CODE */}
        <div className="p-6 sm:p-10 bg-slate-100 flex justify-center">
          <div 
            id="printable-certificate"
            ref={certRef}
            className="w-full max-w-3xl bg-white rounded-2xl p-8 sm:p-12 shadow-2xl border-[12px] border-double border-amber-600 relative text-center overflow-hidden"
          >
            {/* Background Seal Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
              <ShieldCheck className="w-96 h-96 text-slate-900" />
            </div>

            {/* Colorful Foil Corner Accents */}
            <div className="absolute top-3 left-3 w-10 h-10 border-t-4 border-l-4 border-amber-500"></div>
            <div className="absolute top-3 right-3 w-10 h-10 border-t-4 border-r-4 border-amber-500"></div>
            <div className="absolute bottom-3 left-3 w-10 h-10 border-b-4 border-l-4 border-amber-500"></div>
            <div className="absolute bottom-3 right-3 w-10 h-10 border-b-4 border-r-4 border-amber-500"></div>

            {/* Header Brand */}
            <div className="space-y-1 mb-6">
              <p className="text-xs font-black tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-sky-700 to-emerald-700">
                {ngoInfo.name}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">
                Reg No: {ngoInfo.registrationNo} • Govt Recognized Social Awareness Organization
              </p>
            </div>

            {/* Certificate Title */}
            <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight my-4">
              Certificate of Appreciation
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-6">
              THIS CERTIFICATE IS PROUDLY PRESENTED TO
            </p>

            {/* Recipient Name */}
            <div className="py-2 mb-6 border-b-2 border-amber-500 inline-block px-12">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-sky-950 font-sans tracking-tight">
                {volunteerName}
              </h2>
            </div>

            {/* Citation Body */}
            <p className="text-sm text-slate-700 leading-relaxed max-w-xl mx-auto font-medium">
              In grateful recognition of extraordinary dedication and active volunteer participation in conducting the awareness drive titled:
            </p>
            
            <p className="text-base sm:text-lg font-bold text-slate-900 italic my-3 bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 py-2.5 px-6 rounded-xl border border-amber-200/80 inline-block shadow-sm">
              "{certificate.eventTitle}"
            </p>

            <p className="text-xs text-slate-600 font-medium">
              Contributing <strong>{certificate.hoursContributed} Hours</strong> of exemplary community service toward public civic awareness.
            </p>

            {/* Footer Signatures, QR Code Verification & Official Seal */}
            <div className="grid grid-cols-3 items-end pt-8 mt-8 border-t border-slate-200">
              
              {/* Left: QR Code Verification Scanner */}
              <div className="text-left space-y-1">
                <div 
                  className="w-24 h-24 mb-1"
                  dangerouslySetInnerHTML={{ __html: qrSvgHtml }}
                />
                <p className="text-[9px] font-bold text-slate-700 uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Scan to Verify Authenticity
                </p>
                <p className="text-[9px] font-mono text-slate-500">
                  ID: {certificate.id}
                </p>
              </div>

              {/* Center: Official Seal Badge */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-600 to-yellow-400 text-slate-950 flex items-center justify-center shadow-lg border-4 border-white mb-1">
                  <ShieldCheck className="w-9 h-9" />
                </div>
                <span className="text-[9px] font-black text-amber-900 uppercase tracking-widest">
                  OFFICIAL NGO SEAL
                </span>
                <span className="text-[8px] text-slate-400 font-semibold">AUTHENTICATED</span>
              </div>

              {/* Right: Signature */}
              <div className="text-right space-y-1 text-xs">
                <div className="font-serif italic font-extrabold text-slate-900 text-sm border-b-2 border-slate-300 pb-1 inline-block">
                  Dr. R. K. Saxena
                </div>
                <p className="text-[10px] font-bold text-slate-700 uppercase">
                  {certificate.verifierSignature || "President & Campaign Director"}
                </p>
                <p className="text-[9px] text-slate-500">Sankalp Social Foundation</p>
                <p className="text-[9px] font-semibold text-slate-400">Issued On: {certificate.issuedDate}</p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
