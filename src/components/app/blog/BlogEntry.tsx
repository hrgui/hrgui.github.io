import type { ComponentChildren } from "preact";

// Kept in a .tsx file (not theme.ts) so UnoCSS extracts these classes.
// The reading column (~72 characters at 18px) is centred in the frame so the
// spare space splits evenly; BlogSubHeader uses the same width.
const proseClassName =
  "hr-prose prose dark:prose-invert prose-base lg:prose-lg mx-auto max-w-[960px]";

type Props = {
  children: ComponentChildren;
};

const BlogEntry = ({ children }: Props) => {
  return (
    <section className="hr-frame">
      <div className="hr-frame-col">
        <article className="hr-frame-cell">
          <div className={proseClassName}>
            <main>{children}</main>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogEntry;
