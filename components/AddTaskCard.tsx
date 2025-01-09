"use client";

import React from "react";
import AddTaskButton from "./AddTaskButton";

const AddTaskCard = ({}) => {
  return (
    <div
      className="flex flex-col h-full w-full p-4 bg-neutral-400 text-white rounded-lg shadow-lg border border-neutral-700 text-4xl hover:cursor-pointer hover:opacity-90 transition-all duration-300"
    >
      <AddTaskButton />
    </div>
  );
};

export default AddTaskCard;
