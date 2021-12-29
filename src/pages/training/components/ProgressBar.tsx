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


function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

export function ProgressBar(): ReactElement {
  const wpm = useWordsPerMinute();
  const chordsConquered = useNumberOfChordsConquered();
  const [currentLevel] = useCurrentLevel();
  const chordsRemaining = useChordsNotConquered();
  const totalNumberOfChords = useTotalChordsToConquer();
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const isShowingPlusIcon = useStoreState((store) => store.isShowingPlusIcon);

  const progress = clamp((chordsConquered / totalNumberOfChords) * 100, 0, 100);

  const { parentProps, Popper } = usePopover(
    'The number of chords that you have typed faster than your speed goal.',
  );

  const { parentProps: remainingProps, Popper: RemainingPopover } = usePopover(
    'The number of chords that you have not typed faster than your speed goal.',
  );
 
  return (
    <Container>
      {Popper}
      {RemainingPopover}

      <TopDataRow>
        <DataText {...parentProps}>Complete: {chordsConquered}</DataText>
        <DataText>
          Level: {currentLevel}
          {isShowingPlusIcon && <PlusIcon />}
        </DataText>
        <DataText {...remainingProps}>Remaining: {chordsRemaining}</DataText>
      </TopDataRow>
      <BottomProgressBar>
        <ProgressBarOuter>
          <ProgressBarInner progress={progress} />
        </ProgressBarOuter>
      </BottomProgressBar>
      <BottomDataRow>
        <WPMText>WPM: {(isNaN(wpm)) ? "Calibrating..." : wpm.toFixed(0)}</WPMText>
        <SpeedGoalText>
          Speed Goal: {trainingSettings.speedGoal.toFixed()}
        </SpeedGoalText>
      </BottomDataRow>
    </Container>
  );
}

interface ProgressBarProgress {
  progress?: number;
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
  className: `rounded bg-red-500 w-full h-full`,
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

const BottomProgressBar = styled.div.attrs({
  className: `rounded bg-[#333] h-12 w-full p-1`,
})``;
