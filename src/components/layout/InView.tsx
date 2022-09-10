/*
const headerEntry = useIntersectionObserver(headerRef, {});
  const isHeaderVisible = !!headerEntry?.isIntersecting;
  */

import { useEffect, useRef } from "preact/hooks";

import useIntersectionObserver from "hooks/useIntersectionObserver";

type Props = {
  children?: any;
  onInView?: () => void;
};

const InView = ({ onInView, ...props }: Props) => {
  const ref = useRef<HTMLDivElement>();
  const headerEntry = useIntersectionObserver(ref, {});
  const isHeaderVisible = !!headerEntry?.isIntersecting;

  useEffect(() => {
    if (isHeaderVisible) {
      onInView();
    }
  }, [isHeaderVisible]);

  return <div ref={ref} {...props} />;
};

export default InView;
