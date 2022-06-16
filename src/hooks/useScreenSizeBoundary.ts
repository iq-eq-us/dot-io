import { useLayoutEffect, useState } from 'react';
import useWindowSize, { WindowSize } from './useWindowSize';

interface Props {
  boundary: number;
  callback: (crossingDirection: BoundaryCrossDirection) => void;
}

export type BoundaryCrossDirection = 'ABOVE' | 'BELOW';

// Run a callback function when the screen size crosses a certain boundary
// If the screen size is getting larger, the callback function will be called with BoundaryCrossDirection set to "ABOVE"
// If the screen size is getting smaller, it will be called with direction set to "BELOW"
export default function useScreenSizeBoundary({
  boundary,
  callback,
}: Props): void {
  const screenSize = useWindowSize();
  const [oldScreenSize, setOldScreenSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    if (oldScreenSize.width >= boundary && screenSize.width < boundary)
      callback('BELOW');

    if (oldScreenSize.width < boundary && screenSize.width >= boundary)
      callback('ABOVE');

    setOldScreenSize(screenSize);
  }, [screenSize]);
}
