import React, { ReactElement } from 'react';
import { FixedSizeList } from 'react-window';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import useContainerDimensions from '../../../hooks/useContainerDimensions';

function StatisticsTable(): ReactElement {
  const stats = useStoreState(
    (state) => state.trainingStatistics,
  ).statistics.sort((a, b) => b.averageSpeed - a.averageSpeed);
  const trainingSettings = useStoreState((store) => store.trainingSettings);

  const [ref, dimensions] = useContainerDimensions<HTMLDivElement>();

  return (
    <TableContainer ref={ref}>
      <FixedSizeList
        height={dimensions.height || 0}
        itemCount={stats.length + 1}
        itemSize={36}
        width={300}
        itemData={{
          stats,
          targetChords: trainingSettings.targetChords,
          isRecursionEnabled: trainingSettings.autoOrCustom === 'AUTO',
        }}
        style={{ borderRadius: 16 }}
      >
        {Row}
      </FixedSizeList>
    </TableContainer>
  );
}

interface RowData {
  index: number;
  style: React.CSSProperties;
  data: {
    stats: ChordStatistics[];
    targetChords: number;
    isRecursionEnabled: boolean;
  };
}

type StatRowStyle = 'NORMAL' | 'TARGET_CHORD_ACTIVE' | 'TARGET_CHORD_INACTIVE';

const getStyle = (
  targetChords: number,
  isRecursionEnabled: boolean,
  index: number,
): StatRowStyle => {
  if (index < targetChords) {
    if (isRecursionEnabled) return 'TARGET_CHORD_ACTIVE';
    return 'TARGET_CHORD_INACTIVE';
  }
  return 'NORMAL';
};

const Row = ({ index, style, data }: RowData) => {
  // Plus one to account for title row
  const item = data?.stats?.[index - 1];
  if (index === 0) return Header;

  const headerStyle = getStyle(
    data.targetChords,
    data.isRecursionEnabled,
    index - 1,
  );

  return (
    <div style={style}>
      <NewStatisticsRow headerStyle={headerStyle}>
        <RowItem>{item?.displayTitle}</RowItem>
        <RowItem>{item?.averageSpeed.toFixed()}</RowItem>
        <RowItem>{item?.numberOfErrors}</RowItem>
        <RowItem>{item?.numberOfOccurrences}</RowItem>
      </NewStatisticsRow>
    </div>
  );
};

const HeaderRow = styled.div.attrs({
  className: `bg-[#262626] px-4 py-2 text-left text-xs text-gray-50 uppercase tracking-wider font-bold rounded-tr-lg flex flex-row justify-between align-center h-[36px]`,
})``;

const HeaderItem = styled.span.attrs({
  className: ``,
})``;

const Header = (
  <HeaderRow>
    <HeaderItem>Chord</HeaderItem>
    <HeaderItem>Speed</HeaderItem>
    <HeaderItem>Errors</HeaderItem>
    <HeaderItem>Times</HeaderItem>
  </HeaderRow>
);

const NewStatisticsRow = styled.div.attrs<{ headerStyle: StatRowStyle }>(
  (props) => ({
    className: `text-gray-300 flex flex-row w-full text-white h-[36px] bg-[#222] ${
      props.headerStyle === 'TARGET_CHORD_ACTIVE'
        ? 'bg-yellow-400 text-black font-bold'
        : props.headerStyle === 'TARGET_CHORD_INACTIVE'
        ? 'bg-[#aaa] text-black font-bold'
        : ''
    }`,
  }),
)<{ headerStyle: StatRowStyle }>``;

const RowItem = styled.div.attrs({
  className: `px-3 2xl:px-6 py-2 whitespace-nowrap text-sm w-1/4`,
})``;

const TableContainer = styled.div.attrs({
  className: `h-full w-full flex flex-col items-end rounded-lg`,
})``;

export default StatisticsTable;
