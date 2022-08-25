import { useState, useCallback, useEffect, useRef } from "preact/hooks";
import { cloneElement, toChildArray, JSX } from "preact";
import debounce from "lodash.debounce";
import classnames from "classnames";
import SliderDot from "./SliderDot";
import Next from "~/components/icons/Next";
import Prev from "~/components/icons/Prev";
import SliderNavButton from "./SliderNavButton";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
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
function scrollIntoElementView(
  element: Element,
  elToScrollTo: Element,
  isJump: boolean = false
): void {
  if (!element || !elToScrollTo) {
    return;
  }

  const elToScrollToBoundingClientRect = elToScrollTo.getBoundingClientRect();
  const left = element.scrollLeft + elToScrollToBoundingClientRect.left;

  return element.scrollTo({
    top: 0,
    left,
    behavior: isJump ? "auto" : "smooth",
  });
}

const AUTOPLAY_DURATION = 10000;

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
      let hasWrapped = false;
      if (newIndex > images.length - 1) {
        newIndex = 0;
        hasWrapped = true;
      }

      if (newIndex < 0) {
        hasWrapped = true;
        newIndex = images.length - 1;
      }

      const elToScrollTo = carouselRef.current.querySelector(
        !hasWrapped
          ? `#carousel__item--${newIndex}`
          : `#carousel__item--duplicate--${newIndex}`
      );
      scrollIntoElementView(carouselRef.current, elToScrollTo);
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
    const createProps = (index: number, isDuplicate: boolean = false) => ({
      "data-carousel-index": index,
      "data-testid": `carousel__item--${index}${
        isDuplicate ? "--duplicate" : ""
      }${currentIndex === index ? "--active" : ""}`,
      id: isDuplicate
        ? `carousel__item--duplicate--${index}`
        : `carousel__item--${index}`,
      className: classnames("carousel__item", heightClassName),
    });

    return [
      cloneElement(
        images[images.length - 1],
        createProps(images.length - 1, true)
      ),
      ...images.map((child, i) => cloneElement(child, createProps(i))),
      cloneElement(images[0], createProps(0, true)),
    ];
  };

  // this effect is needed since the last image and first image are duplicated
  useEffect(() => {
    if (!carouselRef.current) {
      return;
    }

    const normalElSelector = `#carousel__item--${currentIndex}`;
    const duplicateElSelector = `#carousel__item--duplicate--${currentIndex}`;

    const currentEl = carouselRef.current.querySelector(normalElSelector);
    const duplicateEl = carouselRef.current.querySelector(duplicateElSelector);

    if (currentEl && duplicateEl) {
      if (isInViewport(duplicateEl)) {
        // on the duplicate
        // need to jump the scrollbar position
        scrollIntoElementView(carouselRef.current, currentEl, true);
      } else {
        if (!isInViewport(currentEl)) {
          scrollIntoElementView(carouselRef.current, currentEl, true);
        }
      }
    } else {
      if (!isInViewport(currentEl)) {
        scrollIntoElementView(carouselRef.current, currentEl);
      }
    }
  }, [currentIndex, carouselRef.current]);

  useEffect(() => {
    if (!isAutoPlay) {
      return;
    }

    const interval = setInterval(() => {
      handleChangeImage(currentIndex + 1);
    }, AUTOPLAY_DURATION);
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

      <SliderNavButton onClick={() => handleChangeImage(currentIndex - 1)}>
        <Prev />
        <span className="sr-only">Previous</span>
      </SliderNavButton>
      <SliderNavButton
        className="right-0"
        onClick={() => handleChangeImage(currentIndex + 1)}
      >
        <Next />
        <span className="sr-only">Next</span>
      </SliderNavButton>

      <div className="flex items-center space-x-3 justify-center w-full mt-4 bottom-0 z-10">
        {images.map((img, i) => (
          <SliderDot
            active={currentIndex === i}
            aria-label={`Navigate to Item ${i + 1}`}
            onClick={() => handleChangeImage(i)}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
