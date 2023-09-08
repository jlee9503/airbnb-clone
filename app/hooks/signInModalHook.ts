import { create } from "zustand";

interface SignInModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const signInModalHook = create<SignInModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default signInModalHook;