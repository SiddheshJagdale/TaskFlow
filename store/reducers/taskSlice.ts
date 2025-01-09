import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  title: string;
  description: string;
  date: string;
  important: boolean;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.tasks = state.tasks.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
