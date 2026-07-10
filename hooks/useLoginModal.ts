import { create } from 'zustand';

interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false, // 처음에는 닫혀 있는 상태
  onOpen: () => set({ isOpen: true }),  // 열기 스위치
  onClose: () => set({ isOpen: false }), // 닫기 스위치
}));

export default useLoginModal;