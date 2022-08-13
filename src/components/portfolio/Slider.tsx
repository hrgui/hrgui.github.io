import { useState, useCallback, useEffect, useRef } from "preact/hooks";
import { cloneElement, toChildArray } from "preact";
import classnames from "classnames";

interface Props extends React.HTMLProps<HTMLDivElement> {
  isAutoPlay?: boolean;
  className?: string;
}

export default function Slider({
  className,
  children,
  isAutoPlay: defaultIsAutoPlay = true,
  ...props
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(defaultIsAutoPlay);
  const carouselRef = useRef<HTMLDivElement>();
  const images = toChildArray(children);

  const handleChangeImage = useCallback(
    function (newIndex) {
      if (newIndex > images.length - 1) {
        newIndex = 0;
      }

      if (newIndex < 0) {
        newIndex = images.length - 1;
      }

      setCurrentIndex(newIndex);
      carouselRef.current
        .querySelector(`#carousel__item--${newIndex}`)
        ?.scrollIntoView({
          behavior: "smooth",
          inline: "start",
        });
    },
    [setCurrentIndex, images.length, carouselRef.current]
  );

  useEffect(() => {
    if (!isAutoPlay) {
      return;
    }

    const interval = setInterval(() => {
      handleChangeImage(currentIndex + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex, handleChangeImage, isAutoPlay]);

  const heightClassName = `h-[300px] lg:h-[600px]`;

  return (
    <div className="relative container mx-auto">
      <div
        className={classnames(`carousel`, className, heightClassName)}
        ref={carouselRef}
        {...props}
      >
        {images.map((child, i) => {
          return cloneElement(child, {
            id: `carousel__item--${i}`,
            className: classnames("carousel__item", heightClassName, {
              b: currentIndex === i,
              a: currentIndex !== i,
            }),
          });
        })}
      </div>

      <div className="flex items-center justify-center w-full absolute h-full z-10 top-0 text-3xl">
        <button
          className="text-gray-500 dark:text-gray-300 bg-black p-4"
          onClick={() => handleChangeImage(currentIndex - 1)}
        >
          &laquo;
        </button>
        <button
          className="text-gray-500 dark:text-gray-300 bg-black p-4 ml-auto"
          onClick={() => handleChangeImage(currentIndex + 1)}
        >
          &raquo;
        </button>
      </div>

      <div className="flex items-center justify-center w-full absolute bottom-0 z-10">
        {images.map((img, i) => (
          <button
            onClick={() => handleChangeImage(i)}
            className={classnames("carousel__dot", {
              active: currentIndex === i,
            })}
            key={i}
          ></button>
        ))}
      </div>
    </div>
  );
}
