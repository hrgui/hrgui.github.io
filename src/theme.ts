import ctl from "@netlify/classnames-template-literals";

export const linkClassName = ctl(
  `text-red-700 
   dark:text-red-400 
   hover:underline 
   font-medium`
);

export const blogEntryClassName = ctl(`
  prose dark:prose-invert 
  prose-md lg:prose-lg 
  max-w-[1536px] 
  mx-auto 
  
  prose-a:text-red-700 
  dark:prose-a:text-red-400 
  prose-a:no-underline 
  hover:prose-a:underline`);
