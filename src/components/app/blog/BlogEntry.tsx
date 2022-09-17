import { ComponentChildren } from "preact";

import { blogEntryClassName } from "~/theme";

type Props = {
  children: ComponentChildren;
};

const BlogEntry = ({ children }: Props) => {
  return (
    <div className="pl-6 pr-6">
      <div className={blogEntryClassName}>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default BlogEntry;
