import Logo from "./Logo";
import AppSocialMedia from "./AppSocialMedia";

const Footer = () => {
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
              Harman Goei (hrgui) is a developer that loves to make cool and
              awesome web applications. His strength is in HTML, CSS,
              JavaScript, but he is willing to code anywhere in the stack to
              make the web be awesome.
            </p>
          </div>
          <div className="mb-4 mt-4">
            <nav className="flex flex-col">
              <a
                href="/"
                className={
                  "text-red-700 dark:text-red-500 hover:underline font-medium"
                }
              >
                Home
              </a>
              <a
                href="/posts"
                className={
                  "text-red-700 dark:text-red-500 hover-underline font-medium"
                }
              >
                Blog
              </a>
              <a
                href="/portfolio"
                className={
                  "text-red-700 dark:text-red-500 hover-underline font-medium"
                }
              >
                Portfolio
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="p-6 bg-gray-200 dark:bg-neutral-800 border-t-2 border-gray-300 dark:border-neutral-700 dark:text-gray-200">
        <div className="container mx-auto flex justify-between">
          <div>&copy; {new Date().getFullYear()} Harman Goei</div>
          <AppSocialMedia />
          <div>
            <button
              onClick={handleBackToTop}
              className="text-red-700 dark:text-red-500 hover-underline font-medium"
            >
              back to top?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
