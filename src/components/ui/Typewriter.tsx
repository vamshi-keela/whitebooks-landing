import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  phrases: string[];
  speed?: number;
  holdMs?: number;
  motion?: boolean;
  className?: string;
}

export function Typewriter({
  phrases,
  speed = 45,
  holdMs = 1600,
  motion = true,
  className,
}: TypewriterProps) {
  const [text, setText] = useState(motion ? '' : phrases[0]);
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!motion) return;
    const cur = phrases[idx % phrases.length];
    if (!deleting && text === cur) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIdx((i) => (i + 1) % phrases.length);
      return;
    }
    const t = setTimeout(() => {
      setText(deleting ? cur.slice(0, text.length - 1) : cur.slice(0, text.length + 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx, phrases, speed, holdMs, motion]);

  return (
    <span className={className}>
      {text}
      <span className="caret-mono"></span>
    </span>
  );
}

export default Typewriter;
