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

  return (
    <React.Fragment>
      {trainingSettings.isDisplayingHUD && (
        <ProgressBarContainer>
          {!trainingSettings.isProgressBarDynamic && (
            <input
              id="minInputValue"
              className="w-10 h-10 mt-2 rounded bg-neutral-600 m-3 text-white font-semibold text-center"
              value={minValue > (inMaxValue || maxValue) ? 0 : minValue}
              placeholder="0"
            />
          )}
          <Container>
            {Popper}
            {RemainingPopover}
            <TopDataRow />
            <TopProgressBar>
              <MultiRangeSlider className="w-full" label="true" ruler="true" />
            </TopProgressBar>
            <BottomProgressBar>
              <ProgressBarOuter>
                <ProgressBarInner progress={progress}>
                  {progress?.toFixed(1)}%{' '}
                </ProgressBarInner>
              </ProgressBarOuter>
            </BottomProgressBar>
            <Trapezoid>
              <RightTerms></RightTerms>
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
            ></input>
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
  className: `rotate-180 float-left text-xs text-neutral-400 w-20`,
})``;

const RightTerms = styled.div.attrs({
  className: `rotate-180  text-xs text-neutral-400 w-20`,
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
