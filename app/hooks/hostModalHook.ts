import { create } from "zustand";

interface HostModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const HostModalHook = create<HostModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default HostModalHook;
