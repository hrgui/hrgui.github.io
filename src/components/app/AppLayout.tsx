import type { ComponentChildren } from "preact";

import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children?: ComponentChildren;
  currentUrl?: string;
  currentPathName?: string;
}

const AppLayout = ({ children, currentPathName }: Props) => {
  return (
    <div className="bg-background font-body text-on-background">
      <Header currentPathName={currentPathName} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
