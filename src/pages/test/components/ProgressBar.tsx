import React, { ReactElement, useState } from 'react';
import useNumberOfChordsConquered from '../../../hooks/useChordsConquered';
import useChordsNotConquered, {
  useTotalChordsToConquer,
} from '../../../hooks/useChordsNotConquered';
import useCurrentLevel from '../../../hooks/useCurrentLevel';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import { PlusIcon } from './PlusIcon';
import usePopover from '../../../hooks/usePopover';
import Timer from './timer';
import MultiRangeSlider from './Range';
import {
  wpmMethodCalculatorForStoredChords,
  wpmMethodCalculator,
  getCumulativeAverageChordTypeTime,
} from '../../../helpers/aggregation';
import {
  getCumulativeAverageChordTypeTimeFromDevice,
  avgCalculatorForTheSpeedOfLastTen,
  stmCalculator,
} from '../../../helpers/aggregation';
import { defaultProgressBarValues } from '../../../models/trainingSettingsStateModel';
import { useWordsPerMinute } from '../../../hooks/useWordsPerMinute';

function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

export function ProgressBar(): ReactElement {
  // const average = getCumulativeAverageChordTypeTime(data.stats);
  let sumOfLWPM = 0;
  let sumOfAWPM = 0;
  let sumErrorsFromStoredDevice = 0;
  let sumOccurrencesFromStoredDevice = 0;
  let sumErrors = 0;
  let sumOccurrences = 0;
  let numberOfChordsMastered = 0;
  let sumOfAverages = 0;
  let averageOfLocalStats = 0;
  let allTimeWPM;
  let progress;
  let inMaxValue;
  let stmValues = 0;

  const localTrainingStatistics = useStoreState(
    (store) => store.localTrainingStatistics?.statistics,
  );
  const wpm = useWordsPerMinute();

  const wordsPracticedInOrder = useStoreState(
    (store) => store.wordsPracticedInOrder,
  );
  const inStoredChordsFromDevice = useStoreState(
    (store: any) => store.storedChordsFromDevice,
  );
  const stats = useStoreState((state) => state.trainingStatistics);
  const currentTrainingScenario = useStoreState(
    (store) => store.currentTrainingScenario,
  );

  const totalNumberOfChords = useTotalChordsToConquer();
  const tier = useStoreState((store) => store.trainingLevel);

  const allTypedText = useStoreState(
    (store: any) => store.allTypedCharactersStore,
  );
  const storedTrainingStatistics = useStoreState(
    (store) => store.storedChordsFromDevice?.statistics,
  );

  const trainingStatistics = useStoreState(
    (store) => store.trainingStatistics.statistics,
  );
  const trainingStats = useStoreState((store) => store.trainingStatistics);
  trainingStats?.stmStatistics?.forEach((d) => {
    const avg = avgCalculatorForTheSpeedOfLastTen(d.speedOfLastTenTests);
    const stmV = stmCalculator(avg);
    if (stmV >= 1) {
      stmValues += 1;
    }
  });

  const trainingSettings = useStoreState((store) => store.trainingSettings);

  const trainingSessionErrors = useStoreState(
    (store) => store.trainingSessionErrors,
  );
  const maxWPM = useStoreState((store) => store.fastestRecordedWordsPerMinute);

  const storedChordsFromDevice = useStoreState(
    (store) => store.storedChordsFromDevice,
  );
  const timeTakenToTypeEachWordInOrder = useStoreState(
    (store: any) => store.timeTakenToTypeEachWordInOrder,
  );

  let sumOfLastTenOccurences = 0;

  localTrainingStatistics.forEach((d) => {
    sumOfLastTenOccurences += d.speedOfLastTen?.length;
    averageOfLocalStats +=
      wpmMethodCalculator(d.averageSpeed, d.id.length) == Infinity
        ? 0
        : wpmMethodCalculator(d.averageSpeed, d.id.length) *
          d.speedOfLastTen?.length;
  });

  averageOfLocalStats = averageOfLocalStats / sumOfLastTenOccurences;

  stats.statistics.forEach((d) => {
    sumErrors += d.numberOfErrors;
    sumOccurrences += d.numberOfOccurrences;
    const tempWpm =
      wpmMethodCalculator(d.averageSpeed, d.id.length) == Infinity
        ? 0
        : wpmMethodCalculator(d.averageSpeed, d.id.length) *
          d.speedOfLastTen?.length;
    sumOfAverages += tempWpm / 100;
    tempWpm >= 1 ? numberOfChordsMastered++ : '';
  });

  inStoredChordsFromDevice?.statistics?.forEach((d) => {
    sumOfAWPM +=
      d.chordsMastered[d?.chordsMastered.length - 1] == null ||
      d?.chordsMastered.length == 0 ||
      (d.chordsMastered.length == 1 && d.chordsMastered[0] == 0)
        ? 0
        : wpmMethodCalculatorForStoredChords(d?.chordsMastered, d?.id.length);
    sumOfLWPM +=
      d.lastSpeed == 0
        ? 0
        : wpmMethodCalculator(
            d?.lastSpeed,
            d.id.length,
            currentTrainingScenario,
          );
    sumErrorsFromStoredDevice += d.numberOfErrors;
    sumOccurrencesFromStoredDevice += d.numberOfOccurrences;
  });

  const [maxValue, setMaxValue] = useState<number>();

  const numberOfChordsConquered = trainingStatistics.filter(
    (s) =>
      s.averageSpeed > trainingSettings.speedGoal &&
      s.numberOfOccurrences >= 10,
  ).length;

  const numberOfChord = storedTrainingStatistics?.filter(
    (d) => d.chordsMastered.length == 1 && d.chordsMastered[0] == 0,
  ).length;

  if (tier == 'CPM') {
    allTimeWPM = wpmMethodCalculator(
      getCumulativeAverageChordTypeTime(trainingStatistics),
      currentTrainingScenario,
    );
  } else {
    if (currentTrainingScenario != 'ALLCHORDS') {
      allTimeWPM = wpmMethodCalculator(
        getCumulativeAverageChordTypeTime(trainingStatistics),
        currentTrainingScenario,
      );
    } else {
      allTimeWPM = wpmMethodCalculator(
        getCumulativeAverageChordTypeTimeFromDevice(
          inStoredChordsFromDevice?.statistics,
        ),
        currentTrainingScenario,
      );
    }
  }
  const [minValue, setMinValue] = useState<number>(0);
  let persistentValue = 0;

  let avgOfTheLastTenTyped = 0;
  const lastTenWords = wordsPracticedInOrder?.slice(-10);
  const lastTenTWordsTime = timeTakenToTypeEachWordInOrder?.slice(-10);
  for (let y = 0; y < 10; y++) {
    avgOfTheLastTenTyped += isNaN(
      wpmMethodCalculator(lastTenTWordsTime[y], lastTenWords[y]?.length),
    )
      ? 0
      : wpmMethodCalculator(lastTenTWordsTime[y], lastTenWords[y]?.length);
  }
  avgOfTheLastTenTyped = avgOfTheLastTenTyped / 10;

  const rWPM =
    timeTakenToTypeEachWordInOrder?.length == 0
      ? 0
      : timeTakenToTypeEachWordInOrder?.length < 11
      ? averageOfLocalStats
      : avgOfTheLastTenTyped;

  let sumOfChordsMastered = 0;
  storedChordsFromDevice?.statistics?.forEach((d) => {
    sumOfChordsMastered +=
      d.chordsMastered[d?.chordsMastered.length - 1] == null ||
      d?.chordsMastered.length == 0 ||
      (d.chordsMastered.length == 1 && d.chordsMastered[0] == 0)
        ? 0
        : wpmMethodCalculatorForStoredChords(
            d?.chordsMastered,
            d.id?.length,
            currentTrainingScenario,
          );
  });

  const { parentProps, Popper } = usePopover(
    'The number of chords that you have typed faster than your speed goal.',
  );

  const { parentProps: remainingProps, Popper: RemainingPopover } = usePopover(
    'The number of chords that you have not typed faster than your speed goal.',
  );
  const Accuracy = (
    ((allTypedText.length - 1 - trainingSessionErrors) /
      (allTypedText.length - 1)) *
    100
  ).toFixed(0);

  sumOfAverages.toFixed(2);

  if (tier == 'CHM' && currentTrainingScenario != 'ALLCHORDS') {
    progress = clamp(
      (numberOfChordsMastered / totalNumberOfChords) * 100,
      0,
      100,
    );
    persistentValue = sumOfChordsMastered;
    inMaxValue = defaultProgressBarValues.CHM.ALLCHM;
  } else if (tier == 'CHM' && currentTrainingScenario == 'ALLCHORDS') {
    progress = clamp(
      (numberOfChord / storedTrainingStatistics.length) * 100,
      0,
      100,
    );
    persistentValue = sumOfChordsMastered;
    inMaxValue = defaultProgressBarValues.CHM.ALLCHM;
  } else if (tier == 'CPM' && currentTrainingScenario == 'ALPHABET') {
    /* eslint-disable */
    progress = clamp(
      (numberOfChordsConquered / trainingStatistics.length) * 100,
      0,
      100,
    );
    persistentValue = parseInt(
      Math.max.apply(Math, Object.values(maxWPM))?.toFixed(),
    );
    inMaxValue = defaultProgressBarValues.CPM.ALPHABET;

    /* eslint-enable */
  } else if (tier == 'CPM' && currentTrainingScenario == 'TRIGRAM') {
    /* eslint-disable */
    progress = clamp(
      (numberOfChordsConquered / trainingStatistics.length) * 100,
      0,
      100,
    );
    persistentValue = parseInt(
      Math.max.apply(Math, Object.values(maxWPM))?.toFixed(),
    );
    inMaxValue = defaultProgressBarValues.CPM.TRIGRAMS;

    /* eslint-enable */
  } else if (tier == 'CPM' && currentTrainingScenario == 'LEXICAL') {
    /* eslint-disable */
    progress = clamp(
      (numberOfChordsConquered / trainingStatistics.length) * 100,
      0,
      100,
    );
    persistentValue = parseInt(
      Math.max.apply(Math, Object.values(maxWPM))?.toFixed(),
    );
    inMaxValue = defaultProgressBarValues.CPM.LEXICAL;

    /* eslint-enable */
  } else if (tier == 'StM') {
    progress = clamp((stmValues / 120 / 120) * 100, 0, 100);
  } else {
    /* eslint-disable */
    progress = clamp(
      (numberOfChordsConquered / trainingStatistics.length) * 100,
      0,
      100,
    );
    persistentValue = parseInt(
      Math.max.apply(Math, Object.values(maxWPM))?.toFixed(),
    );

    /* eslint-enable */
  }

  function handleInputInRealTimeForMin(value) {
    let added = 100;
    if (inMaxValue >= parseInt(value)) {
      setMinValue(value);
    } else {
      added += parseInt(value);
      inMaxValue = added;
      setMinValue(value);
    }
  }
  function handleInputInRealTimeForMax(value) {
    if (value >= minValue) {
      setMaxValue(value);
    } else {
      setMaxValue(minValue);
    }
  }

  const { parentProps: progressAllTimeWPMsProps, Popper: AllTimePopper } =
    usePopover(
      'Typing Speed of the Last 10 words = ' +
        (isNaN(rWPM.toFixed(0)) ? 0 : rWPM.toFixed(0)) +
        ' rWPM' +
        '\r\n ' +
        'Total typing Speed for this session = ' +
        (isNaN(averageOfLocalStats.toFixed(0))
          ? 0
          : averageOfLocalStats.toFixed(0)) +
        ' lWPM',
    );

  return (
    <React.Fragment>
      {trainingSettings.isDisplayingHUD && (
        <ProgressBarContainer>
          {AllTimePopper}
          {!trainingSettings.isProgressBarDynamic && (
            <input
              id="minInputValue"
              className="w-10 h-10 mt-2 rounded bg-neutral-600 m-3 text-white font-semibold text-center"
              value={minValue > (inMaxValue || maxValue) ? 0 : minValue}
              placeholder="0"
              onChange={() =>
                handleInputInRealTimeForMin(
                  document.getElementById('minInputValue').value,
                )
              }
            />
          )}
          <Container>
            {Popper}
            {RemainingPopover}
            <TopDataRow />
            <TopProgressBar {...progressAllTimeWPMsProps}>
              <MultiRangeSlider
                className="w-full"
                label="true"
                ruler="true"
                min={minValue > (inMaxValue || maxValue) ? 0 : minValue}
                max={maxValue || inMaxValue}
                minValue={
                  isNaN(averageOfLocalStats.toFixed(0))
                    ? '0'
                    : averageOfLocalStats
                }
                maxValue={isNaN(rWPM.toFixed(0)) ? '0' : rWPM}
              />
            </TopProgressBar>
            <BottomProgressBar>
              <ProgressBarOuter>
                <ProgressBarInner progress={progress}>
                  {progress?.toFixed(1)}%{' '}
                </ProgressBarInner>
              </ProgressBarOuter>
            </BottomProgressBar>
            <Trapezoid>
              <RightTerms>
                {timeTakenToTypeEachWordInOrder?.length == 0 ? 0 : Accuracy}%
                acc
                <div className="text-[#38bdf8]">
                  {isNaN(averageOfLocalStats.toFixed(0))
                    ? '0'
                    : averageOfLocalStats.toFixed(0)}{' '}
                  lWPM
                </div>
              </RightTerms>
              <Timer />
              <LeftTerms>
                {wordsPracticedInOrder.length > 999
                  ? '999+Terms'
                  : wordsPracticedInOrder.length + ' Terms'}
                <div className="text-[#ef4444]">
                  {timeTakenToTypeEachWordInOrder?.length == 0
                    ? 0
                    : timeTakenToTypeEachWordInOrder?.length < 11
                    ? averageOfLocalStats.toFixed(0)
                    : rWPM.toFixed(0)}{' '}
                  rWPM
                </div>
              </LeftTerms>
            </Trapezoid>
          </Container>
          {!trainingSettings.isProgressBarDynamic && (
            <input
              id="maxInputValue"
              className="w-10 h-10 mt-2 rounded bg-neutral-600 m-3 font-semibold text-white text-center"
              value={maxValue || inMaxValue}
              onChange={() =>
                handleInputInRealTimeForMax(
                  document.getElementById('maxInputValue').value,
                )
              }
            />
          )}
        </ProgressBarContainer>
      )}
    </React.Fragment>
  );
}

