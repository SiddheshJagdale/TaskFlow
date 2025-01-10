"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AddTaskButton from "./AddTaskButton";

const Header = () => {
  const pathname = usePathname();

  const getHeaderTitle = () => {
    switch (pathname) {
      case "/":
        return "All Tasks";
      case "/completed":
        return "Completed Tasks";
      case "/important":
        return "Important Tasks";
      case "/ongoing":
        return "Ongoing Tasks";
      default:
        return "Tasks";
    }
  };

  return (
    <div className="flex flex-row py-2 w-full justify-between items-center border-b-2 border-[#F1C40F] bg-black px-4 sm:px-6">
      <h1 className="text-xl sm:text-2xl font-bold text-white">
        {getHeaderTitle()}
      </h1>
      <div className="flex mt-2 sm:mt-0 bg-white rounded-full hover:bg-neutral-400 transition-colors px-1 py-2 text-2xl">
        <AddTaskButton />
      </div>
    </div>
  );
};

export default Header;
