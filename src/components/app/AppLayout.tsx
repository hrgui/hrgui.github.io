import type { ComponentChildren } from "preact";

import { I18nProvider } from "~/i18n/context";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children?: ComponentChildren;
  currentUrl?: string;
  currentPathName?: string;
  locale?: string;
}

const AppLayout = ({ children, currentPathName, locale = "en" }: Props) => {
  return (
    <I18nProvider locale={locale}>
      <div className="bg-background font-body text-on-background">
        <Header currentPathName={currentPathName} />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </div>
    </I18nProvider>
  );
};

export default AppLayout;
