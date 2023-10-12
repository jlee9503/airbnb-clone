import { create } from "zustand";

interface SearchModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const SearchModalHook = create<SearchModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default SearchModalHook;