import React, { ReactElement } from 'react';
import { useWordsPerMinute } from '../../../hooks/useWordsPerMinute';
import useNumberOfChordsConquered from '../../../hooks/useChordsConquered';
import useChordsNotConquered, {
  useTotalChordsToConquer,
} from '../../../hooks/useChordsNotConquered';
import useCurrentLevel from '../../../hooks/useCurrentLevel';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import { PlusIcon } from './PlusIcon';
import usePopover from '../../../hooks/usePopover';
import  Timer from './timer';
import { wpmMethodCalculatorForStoredChords, wpmMethodCalculator, getCumulativeAverageChordTypeTime } from '../../../helpers/aggregation';

const data = [
  { name: "|" },
  { name: "|" },
  { name: "|" },
  { name: "|" },
  { name: "|" },
  { name: "|" },
  //{ name: "RAM", desc: "Prints the current amount of SRAM available. This is primarily used for debugging.", example: "RAM"},
  //{ name: "SIM", desc: "Simulates/injects a chord and outputs the chord output if the chord exists in the chord library. This is primarily used for debugging.", example: "SIM CHORD 000000000000C1AE46DED6731EC20F2A"},
];

function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

export function ProgressBar(): ReactElement {
 // const average = getCumulativeAverageChordTypeTime(data.stats);
  let sumOfLWPM = 0;
  let sumOfAWPM = 0;
  let sumErrorsFromStoredDevice = 0;
  let sumOccurrencesFromStoredDevice = 0;
  const storedChordStats = useStoreState((store) => store.storedChordStatistics);
  const inStoredChordsFromDevice = useStoreState(
    (store: any) => store.storedChordsFromDevice,
  );
  const stats = useStoreState(
    (state) => state.trainingStatistics,
  );

  let sumErrors = 0;
  let sumOccurrences = 0;
  let sumOfAverages = 0;

  stats.statistics.forEach((d) => {
    sumErrors += d.numberOfErrors;
    sumOccurrences += d.numberOfOccurrences;
    sumOfAverages +=
      wpmMethodCalculator(d.averageSpeed) == 'Infinity'
        ? 0
        : wpmMethodCalculator(d.averageSpeed) / 100;
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
  

  const wpm = useWordsPerMinute();
  const chordsConquered = useNumberOfChordsConquered();
  const [currentLevel] = useCurrentLevel();
  const chordsRemaining = useChordsNotConquered();
  const totalNumberOfChords = useTotalChordsToConquer();
  const tier = useStoreState((store) => store.trainingLevel);
  const startTimer = useStoreState((store) => store.startTimer);

  const allTypedText = useStoreState(
    (store: any) => store.allTypedCharactersStore,
  );
  const trainingSessionErrors = useStoreState((store) => store.trainingSessionErrors);


  let progress;
  tier == 'CHM' ?   progress = clamp(((sumOfAWPM / 100).toFixed(2) / totalNumberOfChords) * 100, 0, 100) : progress = clamp(((sumOfAverages / 100).toFixed(2) / totalNumberOfChords) * 100, 0, 100);
  

  const { parentProps, Popper } = usePopover(
    'The number of chords that you have typed faster than your speed goal.',
  );

  const { parentProps: remainingProps, Popper: RemainingPopover } = usePopover(
    'The number of chords that you have not typed faster than your speed goal.',
  );
  console.log('progress '+progress)
 const Accuracy = (((allTypedText.length-trainingSessionErrors)/allTypedText.length) * 100).toFixed(0);
 console.log('Accuracy '+ trainingSessionErrors + startTimer)
  return (
    <Container>
      {Popper}
      {RemainingPopover}
      <TopDataRow>
      </TopDataRow>
      <TopProgressBar >
      <span className="h-3 w-1 bg-neutral-700 rounded mb-10 rotate" />
      <span className="h-3 w-1 bg-neutral-700 rounded mb-10 rotate" />
      <span className="h-3 w-1 bg-neutral-700 rounded mb-10 rotate" />
      <span className="h-3 w-1 bg-neutral-700 rounded mb-10 rotate" />
      <span className="h-3 w-1 bg-neutral-700 rounded mb-10 rotate" />
      <span className="h-3 w-1 bg-neutral-700 rounded mb-10 rotate" />
      <span className="h-3 w-1 bg-neutral-700 rounded mb-10 rotate" />
      <span className="h-3 w-1 bg-neutral-700 rounded mb-10 rotate" />
      <span className="h-3 w-1 bg-neutral-700 rounded mb-10 rotate" />

      </TopProgressBar>
      <BottomProgressBar>
      <ProgressBarOuter>
          <ProgressBarInner progress={progress} />
        </ProgressBarOuter>
        </BottomProgressBar>
        <Trapazoid>
        <RightTerms>{isNaN(Accuracy) ? '0' : Accuracy}% acc</RightTerms>
        <Timer/>
        <Terms>{...allTypedText.length} Terms</Terms>

        </Trapazoid>
    </Container>

  );
}

interface ProgressBarProgress {
  progress?: number;
}

interface TermsSection {
  Terms?: number;
}

const BottomDataRow = styled.div.attrs({
  className: `flex flex-row w-full mt-2 justify-between text-white font-semibold`,
})``;

const SpeedGoalText = styled.span.attrs({
  className: ``,
})``;

const ProgressBarInner = styled.div.attrs<ProgressBarProgress>({
  className: `relative rounded-r-xl bg-green-500 h-full rounded-l`,
}) <ProgressBarProgress>`
  width: ${(props) => props.progress?.toString()}%;
`;

const ProgressBarOuter = styled.div.attrs({
  className: `rounded bg-black w-full h-full`,
})``;

const Terms = styled.div.attrs({
  className: `rotate-180 float-left text-xs text-white`,
})``;

const RightTerms = styled.div.attrs({
  className: `rotate-180  text-xs text-white`,
})``;

const WPMText = styled.div.attrs({
  className: `text-white font-semibold min-w-[80px]`,
})``;

const Container = styled.div.attrs({
  className: ``,
})``;

const TopDataRow = styled.div.attrs({
  className: `flex flex-row items-end justify-between mb-2 text-sm sm:text-lg`,
})``;

const DataText = styled.div.attrs({
  className: `text-white font-semibold flex flex-row items-center`,
})``;

const Trapazoid = styled.div.attrs({
  className: `grid grid-cols-3 gap-x-[.5] h-[12px] w-[220px] ml-[38%] border-b-[35px] border-b-[#333] border-x-[25px] border-x-transparent border-solid rotate-180
  `,
})``;


const BottomProgressBar = styled.div.attrs({
  className: `rounded-b-lg bg-[#333] h-6 w-full p-1`,
})``;

const TopProgressBar = styled.div.attrs({
  className: `border-r-4 border-l-4 border-b-4 flex space-x-20 text-center justify-center	inline-block border-[#333] h-12 w-full p-1`,
})``;