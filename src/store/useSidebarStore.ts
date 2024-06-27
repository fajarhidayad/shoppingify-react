import { Item } from '@/api/items';
import { create } from 'zustand';

type ActiveMenu = 'lists' | 'details' | 'create';

interface SidebarState {
  active: ActiveMenu;
  itemDetails: Item | null;
  setListActive: () => void;
  setCreateActive: () => void;
  setDetailsActive: (item: Item) => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  active: 'lists',
  itemDetails: null,
  setListActive: () => set(() => ({ active: 'lists' })),
  setCreateActive: () => set(() => ({ active: 'create' })),
  setDetailsActive: (item) =>
    set(() => ({ active: 'details', itemDetails: item })),
}));
