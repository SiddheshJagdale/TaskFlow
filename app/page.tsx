"use client";

import AddTaskCard from "@/components/AddTaskCard";
import React from "react";
import TaskCard from "../components/Taskcard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function TaskGrid() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  return (
    <div className="min-h-screen bg-black p-3 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {tasks.map((task: Record<string, any>, index: number) => (
          <TaskCard
            key={index}
            id={task.id}
            title={task.title}
            description={task.description}
            duedate={task.date}
            isImportant={task.important}
          />
        ))}
        <AddTaskCard />
      </div>
    </div>
  );
}
