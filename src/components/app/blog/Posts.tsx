import classNames from "classnames";

import { type Frontmatter } from "~/types/frontmatter";

import { toDisplayDate } from "./utils";

interface Props {
  posts?: Frontmatter[];
}

const postCardClassName =
  "group flex h-full flex-col rounded-2xl border border-solid border-surface-container-low bg-surface-container-low px-7 py-8 transition-all duration-150 ease-out hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.995]";

const toNodeId = (index: number) =>
  `SYSLOG_${String(index + 1).padStart(2, "0")}`;

const Posts = ({ posts }: Props) => {
  const visiblePosts =
    posts?.filter(
      (post) => !(post.hidden && process.env.NODE_ENV !== "development")
    ) || [];

  const [featuredPost, ...remainingPosts] = visiblePosts;

  return (
    <section className="bg-background px-6 pb-20 pt-8">
      <div className="container mx-auto space-y-6">
        {featuredPost && (
          <article
            className="grid gap-6 lg:grid-cols-12"
            data-testid={`posts-${featuredPost.slug}`}
          >
            <a
              href={`${featuredPost.slug}`}
              className={`${postCardClassName} lg:col-span-8`}
            >
              <div className="mb-7 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-outline">
                <div className="inline-flex items-center gap-3">
                  <span className="rounded bg-secondary/18 px-2 py-1 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                    New
                  </span>
                  <p className="font-mono text-sm text-on-surface-muted">
                    {toDisplayDate(featuredPost.date)}
                  </p>
                </div>
                <span>{toNodeId(0)}</span>
              </div>
              <h2
                className={classNames(
                  "font-headline text-3xl leading-tight text-on-surface sm:text-5xl font-semibold",
                  {
                    italic: featuredPost.hidden,
                  }
                )}
              >
                {featuredPost.title}{" "}
                {featuredPost.hidden &&
                  process.env.NODE_ENV === "development" &&
                  `(hidden)`}
              </h2>
              <p className="mt-6 max-w-4xl text-2xl text-on-surface-muted">
                {featuredPost.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-end pt-12">
                <span className="font-mono text-sm uppercase tracking-[0.16em] text-primary transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
                  Execute_Read -&gt;
                </span>
              </div>
            </a>

            {remainingPosts[0] && (
              <a
                href={`${remainingPosts[0].slug}`}
                className={`${postCardClassName} lg:col-span-4`}
                data-testid={`posts-${remainingPosts[0].slug}`}
              >
                <div className="mb-7 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-outline">
                  <p className="font-mono text-sm text-on-surface-muted">
                    {toDisplayDate(remainingPosts[0].date)}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-outline">
                    {toNodeId(1)}
                  </p>
                </div>

                <h3 className="mt-3 font-headline text-4xl leading-tight text-on-surface font-semibold">
                  {remainingPosts[0].title}
                </h3>
                <p className="mt-4 text-xl text-on-surface-muted">
                  {remainingPosts[0].excerpt}
                </p>
                <p className="mt-auto pt-8 text-right font-mono text-sm uppercase tracking-[0.16em] text-primary transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
                  Read_More -&gt;
                </p>
              </a>
            )}
          </article>
        )}

        {remainingPosts.length > 1 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {remainingPosts.slice(1).map((post, index) => {
              return (
                <a
                  href={`${post.slug}`}
                  key={post.slug}
                  data-testid={`posts-${post.slug}`}
                  className={postCardClassName}
                >
                  <div className="mb-7 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-outline">
                    <p className="font-mono text-sm text-on-surface-muted">
                      {toDisplayDate(post.date)}
                    </p>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-outline">
                      {toNodeId(index + 2)}
                    </p>
                  </div>
                  <h3
                    className={classNames(
                      "font-headline text-4xl leading-tight text-on-surface font-semibold",
                      {
                        italic: post.hidden,
                      }
                    )}
                  >
                    {post.title}{" "}
                    {post.hidden &&
                      process.env.NODE_ENV === "development" &&
                      `(hidden)`}
                  </h3>
                  <p className="mt-4 text-xl text-on-surface-muted">
                    {post.excerpt}
                  </p>
                  <p className="mt-auto pt-8 text-right font-mono text-sm uppercase tracking-[0.16em] text-primary transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
                    Read_More -&gt;
                  </p>
                </a>
              );
            })}
          </div>
        )}

        {visiblePosts.length === 0 && (
          <div className="rounded-2xl border border-outline-variant bg-surface-container-low px-7 py-8 text-on-surface-muted">
            No posts available.
          </div>
        )}
      </div>
    </section>
  );
};

export default Posts;
