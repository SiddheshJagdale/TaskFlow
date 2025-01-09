import type { Metadata } from "next";
import "./globals.css";
import React, { ReactNode } from "react";
import ReduxProvider from "../libs/ReduxProvider";
import Layout from "../components/Layout";
import AddTaskModal from "@/components/Modals/AddTaskModal";

export const metadata: Metadata = {
  title: "Task Manager",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-neutral-600">
        <ReduxProvider>
          <AddTaskModal />
          <Layout>{children}</Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}
