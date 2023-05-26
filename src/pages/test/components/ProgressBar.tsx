import React, { ReactElement, useState } from 'react';
import { useSessionWordsPerMinute } from '../../../hooks/useSessionWPM';
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

  const localTrainingStatistics = useStoreState(
    (store) => store.localTrainingStatistics?.statistics,
  );

  const wordsPracticedInOrder = useStoreState(
    (store) => store.wordsPracticedInOrder,
  );

  const inStoredChordsFromDevice = useStoreState(
    (store: any) => store.storedChordsFromDevice,
  );
  const stats = useStoreState((state) => state.trainingStatistics);

  let sumErrors = 0;
  let sumOccurrences = 0;
  let numberOfChordsMastered = 0;
  let tempChordMasteredValue = 0;
  let sumOfAverages = 0;

  let averageOfLocalStats = 0;

  averageOfLocalStats = wpmMethodCalculator(
    getCumulativeAverageChordTypeTime(localTrainingStatistics),
  );

  stats.statistics.forEach((d) => {
    sumErrors += d.numberOfErrors;
    sumOccurrences += d.numberOfOccurrences;

    tempChordMasteredValue =
      wpmMethodCalculator(d.averageSpeed) == 'Infinity'
        ? 0
        : wpmMethodCalculator(d.averageSpeed) / 100;
    sumOfAverages += tempChordMasteredValue;
    tempChordMasteredValue >= 1 ? numberOfChordsMastered++ : '';
  });

  inStoredChordsFromDevice?.statistics?.forEach((d) => {
    sumOfAWPM +=
      d.chordsMastered[d?.chordsMastered.length - 1] == null ||
      d?.chordsMastered.length == 0 ||
      (d.chordsMastered.length == 1 && d.chordsMastered[0] == 0)
        ? 0
        : wpmMethodCalculatorForStoredChords(d?.chordsMastered);
    sumOfLWPM += d.lastSpeed == 0 ? 0 : wpmMethodCalculator(d?.lastSpeed);
    sumErrorsFromStoredDevice += d.numberOfErrors;
    sumOccurrencesFromStoredDevice += d.numberOfOccurrences;
  });

  const wpm = useSessionWordsPerMinute();
  let allTimeWPM;
  const totalNumberOfChords = useTotalChordsToConquer();
  const tier = useStoreState((store) => store.trainingLevel);
  const currentTrainingScenario = useStoreState(
    (store) => store.currentTrainingScenario,
  );

  const allTypedText = useStoreState(
    (store: any) => store.allTypedCharactersStore,
  );
  const storedTrainingStatistics = useStoreState(
    (store) => store.storedChordsFromDevice?.statistics,
  );

  const trainingStatistics = useStoreState(
    (store) => store.trainingStatistics.statistics,
  );
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const trainingSessionErrors = useStoreState(
    (store) => store.trainingSessionErrors,
  );
  let progress;
  let inMaxValue;

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
          currentTrainingScenario,
        ),
      );
    }
  }
  const [minValue, setMinValue] = useState<number>(0);
  let persistantValue = 0;

  const maxWPM = useStoreState((store) => store.fastestRecordedWordsPerMinute);

  //wpmMethodCalculator((average))

  const storedChordsFromDevice = useStoreState(
    (store) => store.storedChordsFromDevice,
  );
  const timeTakenToTypeEachWordInOrder = useStoreState(
    (store: any) => store.timeTakenToTypeEachWordInOrder,
  );

  const rWPM =
    timeTakenToTypeEachWordInOrder?.length == 0
      ? 0
      : timeTakenToTypeEachWordInOrder?.length < 10
      ? averageOfLocalStats
      : wpmMethodCalculator(
          avgCalculatorForTheSpeedOfLastTen(
            timeTakenToTypeEachWordInOrder?.slice(-10),
          ),
          currentTrainingScenario,
        );

  let sumOfChordsMastered = 0;
  storedChordsFromDevice?.statistics?.forEach((d) => {
    sumOfChordsMastered +=
      d.chordsMastered[d?.chordsMastered.length - 1] == null ||
      d?.chordsMastered.length == 0 ||
      (d.chordsMastered.length == 1 && d.chordsMastered[0] == 0)
        ? 0
        : wpmMethodCalculatorForStoredChords(
            d?.chordsMastered,
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
    persistantValue = sumOfChordsMastered;
    inMaxValue = defaultProgressBarValues.CHM.ALLCHM;
  } else if (tier == 'CHM' && currentTrainingScenario == 'ALLCHORDS') {
    progress = clamp(
      (numberOfChord / storedTrainingStatistics.length) * 100,
      0,
      100,
    );
    persistantValue = sumOfChordsMastered;
    inMaxValue = defaultProgressBarValues.CHM.ALLCHM;
  } else if (tier == 'CPM' && currentTrainingScenario == 'ALPHABET') {
    /* eslint-disable */
    progress = clamp(
      (numberOfChordsConquered / trainingStatistics.length) * 100,
      0,
      100,
    );
    persistantValue = parseInt(
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
    persistantValue = parseInt(
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
    persistantValue = parseInt(
      Math.max.apply(Math, Object.values(maxWPM))?.toFixed(),
    );
    inMaxValue = defaultProgressBarValues.CPM.LEXICAL;

    /* eslint-enable */
  } else {
    /* eslint-disable */
    progress = clamp(
      (numberOfChordsConquered / trainingStatistics.length) * 100,
      0,
      100,
    );
    persistantValue = parseInt(
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

  const { parentProps: progresAllTimeWPMsProps, Popper: AllTimePopper } =
    usePopover(
      'Typing Speed of the Last 10 words = ' +
        rWPM.toFixed(0) +
        ' rWPM' +
        '\r\n ' +
        'Total typing Speed for this session = ' +
        (averageOfLocalStats.toFixed(0) == 'Infinity'
          ? 0
          : averageOfLocalStats.toFixed(0)) +
        ' lWPM',
    );

  return (
    <React.Fragment>
      {AllTimePopper}
      <div className="float-left flex flex-row inline-block">
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
        <Container>
          {Popper}
          {RemainingPopover}
          <TopDataRow />
          <TopProgressBar {...progresAllTimeWPMsProps}>
            <MultiRangeSlider
              className="w-full"
              label="true"
              ruler="true"
              min={minValue > (inMaxValue || maxValue) ? 0 : minValue}
              max={maxValue || inMaxValue}
              minValue={
                averageOfLocalStats.toFixed(0) == 'Infinity'
                  ? '0'
                  : averageOfLocalStats.toFixed(0)
              }
              maxValue={rWPM.toFixed(0) == 'Infinity' ? '0' : rWPM.toFixed(0)}
              thumbRightColor="red"
              thumbLeftColor="blue"
            />
          </TopProgressBar>
          <BottomProgressBar>
            <ProgressBarOuter>
              <ProgressBarInner progress={progress}>
                {progress?.toFixed(1)}%{' '}
              </ProgressBarInner>
            </ProgressBarOuter>
          </BottomProgressBar>
          <Trapazoid>
            <RightTerms>
              {timeTakenToTypeEachWordInOrder?.length == 0 ? 0 : Accuracy}% acc
              <div>
                {averageOfLocalStats.toFixed(0) == 'Infinity'
                  ? '0'
                  : averageOfLocalStats.toFixed(0)}{' '}
                lWPM
              </div>
            </RightTerms>
            <Timer />
            <LeftTerms>
              {wordsPracticedInOrder.length} Terms
              <div>
                {timeTakenToTypeEachWordInOrder?.length == 0
                  ? 0
                  : timeTakenToTypeEachWordInOrder?.length < 10
                  ? averageOfLocalStats.toFixed(0)
                  : wpmMethodCalculator(
                      avgCalculatorForTheSpeedOfLastTen(
                        timeTakenToTypeEachWordInOrder?.slice(-10),
                      ),
                      currentTrainingScenario,
                    ).toFixed(0)}{' '}
                rWPM
              </div>
            </LeftTerms>
          </Trapazoid>
        </Container>
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
      </div>
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

const BottomDataRow = styled.div.attrs({
  className: `flex flex-row w-full mt-2 justify-between text-white font-semibold`,
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

const Trapazoid = styled.div.attrs({
  className: `ml-auto mr-auto justify-items-center grid grid-cols-3 gap-x-[.5] h-[12px] w-[220px]  border-b-[35px] border-b-[#333] border-x-[25px] border-x-transparent border-solid rotate-180
  `,
})``;

const BottomProgressBar = styled.div.attrs({
  className: `rounded-b-lg bg-[#333] h-6 w-full p-1`,
})``;

const TopProgressBar = styled.div.attrs({
  className: `border-r-4 border-l-4 border-b-4 flex space-x-20 text-center justify-center	inline-block border-[#333] h-12 w-full p-1`,
})``;
