import classNames from "classnames";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <a href="/">
      <div
        className={classNames(
          "text-3xl tracking-tight font-medium dark:text-gray-200",
          className
        )}
      >
        hr<span className="text-red-700 dark:text-red-500">gui</span>
      </div>
    </a>
  );
};

export default Logo;
