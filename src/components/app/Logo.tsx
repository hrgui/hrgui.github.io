import classNames from "classnames";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <a href="/">
      <div
        className={classNames(
          "text-3xl tracking-tight font-medium font-headline text-on-surface",
          className
        )}
      >
        hrg
        <span className="text-primary inline-block animate-cursor-blink">
          |
        </span>
        <span className="text-primary">ui</span>
      </div>
    </a>
  );
};

export default Logo;
