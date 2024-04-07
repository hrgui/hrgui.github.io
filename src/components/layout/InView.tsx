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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHeaderVisible]);

  return <div ref={ref} {...props} />;
};

export default InView;
