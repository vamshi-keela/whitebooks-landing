import React from 'react';

interface HeroBackdropProps {
  intensity?: number;
}

export function HeroBackdrop({ intensity = 0.55 }: HeroBackdropProps) {
  return (
    <>
      <div className="wb-grid-bg"></div>
      <div className="wb-fluid-mesh" style={{ opacity: intensity } as React.CSSProperties}></div>
      <div className="wb-grain"></div>
    </>
  );
}

export default HeroBackdrop;
