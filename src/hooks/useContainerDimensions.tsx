import { useEffect, useRef, useState } from 'react';
import useWindowSize from './useWindowSize';

interface Rect {
  height?: number;
  width?: number;
}

export default function useContainerDimensions<T extends HTMLElement>(): [
  React.RefObject<T>,
  Rect,
] {
  const parentRef = useRef<T>(null);
  const windowSize = useWindowSize();

  const [dimensions, setDimensions] = useState<Rect>({ height: 0, width: 0 });

  useEffect(() => {
    const clientRect = parentRef.current?.getBoundingClientRect();
    setDimensions({
      height: clientRect?.height,
      width: clientRect?.width,
    });
  }, [windowSize]);

  return [parentRef, dimensions];
}
