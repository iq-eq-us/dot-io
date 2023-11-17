import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import usePopover from '../../../hooks/usePopover';
import MultiRangeSlider from './Range';

export function ProgressBar(): ReactElement {
  const sessionTrainingData = useStoreState(
    (state) => state.sessionTrainingData,
  );

  if (sessionTrainingData.length != 0) {
    const sumOfLastTenOccurences =
      sessionTrainingData[0].lastTenTimesSpeed.reduce(
        (partial_sum, a) => partial_sum + a,
        0,
      );
    const avgSpeed =
      sumOfLastTenOccurences / sessionTrainingData[0].lastTenTimesSpeed.length;
  }

  const totalIncorrect = sessionTrainingData.reduce(
    (partial_sum, a) => partial_sum + a.numberOfTimesWrittenWrong,
    0,
  );
  const totalWritten = sessionTrainingData.reduce(
    (partial_sum, a) => partial_sum + a.numberOfTimesWritten,
    0,
  );
  const accuracy = totalIncorrect / totalWritten;
  const progress =
    sessionTrainingData.reduce(
      (partial_sum, a) =>
        partial_sum +
        (a.numberOfTimesWritten / 10 > a.numberOfTimesWrittenFast
          ? a.numberOfTimesWritten
          : a.numberOfTimesWrittenFast * 10),
      0,
    ) / sessionTrainingData.length;

  const [maxValue, setMaxValue] = useState<number>();
  const [minValue, setMinValue] = useState<number>(0);

  const { parentProps, Popper } = usePopover(
    'The number of chords that you have typed faster than your speed goal.',
  );

  const { parentProps: remainingProps, Popper: RemainingPopover } = usePopover(
    'The number of chords that you have not typed faster than your speed goal.',
  );

  return (
    <React.Fragment>
      <ProgressBarContainer>
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
        </Container>
      </ProgressBarContainer>
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
  className: `flex flex-row justify-center z-index` /* Center the content horizontally */,
})`
  width: 80%; /* Set the desired width */
  padding: 0 10%; /* Adjust the left and right padding as needed */
`;

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
