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
