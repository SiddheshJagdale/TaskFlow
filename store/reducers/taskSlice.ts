import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseStore/firebase";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";

export interface Task {
  id?: string;
  title: string;
  description: string;
  date: string;
  important: boolean;
  isCompleted: boolean;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
};

export const saveTaskToFirestore = createAsyncThunk(
  "tasks/saveTask",
  async (task: Task) => {
    const docRef = await addDoc(collection(db, "tasks"), task);
    return { ...task, id: docRef.id }; // Assign the generated id to the 'id' field
  }
);

export const fetchTaskFromFirestore = createAsyncThunk(
  "tasks/fetchTask",
  async (taskId: string) => {
    const taskRef = doc(db, "tasks", taskId);
    const taskDoc = await getDoc(taskRef);
    if (taskDoc.exists()) {
      return { id: taskDoc.id, ...taskDoc.data() } as Task;
    } else {
      throw new Error("Task not found");
    }
  }
);

export const deleteTaskFromFirestore = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string) => {
    await deleteDoc(doc(db, "tasks", taskId));
    return taskId;
  }
);

export const editTaskFromFirestore = createAsyncThunk(
  "tasks/editTask",
  async ({
    taskId,
    updatedData,
  }: {
    taskId: string;
    updatedData: Partial<Task>;
  }) => {
    try {
      const docRef = doc(db, "tasks", taskId);
      await updateDoc(docRef, updatedData);
      return { taskId, updatedData };
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(saveTaskToFirestore.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(saveTaskToFirestore.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveTaskToFirestore.rejected, (state) => {
        state.loading = false;
      })

      .addCase(fetchTaskFromFirestore.fulfilled, (state, action) => {
        const task = action.payload;
        const existingTaskIndex = state.tasks.findIndex(
          (t) => t.id === task.id
        );
        if (existingTaskIndex >= 0) {
          state.tasks[existingTaskIndex] = task;
        } else {
          state.tasks.push(task);
        }
        state.loading = false;
      })
      .addCase(editTaskFromFirestore.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editTaskFromFirestore.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchTaskFromFirestore.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskFromFirestore.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTaskFromFirestore.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTaskFromFirestore.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
