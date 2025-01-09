import { create } from "zustand";

interface AddTaskStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddTask = create<AddTaskStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddTask;
