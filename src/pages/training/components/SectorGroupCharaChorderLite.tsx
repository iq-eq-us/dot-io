import React, { ReactElement } from 'react';
import StaticSector from './StaticSector';
import StaticSectorLite from './StaticSectorCharachorderLite';

import {
  SectorGroupMapRow,
  BlankSectorGroupData,
} from '../../../models/sectorGroupSpecifierCharachorderLite';
import { useStoreState } from '../../../store/store';
import { useIsDebug } from '../../../hooks/useDebug';
import type {
  SectorGroupDataRow,
  RowGroupSpecifier,
} from '../../../models/sectorGroupCharachorderLite';
import type { Direction } from '../../../models/keyHighlightPositions';
import type { Position } from '../../../models/keyHighlightPositionsCharachorderLite';

interface Props {
  top: number;
  left: number;
  scale: number;
  groupSpecifier?: RowGroupSpecifier;
}

function SectorGroupLite({
  top,
  left,
  scale,
  groupSpecifier,
}: Props): ReactElement {
  const sectorGroupDataRow: SectorGroupDataRow =
  SectorGroupMapRow[groupSpecifier || -1] || BlankSectorGroupData;

  const keysToHighlight = useStoreState(
    (store) => store.currentlyHighlightedKeys,
  );
  const isDebug = useIsDebug();

  const compare = (direction: Direction): boolean => {
    return JSON.stringify(keysToHighlight).includes(
      JSON.stringify({ sectorGroup: groupSpecifier, direction }),
    );
  };

  const compare2 = (position: Position): boolean => {
    return JSON.stringify(keysToHighlight).includes(
      JSON.stringify({ sectorGroup: groupSpecifier, position }),
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

   
      <StaticSectorLite
      title={sectorGroupDataRow.firstKey.title}
      posX={105}
      posY={-35}
      rotation={0}
      active={compare2(1)}
      
      />
      <StaticSectorLite
      title={sectorGroupDataRow.secondKey.title}
      posX={85}
      posY={-65}
      rotation={0}
      active={compare2(2)}
      
      /><StaticSectorLite
      title={sectorGroupDataRow.thirdKey.title}
      posX={45}
      posY={-85}
      rotation={3}
      active={compare2(1)}
      
      />
      <StaticSectorLite
      title={sectorGroupDataRow.fourthKey.title}
      posX={35}
      posY={-85}
      rotation={3}
      active={compare2(1)}
      
      /><StaticSectorLite
      title={sectorGroupDataRow.fifthKey.title}
      posX={135}
      posY={-85}
      rotation={3}
      active={compare2(1)}
      
      /><StaticSectorLite
      title={sectorGroupDataRow.sixthKey.title}
      posX={135}
      posY={-85}
      rotation={1}
      active={compare2(14)}
      
      /><StaticSectorLite
      title={sectorGroupDataRow.seventhKey.title}
      posX={135}
      posY={-85}
      rotation={3}
      active={compare2(1)}
      
      />
      
    </div>
  );
}


export default SectorGroupLite;
