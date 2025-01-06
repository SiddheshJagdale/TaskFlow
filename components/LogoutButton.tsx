import React from "react";
import { IoIosLogOut } from "react-icons/io";

const LogoutButton = () => {
  return (
    <div className="  mt-auto">
      <button className=" flex flex-row items-center gap-2 justify-center text-lg py-3 px-4 rounded-md bg-[#F1C40F] text-white hover:bg-yellow-500 transition-colors duration-200 w-full">
        <IoIosLogOut className="font-semibold" style={{ fontSize: "1.5rem" }} />
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
