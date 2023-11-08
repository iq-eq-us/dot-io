import React, { ReactElement } from 'react';
import { FixedSizeList } from 'react-window';
import type {
  ChordStatistics,
  ChordStatisticsFromDevice,
} from '../../../models/trainingStatistics';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import useContainerDimensions from '../../../hooks/useContainerDimensions';
import {
  getCumulativeAverageChordTypeTime,
  getCumulativeAverageChordTypeTimeFromDevice,
} from '../../../helpers/aggregation';
import { useHUD } from '../../../hooks/useHUD';
import usePopover from '../../../hooks/usePopover';
import { truncateString } from '../../../helpers/truncateString';
import {
  wpmMethodCalculatorForStoredChords,
  wpmMethodCalculator,
  stmCalculator,
} from '../../../helpers/aggregation';

// This is used to account for the header row as well as the "aggregate" row that shows average speed and
// a sum of errors and occurrences
const LIST_LENGTH_OFFSET = 2;

function StatisticsTable(): ReactElement {
  console.log('INSIDE PREVIOUSTESTTABLE');
  const stats = useStoreState(
    (state) => state.trainingStatistics,
  ).statistics.sort((a, b) => b.numberOfOccurrences - a.numberOfOccurrences);

  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const inTrainingLevel = useStoreState((store: any) => store.trainingLevel); // which tier
  const inStoredChordsFromDevice = useStoreState(
    (store: any) => store.storedChordsFromDevice,
  );
  const inTrainingScenario = useStoreState(
    (store: any) => store.currentTrainingScenario,
  );
  console.log(inTrainingScenario);
  console.log('LEVEL');
  console.log(inTrainingLevel);
  console.log('SCENARIO');
  console.log(inTrainingScenario);

  const storedChordsFromDevice = useStoreState(
    (state) => state.storedChordsFromDevice,
  )?.statistics?.sort(
    (a, b) =>
      wpmMethodCalculatorForStoredChords(a.chordsMastered, a.id.length) -
      wpmMethodCalculatorForStoredChords(b.chordsMastered, b.id.length),
  );

  const numberOfChordsConquered = stats.filter(
    (s) =>
      s.averageSpeed > trainingSettings.speedGoal &&
      s.numberOfOccurrences >= 10,
  ).length;

  const numberOfWordsTyped = stats.filter(
    (s) => s.numberOfOccurrences != 0,
  ).length;

  const totalNumberOfWordsTyped = stats.filter(
    (s) => s.numberOfOccurrences >= 0,
  ).length;
  function removeDups(arr) {
    const seen = new Set();
    const newSet = arr?.statistics.filter((item) => {
      const duplicate = seen.has(item.id);
      seen.add(item.id);
      return !duplicate;
    });
    //console.log({statistics : newSet});
    return { statistics: newSet as ChordStatisticsFromDevice[] };
  }
  function cs(arr) {
    const seen = new Set();
    const newSet = arr?.statistics.filter((item) => {
      const duplicate = seen.has(item.id);
      seen.add(item.id);
      return !duplicate;
    });
    //console.log({statistics : newSet});
    return { statistics: newSet as ChordStatisticsFromDevice[] };
  }
  const sortBetween = (arr = [], start, end) => {
    if (numberOfChordsConquered > totalNumberOfWordsTyped - 1) {
      stats.sort((a, b) => b.averageSpeed - a.averageSpeed);
    } else {
      const part = arr.splice(start, end - start);
      part.sort();
      part.reverse();
      arr.splice(start, 0, ...part);
    }
  };
  const newGG = removeDups(inStoredChordsFromDevice);
  sortBetween(stats, 0, numberOfWordsTyped);
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
          trainingLevel: inTrainingLevel,
          storedChordsFromDevice: newGG,
          trainingScenario: inTrainingScenario,
        }}
        style={{ borderRadius: 8 }}
      >
        {Row}
      </FixedSizeList>
    </TableContainer>
  );
}

interface Data {
  stats: ChordStatistics[];
  targetChords: number;
  isRecursionEnabled: boolean;
  displayHUD: boolean;
  trainingLevel: string;
  storedChordsFromDevice: ChordStatisticsFromDevice[];
  trainingScenario: string;
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
  // Minus one to account for title row
  const item = data?.stats?.[index - LIST_LENGTH_OFFSET];
  if (index === 0) return <Header data={data} />;
  else if (index === 1) return <AggregateRow data={data} />;

  const headerStyle = getStyle(
    data.targetChords,
    data.isRecursionEnabled,
    index - LIST_LENGTH_OFFSET,
  );

