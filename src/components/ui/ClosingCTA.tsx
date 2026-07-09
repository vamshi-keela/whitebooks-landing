import React, { useEffect, useState } from "react";
import { Button, ButtonLink } from "./Button";
import { EyebrowPill } from "./EyebrowPill";
import { BookDemoModal } from "../modals/BookDemoModal";
import { Link } from "react-router-dom";

interface ClosingCTAProps {
  eyebrow?: string;
  eyebrowSubTitle?: string;
  title: string;
  body?: string;
  primary: string;
  secondary?: string;
}

export function ClosingCTA({
  eyebrow,
  eyebrowSubTitle,
  title,
  body,
  primary,
  secondary,
}: ClosingCTAProps) {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    if (demoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  return (
    <>
      <section className="relative overflow-hidden max-[700px]:py-[72px] py-24">
        <div
          className="absolute inset-[-10%] pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse 38% 50% at var(--m1x) var(--m1y), rgba(220,47,101,0.5), transparent 65%),
            radial-gradient(ellipse 36% 42% at var(--m2x) var(--m2y), rgba(255,110,156,0.42), transparent 70%),
            radial-gradient(ellipse 30% 36% at var(--m3x) var(--m3y), rgba(255,168,120,0.22), transparent 72%),
            radial-gradient(ellipse 32% 38% at var(--m4x) var(--m4y), rgba(155,22,68,0.55), transparent 65%)`,
            filter: "blur(38px) saturate(160%)",
            animation: "wb-mesh-drift 22s ease-in-out infinite alternate",
            opacity: 0.4,
          } as React.CSSProperties}
        />
        <div className="relative w-full px-24 max-[700px]:px-8 text-center">
          {eyebrow && (
            <EyebrowPill label={eyebrow} subtitle={eyebrowSubTitle} />
          )}
          <h2 className="[font-family:var(--font-serif)] font-semibold text-[clamp(32px,3.8vw,64px)] leading-[1.04] tracking-[-0.025em] m-0 [text-wrap:balance] mt-[18px]">
            {title}
          </h2>
          {body && (
            <p className="text-base md:text-lg text-[var(--fg-secondary)] leading-[1.55] max-w-[600px] m-0 mt-[22px] mx-auto">
              {body}
            </p>
          )}
          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <Button onClick={() => { setDemoOpen(true); }} size="lg" arrow>
              {primary}
            </Button>
            {secondary && (
              <Link to="tel:+919032111788" target="_self">
                <Button variant="secondary" size="lg" arrow>
                  {secondary}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}

export default ClosingCTA;
