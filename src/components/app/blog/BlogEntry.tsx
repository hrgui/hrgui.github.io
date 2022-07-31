type Props = {
  children: React.ReactNode;
};

const BlogEntry = ({ children }: Props) => {
  return (
    <div className="pl-6 pr-6">
      <div className="prose dark:prose-invert prose-md lg:prose-lg max-w-[1536px] mx-auto">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default BlogEntry;