  const wpmValue = wpmMethodCalculator(
    item?.averageSpeed,
    item.id.length,
    item.scenario,
  );
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={style}
    >
      <NewStatisticsRow headerStyle={headerStyle}>
        {returnStatisticsColumnContent(data, index)}
      </NewStatisticsRow>
    </div>
  );
};

function returnStatisticsColumnContent(data: Data, index: number) {
  const item = data?.stats?.[index - LIST_LENGTH_OFFSET];
  const wpmValue = wpmMethodCalculator(
    item?.averageSpeed,
    item.id.length,
    item.scenario,
  );
  const itemFromStoredChords =
    data?.storedChordsFromDevice?.statistics?.[index - LIST_LENGTH_OFFSET];

  const cpmValue = wpmMethodCalculatorForStoredChords(
    itemFromStoredChords?.chordsMastered,
    item.displayTitle.length,
  );
  const tier = data.trainingLevel;
  const lastTypedSpeed = wpmMethodCalculator(
    itemFromStoredChords?.lastSpeed,
    item.id.length,
    item.scenario,
  );
  if (
    tier == 'CHM' &&
    data.trainingScenario == 'ALLCHORDS' &&
    localStorage.getItem('chordsReadFromDevice') != (null || undefined)
  ) {
    return (
      <React.Fragment>
        <RowItem>
          {truncateString(itemFromStoredChords?.displayTitle || '', 12)}
        </RowItem>
        <RowItem>
          {isNaN(
            (itemFromStoredChords?.numberOfOccurrences -
              itemFromStoredChords?.numberOfErrors) /
              itemFromStoredChords?.numberOfOccurrences,
          )
            ? '0'
            : (
                ((itemFromStoredChords?.numberOfOccurrences -
                  itemFromStoredChords?.numberOfErrors) /
                  itemFromStoredChords?.numberOfOccurrences) *
                100
              ).toFixed(2)}
        </RowItem>
        {
          //<RowItem>{lastTypedSpeed?.toFixed(0) == 'Infinity' ? 0 : lastTypedSpeed?.toFixed(0)}</RowItem>
        }
        <RowItem>
          {cpmValue?.toFixed(0) == 'Infinity' ? 0 : cpmValue?.toFixed(0)}
        </RowItem>
        <RowItem>
          {cpmValue.toFixed(0) == 'Infinity' ? 0 : cpmValue.toFixed(0) / 100}
        </RowItem>
      </React.Fragment>
    );
  } else if (tier == 'CHM') {
    return (
      <React.Fragment>
        <RowItem>{truncateString(item?.displayTitle || '', 12)}</RowItem>
        <RowItem>
          {isNaN(
            (item?.numberOfOccurrences - item?.numberOfErrors) /
              item?.numberOfOccurrences,
          )
            ? '0'
            : (
                ((item?.numberOfOccurrences - item?.numberOfErrors) /
                  item?.numberOfOccurrences) *
                100
              ).toFixed(2)}
        </RowItem>
        <RowItem>
          {wpmValue.toFixed() == 'Infinity' ? '0' : wpmValue.toFixed()}
        </RowItem>
        <RowItem>
          {wpmValue.toFixed() == 'Infinity' ? '0' : (wpmValue / 100).toFixed(2)}
        </RowItem>
      </React.Fragment>
    );
  } else if (tier == 'StM') {
    const wpm =
      wpmMethodCalculator(
        item?.averageSpeed,
        item.id.length,
        item.scenario,
      ).toFixed() == 'Infinity'
        ? '0'
        : (wpmValue / 100).toFixed(2);
    return (
      <React.Fragment>
        <RowItem>{truncateString(item?.displayTitle || '', 12)}</RowItem>
        <RowItem>
          {wpmMethodCalculator(
            item?.averageSpeed,
            item.id.length,
            item.scenario,
          ).toFixed() == 'Infinity'
            ? '0'
            : wpmValue.toFixed()}
        </RowItem>
        <RowItem>
          {isNaN(
            (item?.numberOfOccurrences - item?.numberOfErrors) /
              item?.numberOfOccurrences,
          )
            ? '0'
            : (
                ((item?.numberOfOccurrences - item?.numberOfErrors) /
                  item?.numberOfOccurrences) *
                100
              ).toFixed(2)}
        </RowItem>

        <RowItem>
          {isNaN(stmCalculator(wpm, item?.speedOfLastTen?.length).toFixed(2))
            ? '0'
            : stmCalculator(wpm, item?.speedOfLastTen?.length).toFixed(2)}
        </RowItem>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <RowItem>{truncateString(item?.displayTitle || '', 12)}</RowItem>
        <RowItem>
          {console.log('HERE')}
          {console.log(item?.averageSpeed)}
          {console.log(item.id.length)}
          {wpmMethodCalculator(
            item?.averageSpeed,
            item.id.length,
            item.scenario,
          ).toFixed() == 'Infinity'
            ? '0 / 0'
            : wpmValue.toFixed() * 5 + '/' + wpmValue.toFixed()}
        </RowItem>
        <RowItem>{item?.numberOfErrors}</RowItem>
        <RowItem>{item?.numberOfOccurrences}</RowItem>
      </React.Fragment>
    );
  }
}

