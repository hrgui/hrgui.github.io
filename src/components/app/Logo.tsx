import classNames from "classnames";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <a href="/" className="rounded-sm hr-focus-ring" aria-label="hrgui home">
      <div
        className={classNames(
          "font-display text-[1.75rem] font-extrabold leading-none tracking-[-0.04em] text-fg",
          className
        )}
      >
        hrg
        <span className="mx-[0.02em] inline-block animate-cursor-blink font-mono font-normal text-accent">
          |
        </span>
        <span className="text-accent">ui</span>
      </div>
    </a>
  );
};

export default Logo;
