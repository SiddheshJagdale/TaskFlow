import useAddTask from "@/hooks/useAddTask";
import React from "react";
import { GoPlusCircle } from "react-icons/go";

const AddTaskButton = () => {
  const addTaskModal = useAddTask();
  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full px-2 text-black hover:text-white transition-colors duration-300 hover:cursor-pointer"
      onClick={() => addTaskModal.onOpen()}
    >
      <GoPlusCircle />
    </div>
  );
};

export default AddTaskButton;
