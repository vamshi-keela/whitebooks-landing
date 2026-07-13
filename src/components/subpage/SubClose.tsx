import { Button, ButtonLink } from "@/shared/ui/Button";
import type { ClosingSection } from "@/shared/types/pages";
import { useEffect, useState } from "react";
import { BookDemoModal } from "../modals/BookDemoModal.tsx";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  data: ClosingSection;
}

const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

export function SubClose({ data }: Props) {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    if (demoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  return (
    <>
      <section
        className="relative overflow-hidden py-[60px] sm:py-[90px]"
        id="book-demo"
      >
        <div
          aria-hidden
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(220,47,101,0.12),transparent_60%)]"
        />

        <div className={`${wrap} relative z-10 text-center`}>
          <h2 className="font-display font-semibold text-[clamp(32px,3.8vw,64px)] tracking-[-0.02em] leading-[1.1] mx-auto max-w-[720px] text-balance m-0 text-[var(--fg-primary)]">
            {data.h2}
          </h2>
          <p className="mt-[18px] mb-7 mx-auto max-w-[580px] text-[var(--muted-2)] text-base md:text-lg leading-[1.55]">
            {data.body}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {data.primaryCta && (
              <Button onClick={() => { setDemoOpen(true); }} size="lg" arrow>
                {data.primaryCta.label}
              </Button>
            )}
            {data.secondaryCta && (
              <ButtonLink href={data.secondaryCta.href || "#"} variant="secondary" size="lg" arrow>
                {data.secondaryCta.label}
              </ButtonLink>
            )}
          </div>
        </div>
        {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
      </section>
    </>
  );
}

export function APISubClose({ data }: Props) {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    if (demoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  return (
    <>
      <section
        className="relative overflow-hidden border-t border-solid border-hairline py-[60px] sm:py-[90px]"
        id="book-demo"
      >
        <div
          aria-hidden
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(220,47,101,0.12),transparent_60%)]"
        />

        <div className={`${wrap} relative z-10 text-center`}>
          <h2 className="font-display font-medium text-[clamp(28px,4vw,44px)] tracking-[-0.02em] leading-[1.1] mx-auto max-w-[720px] text-balance m-0 text-[var(--fg-primary)]">
            {data.h2}
          </h2>
          <p className="mt-[18px] mb-7 mx-auto max-w-[580px] text-[var(--muted-2)] text-[16px] leading-[1.55]">
            {data.body}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {data.primaryCta && (
              <ButtonLink href='https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId' size="lg" arrow>
                {data.primaryCta.label}
              </ButtonLink>
            )}
            {data.secondaryCta && (
              <Link to={data.secondaryCta.href || "#"} target={data.secondaryCta.target || "_self"}>
                <Button variant="secondary" size="lg" arrow>
                  {data.secondaryCta.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
        {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
      </section>
    </>
  );
}
