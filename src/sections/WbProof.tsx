import React, { useState } from 'react';
import sahilJain from '@/assets/testimonials/Sahil-Jain.webp';
import bvSrinivasababu from '@/assets/testimonials/b-v-srinivasa-babu.webp';
import atulGarg from '@/assets/testimonials/atul-garg.webp';

const testimonials = [
  {
    quote:
      "I just wanted to share a quick note and let you know that you guys do a really good job. I'm glad I decided to do business with you. You guys have made integration so quick and smooth which has not been there with other GSPs. When it comes to support, you guys have always been there round the clock. Thanks, guys!",
    name: 'Sahil Jain',
    role: 'Director - Smartbiz Technologies Pvt. Ltd.',
    photo: sahilJain,
  },
  {
    quote:
      'WhiteBooks helped me to Generate the e-Invoices and e-Way Bills from my SAP in a single click. Their SAP connector is efficient, simple and cost effective.',
    name: 'B V Srinivasababu',
    role: 'Sr Manager - IT Applications, NSL',
    photo: bvSrinivasababu,
  },
  {
    quote:
      'WhiteBooks is solving GST complex problems like e-Invoicing and e-Way Bill with Ease and Simple APIs. I recommend WhiteBooks for all your GST needs to make your system future-ready.',
    name: 'CA Atul Garg',
    role: 'Finance Controller - WheelsEye',
    photo: atulGarg,
  },
];

function Stars() {
  return (
    <div className="flex gap-[3px] mb-5" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="var(--brand)" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ quote, name, role, photo }: (typeof testimonials)[0]) {
  return (
    <div className="group relative flex flex-col rounded-[20px] p-9 bg-[var(--bg-elev)] border border-[var(--line-2)] overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[var(--brand-border)] hover:shadow-[0_8px_32px_-12px_rgba(220,47,101,0.18)]">

      {/* Hover radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 55% at 100% 0%, rgba(220,47,101,0.06), transparent 65%)' }}
      />

      {/* Decorative quote watermark */}
      <span
        aria-hidden="true"
        className="absolute top-4 right-7 font-display leading-none text-brand select-none pointer-events-none"
        style={{ fontSize: 96, opacity: 0.065 }}
      >
        &ldquo;
      </span>

      <div className="relative z-[1] flex flex-col flex-1">
        <Stars />
        <p className="font-display text-[16px] leading-[1.75] text-primary flex-1">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Author row */}
      <div className="relative z-[1] flex items-center gap-3 mt-7 pt-6 border-t border-[var(--line)]">
        <img
          src={photo}
          alt={name}
          className="w-[44px] h-[44px] rounded-full object-cover flex-shrink-0 border border-[var(--line-2)]"
        />
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-semibold text-primary leading-tight">{name}</div>
          <div className="text-[12px] text-muted font-mono mt-[3px] truncate">{role}</div>
        </div>
      </div>
    </div>
  );
}

const navBtnClass =
  'w-11 h-11 rounded-full border border-[var(--line-2)] bg-transparent text-primary text-[16px] cursor-pointer flex items-center justify-center transition-[background,border-color,color] duration-200 hover:border-[var(--brand-border)] hover:text-brand hover:bg-[var(--brand-soft)]';

export function ProofSection() {
  const [startIndex, setStartIndex] = useState(0);
  const total = testimonials.length;

  const prev = () => setStartIndex((i) => (i - 1 + total) % total);
  const next = () => setStartIndex((i) => (i + 1) % total);

  const visible = [testimonials[startIndex], testimonials[(startIndex + 1) % total]];

  return (
    <section className="relative bg-[var(--bg-2)] py-24 overflow-hidden">

      {/* Top hairline — brand gradient */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(90deg, transparent 8%, rgba(220,47,101,0.45) 50%, transparent 92%)' }}
      />

      {/* Ambient glow — top center */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 60% 38% at 50% 0%, rgba(220,47,101,0.07), transparent 70%)' }}
      />

      {/* Dot grid — masked to center */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(220,47,101,0.13) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, #000 10%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, #000 10%, transparent 80%)',
        }}
      />

      <div className="relative z-[2] w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 max-sm:flex-col max-sm:items-start max-sm:gap-6">
          <div>
            <h2 className="font-display text-[clamp(28px,3vw,42px)] leading-[1.2] tracking-[-0.02em] text-primary mb-3">
              What Our Customers Say
            </h2>
            <p className="text-[15.5px] text-secondary max-w-[400px] leading-[1.6]">
              Trusted by finance controllers and IT heads across the country.
            </p>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            <button className={navBtnClass} onClick={prev} aria-label="Previous testimonial">←</button>
            <button className={navBtnClass} onClick={next} aria-label="Next testimonial">→</button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="h-[7px] rounded-full border-none p-0 cursor-pointer transition-[width,background] duration-[250ms]"
              style={{
                width: i === startIndex ? 24 : 7,
                background: i === startIndex ? 'var(--brand)' : 'var(--line-2)',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
