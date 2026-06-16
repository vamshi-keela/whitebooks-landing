import React from "react";

export default function StripBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="waveGradient">
          <stop offset="0%" stopColor="#635BFF" />
          <stop offset="50%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#635BFF" />
        </linearGradient>
      </defs>

      {[...Array(35)].map((_, i) => (
        <path
          key={i}
          d={`M0 ${200 + i * 18} C300 ${100 + i * 12}, 600 ${350 + i * 10}, 1600 ${220 + i * 18}`}
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="1"
          opacity={0.25}
        />
      ))}
    </svg>
  );
}
