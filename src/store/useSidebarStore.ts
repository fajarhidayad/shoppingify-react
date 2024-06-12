import { create } from 'zustand';

type ActiveMenu = 'lists' | 'details' | 'create';

interface SidebarState {
  active: ActiveMenu;
  setListActive: () => void;
  setCreateActive: () => void;
  setDetailsActive: () => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  active: 'lists',
  setListActive: () => set(() => ({ active: 'lists' })),
  setCreateActive: () => set(() => ({ active: 'create' })),
  setDetailsActive: () => set(() => ({ active: 'details' })),
}));
