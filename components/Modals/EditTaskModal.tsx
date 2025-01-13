

"use client";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "../Modal";
import useEditTask from "@/hooks/useEditTask";
import { editTaskFromFirestore } from "../../store/reducers/taskSlice";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-toastify";

const EditTaskModal = () => {
  const editTaskModal = useEditTask();
  const taskData = editTaskModal.task;
  const dispatch = useAppDispatch();

  const id = editTaskModal.task?.id as string;

  const [formState, setFormState] = useState(
    taskData || {
      title: "",
      description: "",
      date: "",
      important: false,
      isCompleted: false,
    }
  );

  // Update form state when task data changes
  useEffect(() => {
    if (taskData) setFormState(taskData);
  }, [taskData]);

  const handleSubmit = useCallback(async () => {
    try {
      await dispatch(
        editTaskFromFirestore({ taskId: id, updatedData: formState })
      );
      editTaskModal.onClose();
      toast.success("Task updated");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    }
  }, [dispatch, editTaskFromFirestore, editTaskModal, id, formState]);

  const Body = (
    <div className="flex flex-col gap-3 justify-center items-start">
      <div className="flex flex-col gap-1 w-full">
        <p className="text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl">
          Title
        </p>
        <input
          type="text"
          value={formState.title}
          onChange={(e) =>
            setFormState({ ...formState, title: e.target.value })
          }
          className="px-2 py-1 rounded-lg border-[2px] text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl"
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <p className="text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl">
          Description
        </p>
        <input
          type="text"
          value={formState.description}
          onChange={(e) =>
            setFormState({ ...formState, description: e.target.value })
          }
          className="px-2 py-1 rounded-lg border-[2px] text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl"
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <p className="text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl">
          Complete by
        </p>
        <input
          type="date"
          value={formState.date}
          onChange={(e) => setFormState({ ...formState, date: e.target.value })}
          className="px-2 py-1 rounded-lg border-[2px] text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl"
        />
      </div>
      <div className="flex flex-row w-full justify-between items-center p-1">
        <label className="text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl">
          Is this task important?
        </label>
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-1 items-center">
            <input
              type="radio"
              checked={formState.important}
              onChange={() => setFormState({ ...formState, important: true })}
            />
            <label>Yes</label>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <input
              type="radio"
              checked={!formState.important}
              onChange={() => setFormState({ ...formState, important: false })}
            />
            <label>No</label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      body={Body}
      title="Edit Task"
      isOpen={editTaskModal.isOpen}
      onClose={editTaskModal.onClose}
      onSubmit={handleSubmit}
      submitButton={true}
    />
  );
};

export default EditTaskModal;
