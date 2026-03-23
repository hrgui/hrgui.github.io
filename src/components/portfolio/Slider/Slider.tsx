import classnames from "classnames";
import debounce from "lodash.debounce";
import type { JSX } from "preact";
import { cloneElement, toChildArray } from "preact";
import { useState, useCallback, useEffect, useRef } from "preact/hooks";

import Next from "~/components/icons/Next";
import Prev from "~/components/icons/Prev";

import SliderDot from "./SliderDot";
import SliderNavButton from "./SliderNavButton";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  isAutoPlay?: boolean;
  isFullBleed?: boolean;
  className?: string;
  onIndexChange?: (index: number) => void;
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
  isJump = false
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
  isFullBleed = false,
  onIndexChange,
  ...props
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay] = useState(defaultIsAutoPlay);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>();
  const firstRenderRef = useRef(true);
  const images = toChildArray(children);
  const heightClassName = `h-[300px] lg:h-[600px]`;

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    onIndexChange?.(currentIndex);
  }, [currentIndex, onIndexChange]);

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
    [images.length]
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

  const handleImageClick = (e: MouseEvent) => {
    const target = e.target as HTMLImageElement;
    if (target.tagName === "IMG") {
      setIsDialogOpen(true);
    }
  };

  const getStagedImages = (images: any[], currentIndex: number) => {
    const createProps = (index: number, isDuplicate = false) => ({
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
  }, [currentIndex]);

  useEffect(() => {
    if (!isAutoPlay) {
      return;
    }

    const interval = setInterval(() => {
      handleChangeImage(currentIndex + 1);
    }, AUTOPLAY_DURATION);
    return () => clearInterval(interval);
  }, [currentIndex, handleChangeImage, isAutoPlay]);

  const wrapperClassName = isFullBleed
    ? "relative w-full max-w-none"
    : "relative container mx-auto";

  return (
    <>
      <div className={wrapperClassName}>
        <div
          className={classnames(`carousel`, className, heightClassName)}
          onScroll={handleChangeImageByScroll}
          onClick={handleImageClick}
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

      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setIsDialogOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-surface-container transition-colors"
              aria-label="Close dialog"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {images[currentIndex] &&
              cloneElement(images[currentIndex] as any, {
                className:
                  "max-h-[90vh] max-w-[90vw] object-contain cursor-pointer",
                onClick: (e: MouseEvent) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src) {
                    window.open(target.src, "_blank");
                  }
                },
              })}
          </div>
        </div>
      )}
    </>
  );
}
