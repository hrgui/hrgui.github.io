import { useEffect, useRef } from "preact/hooks";

const useInterval = (callback: (...args) => any, delay) => {
  const savedCallback = useRef<(...args) => any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args) => savedCallback.current(...args);

    if (delay !== null) {
      const id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
