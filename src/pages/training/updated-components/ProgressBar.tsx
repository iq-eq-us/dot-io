import React, { ReactElement } from 'react';
import { useWordsPerMinute } from '../../../hooks/useWordsPerMinute';
import useNumberOfChordsConquered from '../../../hooks/useChordsConquered';
import useChordsNotConquered, {
  useTotalChordsToConquer,
} from '../../../hooks/useChordsNotConquered';
import useCurrentLevel from '../../../hooks/useCurrentLevel';
import styled from 'styled-components';

export function ProgressBar(): ReactElement {
  const wpm = useWordsPerMinute();
  const chordsConquered = useNumberOfChordsConquered();
  const [currentLevel, maxLevel] = useCurrentLevel();
  const chordsRemaining = useChordsNotConquered();
  const totalNumberOfChords = useTotalChordsToConquer();

  const progress = (chordsConquered / totalNumberOfChords) * 100;

  return (
    <Container>
      <TopDataRow>
        <DataText>Complete: {chordsConquered}</DataText>
        <DataText>
          Level: {currentLevel}/{maxLevel}
        </DataText>
        <DataText>Remaining: {chordsRemaining}</DataText>
      </TopDataRow>
      <BottomProgressBar>
        <ProgressBarOuter>
          <ProgressBarInner progress={progress}>
            <WPMText>WPM: {wpm.toFixed(0)}</WPMText>
          </ProgressBarInner>
        </ProgressBarOuter>
      </BottomProgressBar>
    </Container>
  );
}

interface ProgressBarProgress {
  progress?: number;
}

const ProgressBarInner = styled.div.attrs<ProgressBarProgress>({
  className: `relative rounded-r-xl bg-green-500 h-full rounded-l`,
})<ProgressBarProgress>`
  width: ${(props) => props.progress?.toString()}%;
`;

const ProgressBarOuter = styled.div.attrs({
  className: `rounded bg-red-500 w-full h-full`,
})``;

const WPMText = styled.div.attrs({
  className: `absolute text-white font-semibold -right-20 -bottom-8 min-w-[80px]`,
})``;

const Container = styled.div.attrs({
  className: ``,
})``;

const TopDataRow = styled.div.attrs({
  className: `flex flex-row items-end justify-between mb-2 text-sm sm:text-lg`,
})``;

const DataText = styled.div.attrs({
  className: `text-white font-semibold`,
})``;

const BottomProgressBar = styled.div.attrs({
  className: `rounded bg-[#333] h-12 w-full p-1`,
})``;
