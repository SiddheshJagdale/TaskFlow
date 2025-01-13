"use client";

import React, { useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { deleteTaskFromFirestore } from "@/store/reducers/taskSlice";
import { useAppDispatch } from "@/store/hooks"; // Import the typed hook
import { toast } from "react-toastify";
import useEditTask from "@/hooks/useEditTask";

interface TaskCardProps {
  title: string;
  description: string;
  isCompleted?: boolean;
  isImportant: boolean;
  duedate: string;
  id: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  isCompleted,
  isImportant,
  duedate,
  id,
}) => {
  const dispatch = useAppDispatch();
  const editTaskModal = useEditTask();

  const handleDelete = useCallback(async () => {
    await dispatch(deleteTaskFromFirestore(id));
    toast.success("Task deleted");
  }, [dispatch, id]);
  const handleEdit = useCallback(() => {
    editTaskModal.onOpen({
      id,
      title,
      description,
      date: duedate,
      important: isImportant,
      isCompleted: false,
    });
  }, [
    editTaskModal,
    id,
    title,
    description,
    duedate,
    isImportant,
    isCompleted,
  ]);

  return (
    <div className="flex flex-col h-full w-full p-6 bg-neutral-800 text-white rounded-lg shadow-md border border-neutral-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold truncate">{title}</h2>
        {isImportant && <FaStar className="text-yellow-400 text-lg" />}
      </div>
      <p className="text-sm text-gray-300 mb-4">{description}</p>
      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            isCompleted
              ? "bg-green-700 text-green-200"
              : "bg-red-700 text-red-200"
          }`}
        >
          {isCompleted ? "Completed" : "Incomplete"}
        </span>
        <span className="text-xs text-gray-400">Due: {duedate}</span>
      </div>
      <div className="flex justify-end items-center space-x-4">
        <button
          onClick={handleDelete}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 transition"
        >
          <MdDeleteOutline className="text-white text-xl" />
        </button>
        <button
          onClick={handleEdit}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 transition"
        >
          <CiEdit className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
