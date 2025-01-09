"use client";

import { useState, useCallback } from "react";
import React from "react";
import Modal from "../Modal";
import useAddTask from "@/hooks/useAddTask";
import { addTask } from "@/store/reducers/taskSlice";
import { useDispatch } from "react-redux";

const AddTaskModal = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    date: "",
    important: false,
  });
  const dispatch = useDispatch();

  const title = "Add New Task";

  const handleSubmit = useCallback(() => {
    dispatch(addTask(taskData));
    setTaskData({
      title: "",
      description: "",
      date: "",
      important: false,
    });
    addTaskModal.onClose();
  }, [taskData]);

  const Body = (
    <div className="flex flex-col gap-3 justify-center items-start">
      <div className="flex flex-col gap-1 w-full">
        <p className="text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl">
          Title
        </p>
        <input
          type="text"
          value={taskData.title}
          placeholder="Enter title"
          className="px-2 py-1 rounded-lg border-[2px] text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl"
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <p className="text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl">
          Description
        </p>
        <input
          type="text"
          value={taskData.description}
          placeholder="Enter description"
          className="px-2 py-1 rounded-lg border-[2px] text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl"
          onChange={(e) =>
            setTaskData({ ...taskData, description: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl">
          Complete by{" "}
        </label>
        <input
          type="date"
          value={taskData.date}
          id="task-date"
          name="task-date"
          className="px-2 py-1 rounded-lg border-[2px] text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl"
          onChange={(e) => setTaskData({ ...taskData, date: e.target.value })}
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
              name="important"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4"
              onClick={() => {
                setTaskData({ ...taskData, important: true });
              }}
            />
            <label className="text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl">
              Yes
            </label>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <input
              type="radio"
              name="important"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4"
              onClick={() => setTaskData({ ...taskData, important: false })}
            />
            <label className="text-sm sm:text-base md:text-xl lg:text-xl xl:text-xl">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const addTaskModal = useAddTask();

  return (
    <>
      <Modal
        body={Body}
        title={title}
        isOpen={addTaskModal.isOpen}
        onClose={addTaskModal.onClose}
        onSubmit={handleSubmit} // Fixed
        submitButton={true}
      />
    </>
  );
};

export default AddTaskModal;
