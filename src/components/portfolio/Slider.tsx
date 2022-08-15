import { useState, useCallback, useEffect, useRef } from "preact/hooks";
import { cloneElement, toChildArray } from "preact";
import debounce from "lodash.debounce";
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

  return element.scrollTo({
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
  const heightClassName = `h-[300px] lg:h-[600px]`;

  const handleChangeImage = useCallback(
    function (newIndex) {
      if (newIndex > images.length - 1) {
        newIndex = 0;
      }

      if (newIndex < 0) {
        newIndex = images.length - 1;
      }

      const elToScrollTo = carouselRef.current.querySelector(
        `#carousel__item--${newIndex}`
      );
      if (elToScrollTo) {
        scrollIntoElementView(carouselRef.current, elToScrollTo);
      } else {
        //TODO: this doesn't work the way expected
        // it just "jumps" because the el is not in the stage
        setCurrentIndex(newIndex);
      }
    },
    [setCurrentIndex, images.length, carouselRef.current]
  );

  const _handleChangeImageByScroll: any = () => {
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

  const handleChangeImageByScroll = debounce(_handleChangeImageByScroll, 50);

  const getStagedImages = (images: any[], currentIndex: number) => {
    const createProps = (index: number) => ({
      "data-carousel-index": index,
      id: `carousel__item--${index}`,
      className: classnames("carousel__item", heightClassName),
    });

    const current = cloneElement(
      images[currentIndex],
      createProps(currentIndex)
    );

    if (images.length === 1) {
      return [current];
    }

    const prevIndex =
      currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex + 1 >= images.length ? 0 : currentIndex + 1;

    const prev = cloneElement(images[prevIndex], createProps(prevIndex));
    const next = cloneElement(images[nextIndex], createProps(nextIndex));
    return [prev, current, next];
  };

  useEffect(() => {
    if (!carouselRef.current) {
      return;
    }

    carouselRef.current.scrollLeft = carouselRef.current.clientWidth;
  }, [currentIndex, carouselRef.current]);

  useEffect(() => {
    if (!isAutoPlay) {
      return;
    }

    const interval = setInterval(() => {
      handleChangeImage(currentIndex + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex, handleChangeImage, isAutoPlay]);

  return (
    <div className="relative container mx-auto">
      <div
        className={classnames(`carousel`, className, heightClassName)}
        onScroll={handleChangeImageByScroll}
        ref={carouselRef}
        {...props}
      >
        {getStagedImages(images, currentIndex)}
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
            aria-label={`Navigate to Item ${i + 1}`}
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
