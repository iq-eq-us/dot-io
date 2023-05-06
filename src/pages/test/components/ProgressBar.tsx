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
import  Timer from './timer';
import MultiRangeSlider from './Range';
import { wpmMethodCalculatorForStoredChords, wpmMethodCalculator, getCumulativeAverageChordTypeTime } from '../../../helpers/aggregation';
import {
  getCumulativeAverageChordTypeTimeFromDevice,
} from '../../../helpers/aggregation';

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
  let numberOfChordsMastered = 0;
  let tempChordMasteredValue = 0;
  let sumOfAverages = 0;

  stats.statistics.forEach((d) => {
    sumErrors += d.numberOfErrors;
    sumOccurrences += d.numberOfOccurrences;

    tempChordMasteredValue =
      wpmMethodCalculator(d.averageSpeed) == 'Infinity'
        ? 0
        : wpmMethodCalculator(d.averageSpeed) / 100;
      sumOfAverages += tempChordMasteredValue;
      (tempChordMasteredValue) >=1 ? numberOfChordsMastered++ : '';
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
  const totalNumberOfChords = useTotalChordsToConquer();
  const tier = useStoreState((store) => store.trainingLevel);
  const currentTrainingScenario = useStoreState((store) => store.currentTrainingScenario);

  const allTypedText = useStoreState(
    (store: any) => store.allTypedCharactersStore,
  );
  const storedTrainingStatistics = useStoreState((store) => store.storedChordsFromDevice?.statistics);

  const trainingStatistics = useStoreState((store) => store.trainingStatistics.statistics);
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const trainingSessionErrors = useStoreState((store) => store.trainingSessionErrors);
  const avgStats = getCumulativeAverageChordTypeTime(trainingStatistics)

  let progress;
  
  const numberOfChordsConquered = trainingStatistics.filter(
    (s) =>
      s.averageSpeed > trainingSettings.speedGoal && s.numberOfOccurrences >= 10,
  ).length;

  const numberOfChord = storedTrainingStatistics?.filter(
    (d) => d.chordsMastered.length == 1 && d.chordsMastered[0] == 0,
  ).length;

  const [minValue, setMinValue] = useState<number>(0)
  const [maxValue, setMaxValue] = useState<number>(500)
  const [sessionValue, setSessionValue] = useState<number>(0)
  let persistantValue = 0


  const maxWPM = useStoreState((store) => store.fastestRecordedWordsPerMinute);

  const storedChordsFromDevice = useStoreState(
    (store) => store.storedChordsFromDevice,
  );

  let sumOfChordsMastered = 0;
  storedChordsFromDevice?.statistics?.forEach((d) => {
    sumOfChordsMastered +=
      d.chordsMastered[d?.chordsMastered.length - 1] == null ||
      d?.chordsMastered.length == 0 ||
      (d.chordsMastered.length == 1 && d.chordsMastered[0] == 0)
        ? 0
        : wpmMethodCalculatorForStoredChords(d?.chordsMastered);
  });

  const { parentProps, Popper } = usePopover(
    'The number of chords that you have typed faster than your speed goal.',
  );

  const { parentProps: remainingProps, Popper: RemainingPopover } = usePopover(
    'The number of chords that you have not typed faster than your speed goal.',
  );
 const Accuracy = ((((allTypedText.length)-trainingSessionErrors)/allTypedText.length) * 100).toFixed(0);

   const testTeirHighestWPM = useStoreState((store) => store.testTeirHighestWPM);

   sumOfAverages.toFixed(2) 

   //switch statement 
   if(tier == 'CHM' && currentTrainingScenario != 'ALLCHORDS'){
    progress = clamp((numberOfChordsMastered / totalNumberOfChords) * 100, 0, 100);
    persistantValue= (sumOfChordsMastered);

    } else if(tier == 'CHM' && currentTrainingScenario == 'ALLCHORDS'){
    progress = clamp(((numberOfChord) / storedTrainingStatistics.length) * 100, 0, 100)
    persistantValue= (sumOfChordsMastered);

   } else{
      /* eslint-disable */

    progress = clamp(numberOfChordsConquered/trainingStatistics.length * 100, 0, 100);
    persistantValue = (parseInt(
      Math.max.apply(Math, Object.values(maxWPM))?.toFixed(),
    ));
  /* eslint-enable */

   }

   function handleInputInRealTimeForMin(value) {
    let added = 100;
    if(maxValue >= parseInt(value) ){
    setMinValue(value);
    
    } else {
      added +=parseInt(value);
      setMaxValue(added);
      setMinValue(value);

    }

   }
   function handleInputInRealTimeForMax(value) {
    if(parseInt(value) >= minValue ){
      setMaxValue(value);
    } else{
      setMaxValue(minValue+0);

    }

   }


  return (
    <React.Fragment>
      <div className='float-left flex flex-row inline-block'>
        <input id='minInputValue' className='w-10 h-10 mt-2 rounded bg-neutral-600 m-3 text-white font-semibold text-center'value={minValue} placeholder='0' onChange={() => handleInputInRealTimeForMin(document.getElementById('minInputValue').value)}/>
    <Container>
      {Popper}
      {RemainingPopover}
      <TopDataRow>
      </TopDataRow>
      <TopProgressBar >
      <MultiRangeSlider
      className='w-full'
      label='true'
      ruler='true'
      min={(minValue || 0)}
      max={(maxValue || 500)}
      minValue= {isNaN(wpm.toFixed(0)) || wpm.toFixed(0) < 0 ? '0' : wpm.toFixed(0)}
      maxValue= {persistantValue}

      />
      </TopProgressBar>
      <BottomProgressBar >
      <ProgressBarOuter>
          <ProgressBarInner progress={progress}>{progress.toFixed(1)}% </ProgressBarInner>
        </ProgressBarOuter>
        </BottomProgressBar>
        <Trapazoid>
        <RightTerms>{isNaN(Accuracy) ? '0' : Accuracy}% acc
        <div>{isNaN(wpm.toFixed(0)) || wpm.toFixed(0) < 0 ? '0' : wpm.toFixed(0)} WPM</div>
        </RightTerms>
        <Timer/>
        <LeftTerms>{...allTypedText.length} Terms</LeftTerms>

        </Trapazoid>
    </Container>
    <input id='maxInputValue' className='w-10 h-10 mt-2 rounded bg-neutral-600 m-3 font-semibold text-white text-center' value={maxValue} placeholder='500' onChange={() => handleInputInRealTimeForMax(document.getElementById('maxInputValue').value)}/>

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
}) <ProgressBarProgress>`
  width: ${(props) => props.progress?.toString()}%;
`;

const SessionSpeed = styled.div.attrs<ProgressBarProgress>({
  className: `relative border-r-[5px] border-r-[#333] h-full  text-white text-xs`,
}) <ProgressBarProgress>`
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
}) <ProgressBarProgress>`
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


const RangeContainer = styled.div.attrs({
  className: `relative flex flex-col w-4/5 m-[35%]`,
})``;

const SliderControls = styled.div.attrs({
  className: `relative min-h-[50px]`,
})``;

const FormControl = styled.div.attrs({
  className: `relative flex justify-between text-2xl text-gray-700`,
})``;

const InputRange = styled.div.attrs({
  className: `w-6 h-6 bg-white cursor-pointer`,
})``;

const InputRange2 = styled.div.attrs({
  className: `w-6 h-6 bg-white cursor-pointer`,
})``;

const FromSlider = styled.input.attrs({
  className: `h-0
  `,
})``;