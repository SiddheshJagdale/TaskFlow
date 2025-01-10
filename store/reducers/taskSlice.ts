import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseStore/firebase"; // Import Firestore instance

interface Task {
  id?: string; // Firestore document ID
  title: string;
  description: string;
  date: string;
  important: boolean;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
};

// Async Thunks
export const saveTaskToFirestore = createAsyncThunk(
  "tasks/saveTask",
  async (task: Task) => {
    // Log the data being sent to Firestore for inspection
    console.log("Data being sent to Firestore:", task);

    const docRef = await addDoc(collection(db, "tasks"), task); // Add to Firestore

    // Return the task with Firestore ID
    return { ...task, id: docRef.id };
  }
);

export const fetchTasksFromFirestore = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Task)
    );
  }
);

export const deleteTaskFromFirestore = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string) => {
    await deleteDoc(doc(db, "tasks", taskId)); // Delete from Firestore
    return taskId; // Return the deleted task's ID
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Save Task
      .addCase(saveTaskToFirestore.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })
      .addCase(saveTaskToFirestore.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveTaskToFirestore.rejected, (state) => {
        state.loading = false;
      })
      // Fetch Tasks
      .addCase(fetchTasksFromFirestore.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasksFromFirestore.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksFromFirestore.rejected, (state) => {
        state.loading = false;
      })
      // Delete Task
      .addCase(deleteTaskFromFirestore.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
