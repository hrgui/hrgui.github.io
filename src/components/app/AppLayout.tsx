import { ComponentChildren } from "preact";

import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children?: ComponentChildren;
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
