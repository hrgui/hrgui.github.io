import { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

const BlogEntry = ({ children }: Props) => {
  return (
    <div className="pl-6 pr-6">
      <div className="prose dark:prose-invert prose-md lg:prose-lg max-w-[1536px] mx-auto  prose-a:text-red-700 dark:prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default BlogEntry;
