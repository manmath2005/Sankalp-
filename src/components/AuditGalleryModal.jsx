import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Users, 
  Building2, 
  ShieldCheck,
  CheckCircle2,
  Heart,
  Share2,
  MessageCircle,
  ThumbsUp,
  Award,
  Sparkles,
  ExternalLink,
  Camera,
  Layers,
  FileCheck
} from 'lucide-react';

export const AuditGalleryModal = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery', 'social', 'audit'
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!event) return null;

  const galleryImages = event.galleryImages || [
    event.image,
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
  ];

  const socialReactions = event.socialPosts || [
    {
      id: "POST-1",
      platform: "LinkedIn",
      platformIcon: "💼",
      author: `${event.partnerName || "Corporate CSR"} Leadership`,
      handle: "@partner_csr",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      time: "2 days ago",
      text: `Proud to partner with ${event.ngoName || 'Sankalp Network'} on "${event.title}". Over ${event.attendees || '1,000+'} citizens mobilized with 100% auditable impact! #CorporateSocialResponsibility #CSRIndia #SocialImpact`,
      likes: 428,
      shares: 64,
      comments: 29
    },
    {
      id: "POST-2",
      platform: "X / Twitter",
      platformIcon: "🐦",
      author: "Youth Volunteer Network",
      handle: "@youth_volunteers_in",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      time: "4 days ago",
      text: `On-ground energy was unmatched at ${event.venue}! ⚡ Earned my digital SHA-256 verifiable certificate for ${event.volunteersEngaged || 40} hours of onfield civic service. 📜✨`,
      likes: 812,
      shares: 135,
      comments: 54
    },
    {
      id: "POST-3",
      platform: "Instagram",
      platformIcon: "📸",
      author: "Community Voices India",
      handle: "@grassroots_impact",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      time: "1 week ago",
      text: `Swipe to see the transformation ➡️ Behind the scenes of ${event.title}. Transparent, community-led, and verified on-chain. 🌱🤝`,
      likes: 1240,
      shares: 210,
      comments: 88
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-slate-200/90 dark:border-slate-700 dark:bg-slate-900 shadow-float-lg overflow-hidden max-h-[92vh] flex flex-col text-left">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white relative border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-1 pr-8">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Verified Drive Audit & Media
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {event.id} • Completed {event.completedDate}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {event.title}
            </h2>
            <p className="text-xs text-slate-300">
              Conducted by: <strong className="text-sky-300">{event.ngoName}</strong> • In Partnership with <strong className="text-amber-300">{event.partnerName}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 pt-3 pb-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Photo Gallery ({galleryImages.length})
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'social'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            Social Media Buzz & Posts ({socialReactions.length})
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'audit'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            Institutional Audit Ledger
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white dark:bg-slate-900">
          
          {/* TAB 1: Photo Gallery */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-sky-600" />
                    On-Ground Photographic Evidence
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    High-resolution captured drive moments verified by field coordinators.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {galleryImages.length} Certified Photos
                </span>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((imgUrl, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedPhoto(imgUrl)}
                    className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-700 bg-slate-950 shadow-xs hover:shadow-md transition-all"
                  >
                    <img 
                      src={imgUrl} 
                      alt={`${event.title} Moment ${idx + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Click to Enlarge
                      </span>
                    </div>
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-200">
                      Photo #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>

              {/* Lightbox / Selected Photo Modal */}
              {selectedPhoto && (
                <div 
                  onClick={() => setSelectedPhoto(null)}
                  className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4 cursor-pointer"
                >
                  <div className="relative max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                    <img src={selectedPhoto} alt="Enlarged moment" className="w-full h-full object-contain" />
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Social Media Buzz & Community Mentions */}
          {activeTab === 'social' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-sky-600" />
                  Live Social Media Coverage & Public Mentions
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Aggregated public posts, volunteer feedback, and institutional endorsements across social channels.
                </p>
              </div>

              <div className="space-y-3">
                {socialReactions.map((post) => (
                  <div 
                    key={post.id} 
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 space-y-3 hover:border-sky-300 dark:hover:border-sky-600 transition-colors"
                  >
                    {/* Post Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.avatar} 
                          alt={post.author} 
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700" 
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                              {post.author}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {post.handle}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <span>{post.platformIcon} {post.platform}</span> • <span>{post.time}</span>
                          </span>
                        </div>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[10px] font-bold border border-sky-200 dark:border-sky-800">
                        Verified Mention
                      </span>
                    </div>

                    {/* Post Text */}
                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                      {post.text}
                    </p>

                    {/* Engagement Counts */}
                    <div className="flex items-center gap-4 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3.5 h-3.5 text-sky-500" />
                        <strong>{post.likes}</strong> Likes
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3.5 h-3.5 text-emerald-500" />
                        <strong>{post.shares}</strong> Reposts
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-indigo-500" />
                        <strong>{post.comments}</strong> Comments
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Complete Institutional Audit */}
          {activeTab === 'audit' && (
            <div className="space-y-5">
              
              {/* Summary Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
                  Campaign Executive Summary
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {event.summary}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Citizens Impacted</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">{event.attendees}+ Beneficiaries</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Volunteers</span>
                  <span className="text-sm font-extrabold text-sky-600 dark:text-sky-400">{event.volunteersEngaged} Active Leads</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Certificates</span>
                  <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{event.certificatesIssued} Issued</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Venue</span>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate block">{event.venue}</span>
                </div>
              </div>

              {/* Tasks Completed List */}
              <div className="space-y-2">
                <h5 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Documented Task Milestones Completed:
                </h5>
                <div className="space-y-1.5">
                  {event.tasksCompleted?.map((task, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Institutional Partner Feedback */}
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-1.5">
                <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 uppercase tracking-widest block">
                  Official Partner Feedback:
                </span>
                <p className="text-xs text-amber-950 dark:text-amber-200 italic font-medium">
                  "{event.partnerFeedback}"
                </p>
                <span className="text-[10px] font-bold text-amber-800/80 dark:text-amber-400 block pt-1">
                  — {event.partnerName}
                </span>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Audited & Certified by BridgeImpact Platform
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white font-bold text-xs shadow-xs press-effect"
          >
            Close Audit
          </button>
        </div>

      </div>
    </div>
  );
};
