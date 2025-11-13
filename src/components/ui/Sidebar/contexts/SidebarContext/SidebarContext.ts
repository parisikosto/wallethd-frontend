import { createContext } from 'react';

export type SidebarContextProps = {
  isMobile: boolean;
  open: boolean;
  openMobile: boolean;
  setOpen: (open: boolean) => void;
  setOpenMobile: (open: boolean) => void;
  state: 'expanded' | 'collapsed';
  toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextProps | null>(null);
