import React from "react";

type Props = {
  hidden?: boolean;
  date?: string;
  title?: string;
};

const BlogSubHeader = ({ hidden, date, title }: Props) => {
  return (
    <div className="pt-28 p-6 pb-0 container mx-auto max-w-none circuit-board-bg dark:dark-circuit-board-bg">
      <div className="mb-14 max-w-[1536px] mx-auto">
        {hidden && process.env.NODE_ENV === "development" && (
          <div className="italic flex justify-center">
            You are looking at a hidden post. Remove hidden: true or set it to
            false to publish this post.
          </div>
        )}
        <h5 className="text-gray-500 mb-4 font-mono leading-5">{date}</h5>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default BlogSubHeader;
