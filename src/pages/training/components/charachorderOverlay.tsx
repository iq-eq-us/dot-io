import React, { ReactElement, useState } from 'react';
import SectorGroup from './sectorGroup';

import charachorderBackground from '../../../assets/charachorder_background_feathered.png';

function CharachorderOverlay(): ReactElement {
  const [hasLoadedBackgroundImage, setHasLoadedBackgroundImage] =
    useState(false);
  const setHasLoadedToTrue = () => setHasLoadedBackgroundImage(true);

  return (
    <div className="relative w-full">
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
    </div>
  );
}

export default CharachorderOverlay;
