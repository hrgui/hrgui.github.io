import classNames from "classnames";
import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "~/i18n/context";

import { type Frontmatter } from "~/types/frontmatter";

import { toDisplayDate, isNew } from "./utils";

interface Props {
  posts?: Frontmatter[];
}

const postCellClassName =
  "hr-frame-cell group flex flex-col no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent";

const toNodeId = (index: number) =>
  `SYSLOG_${String(index + 1).padStart(2, "0")}`;

// Empty cells that close the last row so the ruled grid never has a hole.
// Literal class names so UnoCSS can see them.
const MD_FILL = ["md:hidden", "md:block md:col-span-1"];
const LG_FILL = [
  "lg:hidden",
  "lg:block lg:col-span-2",
  "lg:block lg:col-span-1",
];

const Posts = ({ posts }: Props) => {
  const { t } = useTranslation();
  // isNew uses new Date() — must be evaluated client-side only so the static
  // build doesn't bake in a stale "today" value that never updates on GitHub Pages.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const checkIsNew = (date?: string) => mounted && isNew(date);
  const visiblePosts =
    posts?.filter(
      (post) => !(post.hidden && process.env.NODE_ENV !== "development")
    ) || [];

  const [featuredPost, ...remainingPosts] = visiblePosts;

  // featured spans 2 columns: md row = featured alone, lg row = featured + 1
  const mdFill = remainingPosts.length % 2;
  const lgFill = Math.max(remainingPosts.length - 1, 0) % 3;
  const showFill = featuredPost && (mdFill > 0 || lgFill > 0);

  const renderMeta = (date: string | undefined, index: number) => (
    <div className="mb-6 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em]">
      <div className="inline-flex items-center gap-3">
        {checkIsNew(date) && (
          <span className="rounded-full bg-success-muted px-2.5 py-0.5 font-semibold text-success">
            {t("blog.posts.newBadge")}
          </span>
        )}
        <span className="text-fg-muted">{toDisplayDate(date)}</span>
      </div>
      <span className="text-fg-subtle">{toNodeId(index)}</span>
    </div>
  );

  const hiddenSuffix = (hidden?: boolean) =>
    hidden && process.env.NODE_ENV === "development"
      ? t("blog.posts.hiddenSuffix")
      : "";

  return (
    <section className="hr-frame">
      <div className="hr-frame-col">
        <div className="hr-frame-grid hr-frame-grid--cards">
          {featuredPost && (
            <a
              href={`${featuredPost.slug}`}
              className={`${postCellClassName} md:col-span-2`}
              data-testid={`posts-${featuredPost.slug}`}
            >
              {renderMeta(featuredPost.date, 0)}
              <h2
                className={classNames(
                  "max-w-[22ch] text-headline text-fg transition-colors duration-150 group-hover:text-accent md:text-display-md",
                  { italic: featuredPost.hidden }
                )}
              >
                {featuredPost.title}
                {hiddenSuffix(featuredPost.hidden)}
              </h2>
              {featuredPost.excerpt && (
                <p className="mt-5 max-w-[60ch] text-lead text-fg-muted">
                  {featuredPost.excerpt}
                </p>
              )}
              <span className="hr-link mt-auto pt-10">
                {t("blog.posts.executeRead")}
              </span>
            </a>
          )}

          {remainingPosts.map((post, index) => (
            <a
              href={`${post.slug}`}
              key={post.slug}
              data-testid={`posts-${post.slug}`}
              className={postCellClassName}
            >
              {renderMeta(post.date, index + 1)}
              <h3
                className={classNames(
                  "text-title-lg text-fg transition-colors duration-150 group-hover:text-accent",
                  { italic: post.hidden }
                )}
              >
                {post.title}
                {hiddenSuffix(post.hidden)}
              </h3>
              {post.excerpt && (
                <p className="mt-3 line-clamp-3 text-fg-muted">
                  {post.excerpt}
                </p>
              )}
              <span className="hr-link mt-auto pt-8">
                {t("blog.posts.readMore")}
              </span>
            </a>
          ))}

          {showFill && (
            <div
              className={`hr-frame-cell hidden ${MD_FILL[mdFill]} ${LG_FILL[lgFill]}`}
              aria-hidden="true"
            />
          )}

          {visiblePosts.length === 0 && (
            <div className="hr-frame-cell col-span-full text-fg-muted">
              {t("blog.posts.noPosts")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Posts;
