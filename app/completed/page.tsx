"use client";

import React, { useEffect } from "react";
import TaskCard from "../../components/Taskcard";
import { Task } from "@/store/reducers/taskSlice";
import { useAppSelector } from "@/store/hooks";
import { Bars } from "react-loader-spinner"; // Import the loader spinner

export default function Completed() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const loading = useAppSelector((state) => state.tasks.loading);

  // Filter completed tasks
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="h-screen bg-black p-3 flex flex-col items-center">
      {loading ? (
        <div className="flex flex-col w-full h-full justify-center items-center p-3">
          {/* Display the loading spinner while fetching tasks */}
          <Bars
            height="80"
            width="80"
            color="#F1C40F"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
          {completedTasks.length > 0 &&
            completedTasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                id={task.id || "taskId"}
                title={task.title}
                description={task.description}
                duedate={task.date}
                isImportant={task.important}
                isCompleted={task.isCompleted}
              />
            ))}
        </div>
      )}
    </div>
  );
}
