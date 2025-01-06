"use client";

import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { IoMdClose } from "react-icons/io";

const tabs = [
  { name: "All Tasks", link: "/" },
  { name: "Ongoing", link: "/ongoing" },
  { name: "Completed", link: "/completed" },
  { name: "Important", link: "/important" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-black z-50 transform transition-transform duration-300 shadow-lg  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:relative sm:translate-x-0 sm:w-full sm:h-full sm:rounded-lg sm:shadow-lg sm:border-r sm:border-neutral-700`}
      >
        <aside className="flex flex-col w-full h-full p-6 ">
          <div
            className=" md:hidden text-white text-2xl flex flex-row items-center justify-end hover:cursor-pointer "
            onClick={closeSidebar}
          >
            <IoMdClose />
          </div>
          {/* Profile Section */}
          <div className="mb-10 flex items-center gap-4">
            <div className="bg-gray-400 h-12 w-12 rounded-full"></div>
            <div className="text-white">
              <div className="text-lg font-medium">John Doe</div>
              <div className=" hidden md:flex text-sm text-gray-400">
                john.doe@example.com
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex-grow flex flex-col gap-4">
            {tabs.map((tab, index) => (
              <Link
                href={tab.link}
                key={index}
                className={`text-lg py-3 px-4 rounded-md transition-colors duration-200 ${
                  pathname === tab.link
                    ? "bg-[#F1C40F] text-white" // Active tab with your color
                    : "text-gray-300 hover:bg-neutral-700 hover:text-white"
                }`}
                onClick={() => setIsOpen(false)} // Close the sidebar when a tab is clicked
              >
                {tab.name}
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <LogoutButton />
        </aside>
      </div>

      <div className="fixed left-0 top-0 w-full sm:hidden">
        {!isOpen && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 p-3 bg-neutral-800 rounded-md text-white shadow-md z-50"
          >
            <GiHamburgerMenu size={24} />
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
