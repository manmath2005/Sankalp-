import React, { useState } from 'react';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  HeartHandshake 
} from 'lucide-react';
import { BENEFICIARY_STORIES } from '../data/mockData';

export const TestimonialStoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevStory = () => {
    setCurrentIndex((prev) => (prev === 0 ? BENEFICIARY_STORIES.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setCurrentIndex((prev) => (prev === BENEFICIARY_STORIES.length - 1 ? 0 : prev + 1));
  };

  const current = BENEFICIARY_STORIES[currentIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Full-width subtle background panel */}
      <div className="rounded-3xl bg-gradient-to-br from-sand-100 via-sand-50 to-sage/40 border border-sand-300/80 p-8 sm:p-12 shadow-soft relative overflow-hidden">
        
        {/* Background decorative quote symbol */}
        <Quote className="w-48 h-48 text-forest-700/5 absolute -top-8 -right-8 pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider mb-4">
            <HeartHandshake className="w-3.5 h-3.5 text-forest-600" />
            Human-Centric Field Stories
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Beneficiary Portrait Image */}
            <div className="lg:col-span-4">
              <div className="relative mx-auto max-w-xs">
                <div className="overflow-hidden rounded-3xl shadow-float border-2 border-white/80 aspect-square">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                </div>
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-forest-700 text-white text-[10px] font-heading font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                  {current.impactTag}
                </span>
              </div>
            </div>

            {/* Quote Block and Details */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
                <span className="text-xs font-bold text-charcoal-400 ml-2">Verified Beneficiary Impact</span>
              </div>

              {/* Quote text */}
              <blockquote className="text-lg sm:text-2xl font-serif italic text-forest-900 leading-relaxed">
                "{current.quote}"
              </blockquote>

              {/* Author Info & Navigation Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-sand-300">
                <div>
                  <h4 className="text-base font-heading font-extrabold text-forest-900">
                    {current.name}
                  </h4>
                  <p className="text-xs text-charcoal-500">
                    {current.role} • <strong className="text-forest-700">{current.location}</strong>
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevStory}
                    className="p-2.5 rounded-xl bg-white hover:bg-sand-100 text-forest-900 border border-sand-300 shadow-sm transition-all press-effect"
                    aria-label="Previous story"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono font-bold text-charcoal-400 px-2">
                    0{currentIndex + 1} / 0{BENEFICIARY_STORIES.length}
                  </span>

                  <button
                    type="button"
                    onClick={nextStory}
                    className="p-2.5 rounded-xl bg-white hover:bg-sand-100 text-forest-900 border border-sand-300 shadow-sm transition-all press-effect"
                    aria-label="Next story"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
