import { useState, useEffect, useCallback } from 'react';
import { Header, Footer, FluidBackground, Breadcrumb } from '@/layouts/SiteShell';
import { SubClose } from '@/layouts/SubpageShell';
import { useReveal } from '@/shared/hooks/useReveal';
import EyebrowPill from '@/shared/ui/EyebrowPill';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: 'V2oqgQeI4TE',
    title: 'e-Invoice API Integration Demo',
    description: 'End-to-end walkthrough of IRN generation, cancellation, and credit note issuance via the WhiteBooks e-Invoice API — from authentication to a signed invoice in under 5 minutes.',
    tag: 'API Integration',
    tagColor: 'bg-[rgba(220,47,101,0.12)] text-[var(--brand)] border-[var(--brand-border)]',
  },
  {
    id: 'YAxyY8086c8',
    title: 'e-Way Bill API Integration Demo',
    description: 'Step-by-step demo covering e-way bill generation, extension, and cancellation workflows via REST API — including auto-population from IRN and transporter update calls.',
    tag: 'API Integration',
    tagColor: 'bg-[rgba(220,47,101,0.12)] text-[var(--brand)] border-[var(--brand-border)]',
  },
  {
    id: 'sIMAgTtE4uU',
    title: 'GST API Integration Demo',
    description: 'Comprehensive overview of WhiteBooks GST API — GSTIN validation, GSTR return filing, HSN search, and 2A/2B reconciliation endpoints demonstrated live against the sandbox.',
    tag: 'API Integration',
    tagColor: 'bg-[rgba(220,47,101,0.12)] text-[var(--brand)] border-[var(--brand-border)]',
  },
];

function thumbnailUrl(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

interface VideoCardProps {
  video: VideoItem;
  onPlay: (id: string) => void;
}

function VideoCard({ video, onPlay }: VideoCardProps) {
  return (
    <article
      className="group flex flex-col rounded-2xl overflow-hidden bg-[var(--bg-2)] border border-[var(--line)] hover:border-[var(--brand-border)] transition-all duration-300 cursor-pointer hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)]"
      onClick={() => onPlay(video.id)}
      data-reveal
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[var(--bg-3)]">
        <img
          src={thumbnailUrl(video.id)}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all duration-200 group-hover:bg-[var(--brand)] group-hover:border-[var(--brand)] group-hover:scale-110 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <PlayIcon />
          </div>
        </div>

        {/* Category tag */}
        {/* <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide border backdrop-blur-sm ${video.tagColor}`}>
          {video.tag}
        </span> */}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 p-5">
        <h3 className="text-[var(--text)] font-semibold text-[16px] leading-snug group-hover:text-[var(--brand)] transition-colors duration-200">
          {video.title}
        </h3>
        <p className="text-[var(--muted-2)] text-[13.5px] leading-relaxed line-clamp-3">
          {video.description}
        </p>
        <div className="flex items-center gap-1.5 mt-1 text-[var(--brand)] text-[13px] font-medium">
          <PlayIcon />
          <span>Watch now</span>
        </div>
      </div>
    </article>
  );
}

interface VideoModalProps {
  video: VideoItem;
  onClose: () => void;
}

function VideoModal({ video, onClose }: VideoModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm px-4 py-6"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={video.title}
    >
      {/* Modal container — stop propagation so clicks inside don't close */}
      <div
        className="relative w-full max-w-[900px] flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar: title + close */}
        <div className="flex items-center justify-between gap-4">
          <p className="text-white font-semibold text-[15px] leading-snug truncate">{video.title}</p>
          <button
            onClick={onClose}
            aria-label="Close video"
            className="flex-shrink-0 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* 16:9 iframe container */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-[0_32px_100px_-16px_rgba(0,0,0,0.9)]">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Description below */}
        <p className="text-white/60 text-[13px] leading-relaxed">{video.description}</p>
      </div>
    </div>
  );
}

export function VideosPage() {
  useReveal();
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const handlePlay = useCallback((id: string) => {
    const v = VIDEOS.find(v => v.id === id) ?? null;
    setActiveVideo(v);
  }, []);

  const handleClose = useCallback(() => setActiveVideo(null), []);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="resources" />
      <main>
        {/* Breadcrumb */}
        <section className="pt-[100px] max-sm:pt-[80px] pb-0">
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Resources', href: '/resources/videos' },
              { label: 'Product Videos' },
            ]} />
          </div>
        </section>

        {/* Hero */}
        <section className="relative overflow-hidden pt-[70px] pb-[72px] max-md:pt-12 max-md:pb-14 max-sm:pt-10 max-sm:pb-12">
          <FluidBackground />
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
            <div className="max-w-[760px]">
              <EyebrowPill label="Resources | Product Videos" />
              <h1 className="font-display font-medium text-[clamp(38px,5.2vw,68px)] leading-[1.05] tracking-[-0.025em] mt-[18px] text-balance">
                Explore WhiteBooks Features —{' '}
                <span className="text-[var(--brand)]">Watch & Learn.</span>
              </h1>
              <p className="mt-[22px] max-w-[600px] text-[17px] max-sm:text-[15px] text-[var(--muted-2)] leading-[1.55]">
                In-depth demo videos covering GST API, e-Way Bill API, and e-Invoice API. See exactly how these powerful APIs streamline compliance and integrate into your stack.
              </p>
            </div>
          </div>
        </section>

        {/* Video grid */}
        <section className="relative py-[120px] max-[700px]:py-[72px] wb-reveal" data-reveal>
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
            <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-[var(--muted)] mb-4">API integration demos</p>
            <h2 className="font-display font-medium text-[clamp(32px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] max-w-[780px] text-balance">
              Three APIs. <span className="text-[var(--brand)]">Three complete walkthroughs.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {VIDEOS.map(v => (
                <VideoCard key={v.id} video={v} onPlay={handlePlay} />
              ))}
            </div>

            {/* Count chip */}
            <p className="mt-8 text-[13px] text-[var(--muted)] text-center">
              {VIDEOS.length} videos · More coming soon
            </p>
          </div>
        </section>

        {/* Closing */}
        <SubClose
          h2="Want a live walkthrough?"
          body="Our team will walk you through any API live — share your screen, run against your own data, answer every question. Takes 20 minutes."
          primaryCta={{ label: 'Book a 20-min Demo', href: '#' }}
          secondaryCta={{ label: 'Talk to Sales: +91 90321 11788', href: 'tel:+919032111788' }}
        />
      </main>
      <Footer />

      {/* YouTube embed modal */}
      {activeVideo && <VideoModal video={activeVideo} onClose={handleClose} />}
    </div>
  );
}
