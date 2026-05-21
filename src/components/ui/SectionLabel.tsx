import React from 'react';

interface SectionLabelProps {
  num: string | number;
  children: React.ReactNode;
}

export function SectionLabel({ num, children }: SectionLabelProps) {
  return (
    <div className="section-label">
      <span className="num-tag">{num}</span>
      <span>{children}</span>
    </div>
  );
}

export default SectionLabel;
