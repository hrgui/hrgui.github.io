import { useState, useCallback, useEffect, useRef } from "preact/hooks";
import { cloneElement, toChildArray } from "preact";
import classnames from "classnames";

interface Props extends React.HTMLProps<HTMLDivElement> {
  isAutoPlay?: boolean;
  className?: string;
}

/**
 * Determines if the element is currently in view.
 * @param element
 * @returns
 */
function isInViewport(element: Element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Scrolls into element view. Unlike el.scrollIntoView, this only scrolls into the element's viewport.
 * @param element Container element to scroll from.
 * @param elToScrollTo Element scrolling into.
 * @returns
 */
function scrollIntoElementView(element: Element, elToScrollTo: Element): void {
  if (!element || !elToScrollTo) {
    return;
  }

  const elToScrollToBoundingClientRect = elToScrollTo.getBoundingClientRect();
  const left = element.scrollLeft + elToScrollToBoundingClientRect.left;

  element.scrollTo({
    top: 0,
    left,
    behavior: "smooth",
  });
}

export default function Slider({
  className,
  children,
  isAutoPlay: defaultIsAutoPlay = true,
  ...props
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay] = useState(defaultIsAutoPlay);
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

      const elToScrollTo = carouselRef.current.querySelector(
        `#carousel__item--${newIndex}`
      );

      scrollIntoElementView(carouselRef.current, elToScrollTo);
    },
    [setCurrentIndex, images.length, carouselRef.current]
  );

  const handleChangeImageByScroll: any = () => {
    const carousel = carouselRef.current;

    const allCarouselItems = Array.from(
      carousel.querySelectorAll(".carousel__item")
    );

    for (const carouselItem of allCarouselItems) {
      const itemIsSupposedToBeActive = isInViewport(carouselItem);
      if (itemIsSupposedToBeActive) {
        const carouselIndex = +carouselItem.getAttribute("data-carousel-index");

        if (currentIndex !== carouselIndex) {
          setCurrentIndex(+carouselIndex);
        }
      }
    }
  };

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
        onScroll={handleChangeImageByScroll}
        ref={carouselRef}
        {...props}
      >
        {images.map((child, i) => {
          return cloneElement(child, {
            "data-carousel-index": i,
            id: `carousel__item--${i}`,
            className: classnames("carousel__item", heightClassName, {
              b: currentIndex === i,
              a: currentIndex !== i,
            }),
          });
        })}
      </div>

      <button
        className="text-gray-500 dark:text-gray-300 bg-black p-4 absolute top-[50%]"
        onClick={() => handleChangeImage(currentIndex - 1)}
      >
        &laquo;
      </button>

      <button
        className="text-gray-500 dark:text-gray-300 bg-black p-4 absolute top-[50%] right-0"
        onClick={() => handleChangeImage(currentIndex + 1)}
      >
        &raquo;
      </button>
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