const HeaderRow = styled.div.attrs({
  className: `bg-[#2c2c2c] px-4 py-2 text-left text-xs text-gray-50 uppercase tracking-wider font-bold rounded-tr-lg flex flex-row justify-between align-center h-[36px]`,
})``;

const AggregateStatRow = styled.div.attrs({
  className: `bg-[#262626] text-gray-300 flex flex-row w-full text-white h-[36px] bg-[#222] items-center`,
})``;

const HeaderItem = styled.div.attrs({
  className: `text-white`,
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

const Header = ({ data }: { data: Data }) => {
  const tier = data.trainingLevel;
  return (
    <HeaderRow
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {returnHeader(tier)}
    </HeaderRow>
  );
};

function returnHeader(tier: string) {
  if (tier == 'CHM') {
    return (
      <React.Fragment>
        <HeaderItemRow helpText="The type of test associated with these metrics." />
        <HeaderItemRow helpText="Your typing accuracy for this tier is representative of your typing accuracy all time for a given word.">
          Accuracy
        </HeaderItemRow>
        <HeaderItemRow helpText="Your Average WPM for this test is based or your last 10 attempts at the given word.">
          aWPM
        </HeaderItemRow>
        <HeaderItemRow helpText="Your CHM for this test this is based on your last 10 attempts at the given word.">
          ChM
        </HeaderItemRow>
      </React.Fragment>
    );
  } else if (tier == 'StM') {
    return (
      <React.Fragment>
        <HeaderItemRow helpText="The type of test associated with these metrics." />
        <HeaderItemRow helpText="Your typing accuracy for this teir is representative of your typing accuracy all time for a given word.">
          Speed
        </HeaderItemRow>
        <HeaderItemRow helpText="Your Average WPM for this test is based or your last 10 attempts at the given word.">
          %
        </HeaderItemRow>
        <HeaderItemRow helpText="Your CHM for this test this is based on your last 10 attempts at the given word.">
          StM
        </HeaderItemRow>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}
const AggregateRow = ({ data }: { data: Data }) => {
  return (
    <AggregateStatRow
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {returnStatisticsColumnHeader(data)}
    </AggregateStatRow>
  );
};

function returnStatisticsColumnHeader(data: Data) {
  const average = getCumulativeAverageChordTypeTime(data.stats);
  console.log('TEST');
  console.log(average);
  let sumErrors = 0;
  let sumOccurrences = 0;
  let sumOfAverages = 0;
  let sumOfLastTenOccurences = 0;
  let sumOfCHM = 0;

  data.stats.forEach((d) => {
    const tempWpm =
      wpmMethodCalculator(d.averageSpeed, d.id.length) == Infinity
        ? 0
        : wpmMethodCalculator(d.averageSpeed, d.id.length) *
          d.speedOfLastTen?.length;
    sumErrors += d.numberOfErrors;
    sumOccurrences += d.numberOfOccurrences;
    sumOfLastTenOccurences += d.speedOfLastTen?.length;
    sumOfAverages += tempWpm;
    sumOfCHM +=
      wpmMethodCalculator(d.averageSpeed, d.id.length) == Infinity
        ? 0
        : tempWpm / d.speedOfLastTen?.length / 100;
  });

  let sumOfLWPM = 0;
  let sumOfAWPM = 0;
  let sumErrorsFromStoredDevice = 0;
  let sumOccurrencesFromStoredDevice = 0;
  let sumOfAveragesFromStoredDevice = 0;
  let sumOfLastTenOccurencesFromStoredDevice = 0;

  data.storedChordsFromDevice?.statistics?.forEach((d) => {
    sumOfAveragesFromStoredDevice +=
      wpmMethodCalculator(d.averageSpeed, d.id.length) == Infinity
        ? 0
        : wpmMethodCalculator(d.averageSpeed, d.id.length) *
          d.speedOfLastTen?.length;
    sumOfLastTenOccurencesFromStoredDevice += d.speedOfLastTen?.length;
    sumOfAWPM +=
      d.chordsMastered[d?.chordsMastered.length - 1] == null ||
      d?.chordsMastered.length == 0 ||
      (d.chordsMastered.length == 1 && d.chordsMastered[0] == 0)
        ? 0
        : wpmMethodCalculatorForStoredChords(d?.chordsMastered, d.id.length);
    sumOfLWPM +=
      d.lastSpeed == 0
        ? 0
        : wpmMethodCalculator(d?.lastSpeed, d.id.length, d.scenario);
    sumErrorsFromStoredDevice += d.numberOfErrors;
    sumOccurrencesFromStoredDevice += d.numberOfOccurrences;
  });

  const numberOfChordsConquered =
    data.storedChordsFromDevice?.statistics?.filter(
      (d) => d.numberOfOccurrences >= 1,
    ).length;

  const numberOfChord = data.storedChordsFromDevice?.statistics?.filter(
    (d) => d.chordsMastered.length == 1 && d.chordsMastered[0] == 0,
  ).length;

  const totalChordsPracticed = data.storedChordsFromDevice?.statistics?.filter(
    (d) => d.numberOfOccurrences >= 1,
  ).length;

  const tier = data.trainingLevel;

  if (tier == 'CHM' && data.trainingScenario == 'ALLCHORDS') {
    return (
      <React.Fragment>
        <RowStatItem>Total</RowStatItem>
        <RowStatItem>
          {data.displayHUD
            ? isNaN(
                (sumOccurrencesFromStoredDevice - sumErrorsFromStoredDevice) /
                  sumOccurrencesFromStoredDevice,
              )
              ? '0'
              : (
                  ((sumOccurrencesFromStoredDevice -
                    sumErrorsFromStoredDevice) /
                    sumOccurrencesFromStoredDevice) *
                  100
                ).toFixed(2) + '%'
            : ''}
        </RowStatItem>
        <RowStatItem>
          {isNaN(sumOfAWPM / (numberOfChordsConquered - numberOfChord))
            ? '0'
            : (sumOfAWPM / (numberOfChordsConquered - numberOfChord)).toFixed(
                0,
              )}
        </RowStatItem>
        <RowStatItem>
          {data.displayHUD ? (sumOfAWPM / 100).toFixed(2) : ''}
        </RowStatItem>
      </React.Fragment>
    );
  } else if (tier == 'CHM') {
    return (
      <React.Fragment>
        <RowStatItem>Total</RowStatItem>
        <RowStatItem>
          {data.displayHUD
            ? isNaN((sumOccurrences - sumErrors) / sumOccurrences)
              ? '0'
              : (((sumOccurrences - sumErrors) / sumOccurrences) * 100).toFixed(
                  2,
                ) + '%'
            : ''}
        </RowStatItem>
        <RowStatItem>
          {data.displayHUD
            ? average == 0
              ? '0'
              : (sumOfAverages / sumOfLastTenOccurences).toFixed()
            : ''}
        </RowStatItem>
        <RowStatItem>{data.displayHUD ? sumOfCHM.toFixed(2) : ''}</RowStatItem>
      </React.Fragment>
    );
  } else if (tier == 'StM') {
    return (
      <React.Fragment>
        <RowStatItem>Total</RowStatItem>
        <RowStatItem>
          {data.displayHUD
            ? average == 0
              ? '0'
              : (sumOfAverages / sumOfLastTenOccurences).toFixed()
            : ''}
        </RowStatItem>
        <RowStatItem>
          {data.displayHUD
            ? isNaN((sumOccurrences - sumErrors) / sumOccurrences)
              ? '0'
              : (((sumOccurrences - sumErrors) / sumOccurrences) * 100).toFixed(
                  2,
                ) + '%'
            : ''}
        </RowStatItem>
        <RowStatItem>
          {isNaN(
            stmCalculator(sumOfAverages, sumOfLastTenOccurences).toFixed(2),
          )
            ? '0'
            : stmCalculator(sumOfAverages, sumOfLastTenOccurences).toFixed(2)}
        </RowStatItem>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <RowStatItem>SUM</RowStatItem>
        <RowStatItem>
          {console.log(average)}
          {data.displayHUD
            ? average == 0
              ? '0 / 0'
              : ((sumOfAverages / sumOfLastTenOccurences) * 5).toFixed() +
                '/' +
                (sumOfAverages / sumOfLastTenOccurences).toFixed()
            : ''}
        </RowStatItem>
        <RowStatItem>{sumErrors}</RowStatItem>
        <RowStatItem>{data.displayHUD ? sumOccurrences : ''}</RowStatItem>
      </React.Fragment>
    );
  }
}

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
