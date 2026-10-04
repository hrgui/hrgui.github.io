import { useTranslation } from "~/i18n/context";

import LinkButton from "~/components/layout/LinkButton";

import AppSocialMedia from "./AppSocialMedia";
import Logo from "./Logo";

const footerLinkClassName =
  "w-fit rounded-sm font-mono text-sm text-fg-muted no-underline transition-colors duration-150 ease-out hover:text-accent hr-focus-ring";

const footerBackToTopClassName =
  "rounded-sm font-mono text-sm text-accent transition-colors duration-150 ease-out hover:underline hover:underline-offset-4 hr-focus-ring";

const Footer = () => {
  const { t } = useTranslation();

  function handleBackToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {/* Breathing room before the aqua divide: an empty frame band that closes
          the content above with a hairline and keeps the column rules going. */}
      <div className="hr-frame" aria-hidden="true">
        <div className="hr-frame-col h-16 md:h-24" />
      </div>
      <footer
        className="hr-frame hr-frame--end hr-footer text-fg"
        data-testid="footer"
      >
        <div className="hr-frame-col">
          <div className="hr-frame-grid hr-frame-grid--2">
            <div className="hr-frame-cell">
              <Logo />
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-fg-muted">
                {t("footer.bio")}
              </p>
            </div>
            <div className="hr-frame-cell">
              <p className="label-mono mb-4 text-accent">
                {t("footer.sitemapLabel")}
              </p>
              <nav className="flex flex-col gap-2">
                <a href="/" className={footerLinkClassName}>
                  {`> ${t("nav.home").toLowerCase()}`}
                </a>
                <a href="/posts" className={footerLinkClassName}>
                  {`> ${t("nav.blog").toLowerCase()}`}
                </a>
                <a href="/portfolio" className={footerLinkClassName}>
                  {`> ${t("nav.portfolio").toLowerCase()}`}
                </a>
              </nav>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-t-solid border-grid-line px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-12">
            <div className="font-mono text-xs text-fg-subtle">
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
      </footer>
    </>
  );
};

export default Footer;
