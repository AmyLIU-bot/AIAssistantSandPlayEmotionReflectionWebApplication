import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <div className="flex-1 ml-[80px] flex justify-center">
        <main className="w-full max-w-5xl p-4 md:p-8 mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
