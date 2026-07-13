import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/cn';

interface PillButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
  /** Shared layoutId for the animated active background — use one unique id per pill group on the page. */
  layoutId: string;
  className?: string;
}

export function PillButton({ isActive, onClick, children, layoutId, className }: PillButtonProps) {
  const color = isActive ? 'text-[var(--pill-bg)]' : 'text-[var(--pill-fg-secondary)] hover:text-[var(--pill-fg-primary)]';
  const borderColor = isActive ? 'border-[var(--pill-hairline-active)]' : 'border-[var(--pill-hairline)]';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`relative cursor-pointer rounded-full border-2 border-solid bg-transparent px-4 py-2 text-[13.5px] font-medium shadow-[0_2px_0_var(--pill-shadow),0_5px_12px_-5px_var(--pill-shadow)] transition-[color,transform,box-shadow] duration-200 active:translate-y-[2px] active:shadow-[0_0_0_var(--pill-shadow),0_0_0_-5px_var(--pill-shadow)] sm:px-5 sm:text-[14px] ${color} ${className} ${borderColor}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {isActive && (
        <motion.span
          layoutId={layoutId}
          aria-hidden
          className="absolute -inset-0.5 rounded-full"
          style={{ background: 'var(--pill-fg-primary)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
      {!isActive && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ background: 'var(--pill-bg-card)' }}
        />
      )}
      <span className="relative z-[1]">{children}</span>
    </button>
  );
}




// import type { ReactNode } from 'react';
// import { motion } from 'framer-motion';
// import { cn } from '@/shared/lib/cn';

// interface PillButtonProps {
//   isActive: boolean;
//   onClick: () => void;
//   children: ReactNode;
//   /** Shared layoutId for the animated active background — use one unique id per pill group on the page. */
//   layoutId: string;
//   className?: string;
// }

// export function PillButton({ isActive, onClick, children, layoutId, className }: PillButtonProps) {
//   const color = isActive ? 'text-[var(--bg)]' : 'text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]';
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       aria-pressed={isActive}
//       className={`relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300 sm:px-5 sm:text-[14px] ${color} ${className}`}
//       style={{ WebkitTapHighlightColor: 'transparent' }}
//     >
//       {isActive && (
//         <motion.span
//           layoutId={layoutId}
//           aria-hidden
//           className="absolute inset-0 rounded-full"
//           style={{
//             background: 'var(--fg-primary)',
//             boxShadow: '0 8px 24px -8px rgba(0,0,0,0.45)',
//           }}
//           transition={{ type: 'spring', stiffness: 380, damping: 32 }}
//         />
//       )}
//       {!isActive && (
//         <span
//           aria-hidden
//           className="absolute inset-0 rounded-full"
//           style={{ background: 'var(--bg-card)', border: '1px solid var(--hairline)' }}
//         />
//       )}
//       <span className="relative z-[1]">{children}</span>
//     </button>
//   );
// }
