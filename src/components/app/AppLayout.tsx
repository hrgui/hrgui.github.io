import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children?: React.ReactNode;
  currentUrl?: string;
  currentPathName?: string;
}

const AppLayout = ({ children, currentPathName }: Props) => {
  return (
    <div className="font-inter dark:bg-stone-900 dark:text-gray-200">
      <Header currentPathName={currentPathName} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
