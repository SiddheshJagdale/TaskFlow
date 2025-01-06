import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-full px-4 py-3 flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-[20%_80%] lg:grid-cols-[18%_82%] gap-3 h-full ">
        <Sidebar />
        <div className="flex flex-col  bg-black text-white p-6 rounded-lg shadow-lg h-full overflow-y-auto mt-14 md:mt-0 ">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
