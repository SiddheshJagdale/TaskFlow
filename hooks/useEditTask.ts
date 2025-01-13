import { create } from "zustand";

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  important: boolean;
  isCompleted: boolean;
}

interface EditTaskStore {
  isOpen: boolean;
  task: Task | null; 
  onOpen: (task: Task) => void; 
  onClose: () => void;
}

const useEditTask = create<EditTaskStore>((set) => ({
  isOpen: false,
  task: null,
  onOpen: (task) => set({ isOpen: true, task }), 
  onClose: () => set({ isOpen: false, task: null }), 
}));

export default useEditTask;
