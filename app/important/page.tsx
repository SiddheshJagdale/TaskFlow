"use client";

import React from "react";
import TaskCard from "../../components/Taskcard";
import { useAppSelector } from "@/store/hooks";
import { Task } from "@/store/reducers/taskSlice";
import { RootState } from "@/store/store";
import { Bars } from "react-loader-spinner"; // Import the loader spinner
import useFirestoreTasks from "@/libs/useFireStoreTasks";

export default function Important() {
  const tasks = useAppSelector((state: RootState) => state.tasks.tasks);
  const loading = useAppSelector((state: RootState) => state.tasks.loading);

  const importantTasks = tasks.filter((task) => task.important === true);
  useFirestoreTasks();

  return (
    <div className="h-screen bg-black p-3 flex flex-col items-center">
      {loading ? (
        <div className="flex flex-col w-full h-full justify-center items-center p-3">
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
          {importantTasks.length > 0 &&
            importantTasks.map((task: Task) => (
              <TaskCard
                key={task.id}
                id={task.id || "taskid"}
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
