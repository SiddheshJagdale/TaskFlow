"use client";

import React from "react";
import { usePathname } from "next/navigation";

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
    <div className="flex flex-row py-2 w-full items-center border-b-2 border-[#F1C40F] bg-black">
      <h1 className="text-2xl font-bold">{getHeaderTitle()}</h1>
    </div>
  );
};

export default Header;
