import React, { ReactElement } from 'react';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import useContainerDimensions from '../../../hooks/useContainerDimensions';
import usePopover from '../../../hooks/usePopover';
import type { flashCard } from '../../../models/flashCardsModel';

// This is used to account for the header row as well as the "aggregate" row that shows average speed and
// a sum of errors and occurrences
const LIST_LENGTH_OFFSET = 2;

function StatisticsTable({
  flashCards,
}: {
  flashCards: flashCard[];
}): ReactElement {
  const stats = flashCards;

  const trainingSettings = useStoreState((store) => store.trainingSettings);

  const [ref, dimensions] = useContainerDimensions<HTMLDivElement>();

  return (
    <TableContainer ref={ref}>
      <FixedSizeList
        height={dimensions.height || 0}
        itemCount={stats.length + LIST_LENGTH_OFFSET}
        itemSize={36}
        width={300}
        itemData={{
          stats,
          targetChords: trainingSettings.targetChords,
          isRecursionEnabled: trainingSettings.autoOrCustom === 'AUTO',
          displayHUD: true,
        }}
        style={{ borderRadius: 8 }}
      >
        {Row}
      </FixedSizeList>
    </TableContainer>
  );
}

interface Data {
  stats: flashCard[];
  targetChords: number;
  isRecursionEnabled: boolean;
  displayHUD: boolean;
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
): StatRowStyle => {
  if (index < targetChords) {
    if (isRecursionEnabled) return 'TARGET_CHORD_ACTIVE';
    return 'TARGET_CHORD_INACTIVE';
  }
  return 'NORMAL';
};

const Row = ({ index, style, data }: RowData) => {
  const flashCards = data.stats;
  // Minus one to account for the title row and the aggregate row
  const item = flashCards[index - LIST_LENGTH_OFFSET];

  if (index === 0) return <Header />;
  else if (index === 1) return <AggregateRow flashCards={flashCards} />;

  const headerStyle = getStyle(
    data.targetChords,
    data.isRecursionEnabled,
    index - LIST_LENGTH_OFFSET,
  );

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={style}
    >
      <NewStatisticsRow headerStyle={headerStyle}>
        <RowItem>{item?.answer || ''}</RowItem>
        <RowStatItem />
        <RowItem>{item?.timesTyped}</RowItem>
        <RowItem>{item?.timesErrored}</RowItem>
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
      <HeaderItemRow helpText="The flashcard phrase/question.">
        Words
      </HeaderItemRow>
      <HeaderItemRow helpText="The idle key of the flashcard.">
        Idle Key
      </HeaderItemRow>
      <HeaderItemRow helpText="The number of times you this flashcard has appeared.">
        Times
      </HeaderItemRow>
      <HeaderItemRow helpText="The total number of times errors.">
        Errors
      </HeaderItemRow>
    </HeaderRow>
  );
};

const AggregateRow = ({ flashCards }: { flashCards: flashCard[] }) => {
  let sumErrors = 0;
  let sumOccurrences = 0;

  flashCards.forEach((d) => {
    sumErrors += d.timesTyped;
    sumOccurrences += d.timesErrored;
  });

  return (
    <AggregateStatRow>
      <RowStatItem>{'SUM'}</RowStatItem>
      <RowStatItem />
      <RowStatItem>{sumErrors}</RowStatItem>
      <RowStatItem>{sumOccurrences}</RowStatItem>
    </AggregateStatRow>
  );
};

const NewStatisticsRow = styled.div.attrs<{ headerStyle: StatRowStyle }>(
  (props) => ({
    className: `text-gray-300 flex flex-row w-full text-white h-[36px] bg-[#222] hover:bg-[#333] ${
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

const RowStatItem = styled.div.attrs({
  className: `px-3 2xl:px-6 whitespace-nowrap text-sm w-1/4 font-semibold`,
})``;

const TableContainer = styled.div.attrs({
  className: `h-full w-full flex flex-col items-end rounded-lg`,
})``;

export default StatisticsTable;
