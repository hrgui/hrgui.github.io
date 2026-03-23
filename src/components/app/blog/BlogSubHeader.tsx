import { toDisplayDate } from "./utils";

type Props = {
  hidden?: boolean;
  date?: string;
  title?: string;
  excerpt?: string;
};

const BlogSubHeader = ({ hidden, date, title, excerpt }: Props) => {
  return (
    <section className="circuit-board-bg relative overflow-hidden px-6 pb-8 pt-28">
      <div className="relative z-10 container mx-auto max-w-[1536px]">
        {date && (
          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center gap-2 whitespace-nowrap font-mono text-sm text-primary bg-primary/10 px-2 py-1 rounded tracking-widest">
              <span className={"uppercase"}>{toDisplayDate(date)} //</span>
              <span className="text-primary">ENTRY_RECORD</span>
              {hidden && process.env.NODE_ENV === "development" && (
                <span className="rounded bg-tertiary/18 px-2 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-tertiary">
                  Hidden Draft
                </span>
              )}
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-primary via-outline-variant/60 to-outline-variant"></div>
          </div>
        )}

        <div className="mb-8">
          {!date && hidden && process.env.NODE_ENV === "development" && (
            <div className="mb-5 inline-flex rounded bg-tertiary/18 px-2 py-1 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-tertiary">
              Hidden Draft
            </div>
          )}

          {hidden && process.env.NODE_ENV === "development" && (
            <div className="mb-6 max-w-3xl rounded-2xl border border-tertiary/40 bg-tertiary/10 px-4 py-3 text-sm text-on-surface">
              You are looking at a hidden post. Remove `hidden: true` or set it
              to `false` to publish this post.
            </div>
          )}

          <h1 className="inline-block w-fit bg-gradient-to-r from-on-background via-primary to-primary-container bg-clip-text font-headline text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            {title}
          </h1>

          {excerpt && (
            <p className="mt-6 text-lg leading-relaxed text-on-surface-muted sm:text-xl">
              {excerpt}
            </p>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent via-background/40 to-background"></div>
    </section>
  );
};

export default BlogSubHeader;