interface ProgressBarProgress {
  progress?: number;
}

interface TermsSection {
  Terms?: number;
}
const AllTimeSpeed = styled.div.attrs<ProgressBarProgress>({
  className: `relative border-r-[5px] border-r-[#333] h-full  text-white text-xs`,
})<ProgressBarProgress>`
  width: ${(props) => props.progress?.toString()}%;
`;

const SessionSpeed = styled.div.attrs<ProgressBarProgress>({
  className: `relative border-r-[5px] border-r-[#333] h-full  text-white text-xs`,
})<ProgressBarProgress>`
  width: ${(props) => props.progress?.toString()}%;
`;

const ProgressBarContainer = styled.div.attrs({
  className: `float-left flex flex-row inline-block`,
})``;

const SpeedGoalText = styled.span.attrs({
  className: ``,
})``;

const ProgressBarInner = styled.div.attrs<ProgressBarProgress>({
  className: `relative rounded-r-xl bg-green-500 h-full rounded-l text-white text-xs`,
})<ProgressBarProgress>`
  width: ${(props) => props.progress?.toString()}%;
`;

const ProgressBarOuter = styled.div.attrs({
  className: `rounded bg-black w-full h-full`,
})``;

const LeftTerms = styled.div.attrs({
  className: `rotate-180 float-left text-xs text-neutral-400`,
})``;

const RightTerms = styled.div.attrs({
  className: `rotate-180  text-xs text-neutral-400`,
})``;

const WPMText = styled.div.attrs({
  className: `text-white font-semibold min-w-[80px]`,
})``;

const Container = styled.div.attrs({
  className: `w-full`,
})``;

const TopDataRow = styled.div.attrs({
  className: `flex flex-row items-end justify-between mb-2 text-sm sm:text-lg`,
})``;

const DataText = styled.div.attrs({
  className: `text-white font-semibold flex flex-row items-center`,
})``;

const Trapezoid = styled.div.attrs({
  className: `ml-auto mr-auto justify-items-center grid grid-cols-3 gap-x-[.5] h-[12px] w-[220px]  border-b-[35px] border-b-[#333] border-x-[25px] border-x-transparent border-solid rotate-180
  `,
})``;

const BottomProgressBar = styled.div.attrs({
  className: `rounded-b-lg bg-[#333] h-6 w-full p-1`,
})``;

const TopProgressBar = styled.div.attrs({
  className: `border-r-4 border-l-4 border-b-4 flex space-x-20 text-center justify-center	inline-block border-[#333] h-12 w-full p-1`,
})``;
