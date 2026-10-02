import ctl from "@netlify/classnames-template-literals";

export const linkClassName = ctl(
  `text-accent
  hover:underline hover:underline-offset-3
  font-medium
  transition-colors duration-150 ease-out
  focus-visible:outline-none
  focus-visible:underline
  focus-visible:ring-2 focus-visible:ring-accent
  focus-visible:ring-offset-2 focus-visible:ring-offset-canvas
  active:opacity-85`
);

export const blogEntryClassName = ctl(`
  prose dark:prose-invert 
  prose-md lg:prose-lg 
  max-w-[1536px] 
  mx-auto 
  
  prose-a:text-accent 
  prose-a:no-underline 
  hover:prose-a:underline`);
