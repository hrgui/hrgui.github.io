import ctl from "@netlify/classnames-template-literals";

export const linkClassName = ctl(
  `text-primary 
   hover:underline 
   font-medium`
);

export const blogEntryClassName = ctl(`
  prose dark:prose-invert 
  prose-md lg:prose-lg 
  max-w-[1536px] 
  mx-auto 
  
  prose-a:text-primary 
  prose-a:no-underline 
  hover:prose-a:underline`);
