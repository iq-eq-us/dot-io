import React, { ReactElement } from 'react';
import StaticSector from './StaticSector';
import {
  SectorGroupMap,
  BlankSectorGroupData,
} from '../../../models/sectorGroupSpecifier';
import { useStoreState } from '../../../store/store';
import { useIsDebug } from '../../../hooks/useDebug';
import type {
  SectorGroupData,
  SectorGroupSpecifier,
} from '../../../models/sectorGroup';
import type { Direction } from '../../../models/keyHighlightPositions';

interface Props {
  top: number;
  left: number;
  scale: number;
  groupSpecifier?: SectorGroupSpecifier;
}

function SectorGroup({
  top,
  left,
  scale,
  groupSpecifier,
}: Props): ReactElement {
  const sectorGroupData: SectorGroupData =
    SectorGroupMap[groupSpecifier || -1] || BlankSectorGroupData;

  const keysToHighlight = useStoreState(
    (store) => store.currentlyHighlightedKeys,
  );
  const isDebug = useIsDebug();

  const compare = (direction: Direction): boolean => {
    return JSON.stringify(keysToHighlight).includes(
      JSON.stringify({ sectorGroup: groupSpecifier, direction }),
    );
  };

  return (
    <div
      className="absolute"
      style={{
        width: '100px',
        height: '100px',
        left: `${left}%`,
        top: `${top}%`,
        transform: `scale(${scale})`,
      }}
    >
      {isDebug && (
        <h1
          className="text-white absolute text-xl"
          style={{ top: 0, left: -20 }}
        >
          {groupSpecifier}
        </h1>
      )}

      <StaticSector
        title={sectorGroupData.bottomKey.title}
        titleTransformOverride={
          sectorGroupData.bottomKey.titleTransformOverride
        }
        posX={35}
        posY={0}
        rotation={45}
        active={compare('SOUTH')}
      />
      <StaticSector
        title={sectorGroupData.leftKey.title}
        titleTransformOverride={sectorGroupData.leftKey.titleTransformOverride}
        posX={0}
        posY={0}
        rotation={135}
        active={compare('WEST')}
      />
      <StaticSector
        title={sectorGroupData.topKey.title}
        titleTransformOverride={sectorGroupData.topKey.titleTransformOverride}
        posX={0}
        posY={-35}
        rotation={225}
        active={compare('NORTH')}
      />
      <StaticSector
        title={sectorGroupData.rightKey.title}
        titleTransformOverride={sectorGroupData.rightKey.titleTransformOverride}
        posX={35}
        posY={-35}
        rotation={315}
        active={compare('EAST')}
      />
    </div>
  );
}

export default SectorGroup;
