import { create } from 'zustand';

export interface ListItem {
  id: number;
  name: string;
  quantity: number;
}

interface ItemListState {
  name: string;
  items: ListItem[];
}

interface ItemListActions {
  setListName: (name: string) => void;
  addItem: (item: ListItem) => void;
  removeItem: (id: number) => void;
  setQuantity: (id: number, qty: number) => void;
  reset: () => void;
}

const initialState: ItemListState = {
  name: '',
  items: [],
};

export const useItemList = create<ItemListState & ItemListActions>()((set) => ({
  ...initialState,
  setListName: (name) => set(() => ({ name })),
  addItem: (newItem) =>
    set((state) => ({
      items: state.items.find((item) => item.id === newItem.id)
        ? state.items
        : [...state.items, newItem],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  setQuantity: (id, qty) =>
    set((state) => ({
      items: state.items.map((item) => {
        if (item.id === id) return { ...item, quantity: qty };
        return item;
      }),
    })),
  reset: () => set(initialState),
}));
