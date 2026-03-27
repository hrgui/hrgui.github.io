import { useTranslation } from "~/i18n/context";

import Link from "~/components/layout/Link";
import LinkButton from "~/components/layout/LinkButton";

import AppSocialMedia from "./AppSocialMedia";
import Logo from "./Logo";

const footerLinkClassName =
  "font-mono text-sm uppercase tracking-[0.16em] text-primary transition-all duration-150 ease-out hover:text-primary-container hover:underline hover:decoration-2 hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-high active:opacity-80";

const footerBackToTopClassName =
  "font-mono text-sm uppercase tracking-[0.16em] text-primary transition-all duration-150 ease-out hover:text-primary-container hover:underline hover:decoration-2 hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-high active:opacity-80";

const Footer = () => {
  const { t } = useTranslation();

  function handleBackToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      className="bg-gray-200 dark:bg-neutral-800 dark:text-gray-200"
      data-testid="footer"
    >
      <div className="container mx-auto">
        <div className="p-6 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-8">
          <div>
            <Logo />
            <p className="prose prose-sm dark:text-gray-200 mt-4 mb-4">
              {t("footer.bio")}
            </p>
          </div>
          <div className="mb-4 mt-4">
            <nav className="flex flex-col gap-1">
              <Link href="/" className={footerLinkClassName}>
                {t("nav.home")}
              </Link>
              <Link href="/posts" className={footerLinkClassName}>
                {t("nav.blog")}
              </Link>
              <Link href="/portfolio" className={footerLinkClassName}>
                {t("nav.portfolio")}
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="p-6 bg-gray-200 dark:bg-neutral-800 border-t-2 border-gray-300 dark:border-neutral-700 dark:text-gray-200">
        <div className="container mx-auto flex justify-between">
          <div className="font-mono text-sm uppercase tracking-[0.12em] text-on-surface-muted">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </div>
          <AppSocialMedia />
          <div>
            <LinkButton
              onClick={handleBackToTop}
              className={footerBackToTopClassName}
            >
              {t("footer.backToTop")}
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
