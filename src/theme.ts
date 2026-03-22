import ctl from "@netlify/classnames-template-literals";

export const linkClassName = ctl(
  `text-primary 
   hover:underline 
  font-medium
  transition-all duration-150 ease-out
  focus-visible:outline-none
  focus-visible:underline
  focus-visible:ring-2 focus-visible:ring-primary/70
  focus-visible:ring-offset-2
  active:opacity-85`
);

export const blogEntryClassName = ctl(`
  prose dark:prose-invert 
  prose-md lg:prose-lg 
  max-w-[1536px] 
  mx-auto 
  
  prose-a:text-primary 
  prose-a:no-underline 
  hover:prose-a:underline`);
