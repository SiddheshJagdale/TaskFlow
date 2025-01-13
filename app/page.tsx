"use client";

import AddTaskCard from "@/components/AddTaskCard";
import React, { useEffect } from "react";
import TaskCard from "../components/Taskcard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseStore/firebase";
import { setTasks } from "@/store/reducers/taskSlice";
import { Task } from "@/store/reducers/taskSlice";
import { RootState } from "@/store/store";

export default function TaskGrid() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    const tasksCollectionRef = collection(db, "tasks");

    // Set up Firestore real-time listener
    const unsubscribe = onSnapshot(tasksCollectionRef, (snapshot) => {
      const tasksData = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Task)
      );
      dispatch(setTasks(tasksData));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-black p-3 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {tasks.length > 0 ? (
          tasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              id={task.id || "taskid"}
              title={task.title}
              description={task.description}
              duedate={task.date}
              isImportant={task.important}
              isCompleted={task.isCompleted}
            />
          ))
        ) : (
          <p className="text-white text-center col-span-full">
            No tasks available. Add one to get started!
          </p>
        )}
        <AddTaskCard />
      </div>
    </div>
  );
}
