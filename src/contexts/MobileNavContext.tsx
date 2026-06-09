import { createContext, useContext } from 'react';

interface MobileNavCtx {
  open: boolean;
  openNav: () => void;
  closeNav: () => void;
}

export const MobileNavContext = createContext<MobileNavCtx>({
  open: false,
  openNav: () => {},
  closeNav: () => {},
});

export const useMobileNav = () => useContext(MobileNavContext);
