import React, { ReactElement } from 'react';
import { FixedSizeList } from 'react-window';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import useContainerDimensions from '../../../hooks/useContainerDimensions';
import { getCumulativeAverageChordTypeTime, wpmMethodCalculator } from '../../../helpers/aggregation';
import { useHUD } from '../../../hooks/useHUD';
import usePopover from '../../../hooks/usePopover';
import { truncateString } from '../../../helpers/truncateString';
import { useWordsPerMinute } from '../../../../src/hooks/useWordsPerMinute';

// This is used to account for the header row as well as the "aggregate" row that shows average speed and
// a sum of errors and occurrences
const LIST_LENGTH_OFFSET = 1;

function PreviousTestTable(): ReactElement {
  const stats = useStoreState(
    (state) => state.trainingStatistics,
  ).statistics.sort((a, b) => b.averageSpeed - a.averageSpeed);
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const statsOfTargetWord = useStoreState(
    (state) => state.trainingStatistics,
  ).statistics.sort((a) => a.averageSpeed);
  const speedGoal = useStoreState(
    (state) => state.trainingSettings.speedGoal);

  const [ref, dimensions] = useContainerDimensions<HTMLDivElement>();

  return (
    <TableContainer ref={ref}>
      <FixedSizeList
        height={dimensions.height || 0}
        itemCount={stats.length + LIST_LENGTH_OFFSET}
        itemSize={25}
        width={300}
        itemData={{
          stats,
          targetChords: trainingSettings.targetChords,
          isRecursionEnabled: trainingSettings.autoOrCustom === 'AUTO',
          displayHUD: true,
          speedGoal: speedGoal,
        }}
        style={{ borderRadius: 8 }}
      >
        {Row}
      </FixedSizeList>
    </TableContainer>
  );
}

function alphabetWpmCalculator(average : any){

    let avgSpeedMilliseconds = average * 10;
    let millisecondsPerCharacter = avgSpeedMilliseconds;
    let averageCharacterPerMin = 60000/millisecondsPerCharacter;
    const wpm = averageCharacterPerMin/5;
      
  return wpm;

}

interface Data {
  stats: ChordStatistics[];
  targetChords: number;
  isRecursionEnabled: boolean;
  displayHUD: boolean;
  speedGoal: number;
}

interface RowData {
  index: number;
  style: React.CSSProperties;
  data: Data;
}

type StatRowStyle = 'NORMAL' | 'TARGET_CHORD_ACTIVE' | 'TARGET_CHORD_INACTIVE';

const getStyle = (
  targetChords: number,
  isRecursionEnabled: boolean,
  index: number,
  speedGoal: number,
  stats: ChordStatistics[],
): StatRowStyle => {
  const rowItem = stats?.[index - LIST_LENGTH_OFFSET+1];
  console.log('jsndfnsdjfdjf '+ rowItem?.averageSpeed)
  if ( rowItem != undefined && speedGoal > wpmMethodCalculator(rowItem.averageSpeed) && rowItem.averageSpeed != 0 ) {
    if (isRecursionEnabled){ 
      return 'TARGET_CHORD_ACTIVE';
  }
    return 'TARGET_CHORD_INACTIVE';
  }else{
  return 'NORMAL'
  }
};
const Row = ({ index, style, data }: RowData) => {
  // Minus one to account for title row
  const item = data?.stats?.[index - LIST_LENGTH_OFFSET];
  if (index === 0) return <Header />;
  //else if (index === 1) return <AggregateRow data={data} />;

  const headerStyle = getStyle(
    data.targetChords,
    data.isRecursionEnabled,
    index - LIST_LENGTH_OFFSET,
    data.speedGoal,
    data.stats,
  );

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={style}
    >
      <NewStatisticsRow headerStyle={headerStyle}>
        <RowItem>{truncateString(item?.displayTitle || "", 12)}</RowItem>
        <RowItemCPMWPM>{(alphabetWpmCalculator(parseInt(item?.averageSpeed.toFixed()))*5).toFixed() == 'Infinity' ? '0 / 0' : (alphabetWpmCalculator(parseInt(item?.averageSpeed.toFixed()))*5).toFixed() + '/' + wpmMethodCalculator(parseInt(item?.averageSpeed.toFixed())).toFixed() }</RowItemCPMWPM>
        <RowItem>{item?.numberOfErrors}</RowItem>
        <RowItem>{item?.numberOfOccurrences}</RowItem>
      </NewStatisticsRow>
    </div>
  );
};

const HeaderRow = styled.div.attrs({
  className: `bg-[#2c2c2c] px-4 py-2 text-left text-xs text-gray-50 uppercase tracking-wider font-bold rounded-tr-lg flex flex-row justify-between align-center h-[36px]`,
})``;

const AggregateStatRow = styled.div.attrs({
  className: `bg-[#262626] text-gray-300 flex flex-row w-full text-white h-[36px] bg-[#222] items-center`,
})``;

const HeaderItem = styled.span.attrs({
  className: ``,
})``;

interface HeaderItemRowProps {
  helpText: string;
  children: React.ReactNode;
}

const HeaderItemRow = ({ helpText, children }: HeaderItemRowProps) => {
  const { parentProps, Popper } = usePopover(helpText);

  return (
    <HeaderItem {...parentProps}>
      {children}
      {Popper}
    </HeaderItem>
  );
};

const Header = () => {
  return (
    <HeaderRow
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <HeaderItemRow helpText="The type of test associated with these metrics.">
        Word
      </HeaderItemRow>
      <HeaderItemRow helpText="Your WPM for this test.">
        CPM/WPM
      </HeaderItemRow>
      <HeaderItemRow helpText="Your Average WPM for this test.">
        Errors
      </HeaderItemRow>
      <HeaderItemRow helpText="Your highest WPM for a word typed during this test.">
        Times
      </HeaderItemRow>
    </HeaderRow>
  );
};

const AggregateRow = ({ data }: { data: Data }) => {
  const average = getCumulativeAverageChordTypeTime(data.stats);
  let sumErrors = 0;
  let sumOccurrences = 0;
  data.stats.forEach((d) => {
    sumErrors += d.numberOfErrors;
    sumOccurrences += d.numberOfOccurrences;
  });

};

const NewStatisticsRow = styled.div.attrs<{ headerStyle: StatRowStyle }>(
  (props) => ({
    className: `text-gray-300 flex flex-row w-full text-white h-[36px] bg-[#222] hover:bg-[#333] ${props.headerStyle === 'TARGET_CHORD_ACTIVE'
      ? 'bg-yellow-400 text-black font-bold'
      : props.headerStyle === 'TARGET_CHORD_INACTIVE'
        ? 'bg-[#aaa] text-black font-bold'
        : ''
      }`,
  }),
) <{ headerStyle: StatRowStyle }>``;

const RowItem = styled.div.attrs({
  className: `px-3 2xl:px-6 py-2 whitespace-nowrap text-sm w-1/4`,
})``;
const RowItemCPMWPM = styled.div.attrs({
  className: `px-3 2xl:px-6 py-2 whitespace-nowrap text-sm w-1/4`,
})``;

const RowStatItem = styled.div.attrs({
  className: `px-3 2xl:px-6 whitespace-nowrap text-sm w-1/4 font-semibold`,
})``;

const TableContainer = styled.div.attrs({
  className: `h-full w-full flex flex-col items-end rounded-lg`,
})``;

export default PreviousTestTable;
