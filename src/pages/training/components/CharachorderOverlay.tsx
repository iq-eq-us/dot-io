import React, { ReactElement, useLayoutEffect, useRef, useState } from 'react';
import SectorGroup from './SectorGroup';

import charachorderBackground from '../../../assets/charachorder_background_feathered_no_center.png';
import styled from 'styled-components';
import useWindowSize from '../../../hooks/useWindowSize';
import charachorderLiteBackground from '../../../assets/CharaChorder_Lite.png';


interface OverlayProps {
  overrideBottom?: boolean;
}

interface OverlayContainerProps {
  width?: number;
  height?: number;
  scale?: number;
}

function CharachorderOverlay({ overrideBottom }: OverlayProps): ReactElement {
  const [hasLoadedBackgroundImage, setHasLoadedBackgroundImage] =
    useState(false);
  const setHasLoadedToTrue = () => setHasLoadedBackgroundImage(true);
  const overlayRef = useRef(null);
  const [overlayScale, setOverlayScale] = useState<OverlayContainerProps>({});

  const screenSize = useWindowSize();

  useLayoutEffect(() => {
    const scaleObject = fitToParent(overlayRef.current);
    setOverlayScale(scaleObject);
  }, [screenSize]);

  return (
    <OverlayContainer
      ref={overlayRef}
      scaleWidth={overlayScale?.width || 1}
      scaleHeight={overlayScale?.height || 1}
      scale={overlayScale?.scale || 1}
      {...{ overrideBottom }}
    >
      <img
        onLoad={setHasLoadedToTrue}
        src={charachorderBackground}
        className="mt-8"
      />

      {hasLoadedBackgroundImage && (
        <div>
          {/* Left Side Sector Groups */}
          <SectorGroup
            top={28.95}
            left={11.13}
            scale={0.75}
            groupSpecifier={1}
          />
          <SectorGroup
            top={21.6}
            left={20.63}
            scale={0.74}
            groupSpecifier={2}
          />
          <SectorGroup top={17.7} left={30.6} scale={0.74} groupSpecifier={3} />
          <SectorGroup top={28} left={39.0} scale={0.74} groupSpecifier={4} />
          <SectorGroup left={41.5} top={53.3} scale={0.74} groupSpecifier={5} />
          <SectorGroup left={38.1} top={69.2} scale={0.74} groupSpecifier={6} />
          <SectorGroup left={34.0} top={84.2} scale={0.74} groupSpecifier={7} />
          <SectorGroup left={10.2} top={68.2} scale={0.55} groupSpecifier={8} />
          <SectorGroup
            left={17.2}
            top={72.9}
            scale={0.55}
            groupSpecifier={10}
          />

          {/* Right Side Sector Groups */}
          <SectorGroup left={52.9} top={28} scale={0.74} groupSpecifier={9} />
          <SectorGroup
            left={61.3}
            top={17.7}
            scale={0.74}
            groupSpecifier={11}
          />
          <SectorGroup
            left={71.4}
            top={21.5}
            scale={0.74}
            groupSpecifier={12}
          />
          <SectorGroup
            left={80.9}
            top={29.0}
            scale={0.74}
            groupSpecifier={13}
          />
          <SectorGroup
            left={50.4}
            top={53.3}
            scale={0.74}
            groupSpecifier={14}
          />
          <SectorGroup
            left={53.9}
            top={69.1}
            scale={0.74}
            groupSpecifier={15}
          />
          <SectorGroup
            left={57.9}
            top={84.2}
            scale={0.74}
            groupSpecifier={16}
          />
          <SectorGroup
            left={74.5}
            top={72.9}
            scale={0.55}
            groupSpecifier={10}
          />
          <SectorGroup left={81.5} top={68.2} scale={0.55} groupSpecifier={8} />
        </div>
      )}
    </OverlayContainer>
  );
}

interface Props {
  scaleHeight: number;
  scaleWidth: number;
  scale: number;
}

const OverlayContainer = styled.div.attrs<Props>({})<Props>`
  position: absolute;

  ${(props) => `transform: scale(${Math.min(1, props.scale)})`};
  ${(props) => `top: ${(-(1 - props.scaleHeight) * 532) / 2}px`};
  ${(props) => `left: ${(-(1 - props.scaleWidth) * 1000) / 2}px`};

  width: 1000px;
  height: 532px;
`;

function fitToParent(element: HTMLElement | null) {
  const width = element?.parentElement?.clientWidth || 0;
  const height = element?.parentElement?.clientHeight || 0;
  const idealWidth = 1000;
  const idealHeight = 532;

  return {
    width: width / idealWidth,
    height: height / idealHeight,
    scale: Math.min(width / idealWidth, height / idealHeight),
  };
}

export default CharachorderOverlay;
