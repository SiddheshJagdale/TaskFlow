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

export const fetchTasksFromFirestore = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Task)
    );
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

export const listenToTasks = () => (dispatch: any) => {
  const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setTasks(tasks));
  });

  return unsubscribe;
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
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
      .addCase(fetchTaskFromFirestore.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskFromFirestore.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTaskFromFirestore.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
