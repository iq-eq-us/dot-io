import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { getCumulativeAverageChordTypeTime } from '../../../helpers/aggregation';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import { useStoreState } from '../../../store/store';
import { CheckMark } from './CheckMark';
import { StatisticsHeader } from './StatisticsHeader';
import { StatRow } from './StatRow';
import { StatsIcon } from './StatsIcon';
import { XMark } from './XMark';

export interface TierCardProps {
  tierTitle: string;
  bodyText: string;
  orientationLink: string;
  onPressTraining: () => void;
  isComplete?: boolean;
  statistics?: ChordStatistics[];
  wpmToProgress?: number;
}

export function TrainingTierCard(props: TierCardProps): ReactElement {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const useFastestWPM = useStoreState(
    (store) => store.fastestRecordedWordsPerMinute,
  );

  const average = getCumulativeAverageChordTypeTime(props.statistics || []);
  let sumErrors = 0;
  let sumOccurrences = 0;
  props?.statistics?.forEach((d) => {
    sumErrors += d.numberOfErrors;
    sumOccurrences += d.numberOfOccurrences;
  });

  const averageStat: ChordStatistics = {
    averageSpeed: parseFloat(average),
    displayTitle: 'AGGREGATE',
    id: 'AGGREGATE',
    lastSpeed: 0,
    numberOfErrors: sumErrors,
    numberOfOccurrences: sumOccurrences,
  };

  return (
    <Parent>
      <CardBody areStatsOpen={isStatsOpen}>
        {useFastestWPM > (props?.wpmToProgress || 1000) ? (
          <CheckMarkContainer>
            <CheckMark />
          </CheckMarkContainer>
        ) : (
          <XMarkContainer>
            <XMark />
          </XMarkContainer>
        )}

        <TierText>Tier</TierText>
        <TierTitle>{props.tierTitle}</TierTitle>

        <BodyText>{props.bodyText}</BodyText>
        <Row>
          <CardButton
            onClick={() => {
              window.open(props.orientationLink, '_blank');
            }}
          >
            Orientation
          </CardButton>
          <CardButton onClick={props.onPressTraining}>Training</CardButton>
        </Row>

        {props.statistics && (
          <StatsButtonContainer>
            <StatsButton onClick={() => setIsStatsOpen(!isStatsOpen)}>
              <StatsIcon />
            </StatsButton>
          </StatsButtonContainer>
        )}
      </CardBody>

      <StatsTableParent areStatsOpen={isStatsOpen}>
        <StatsTableContainer>
          <StatsTable>
            <StatsHead>
              <StatisticsHeader />
            </StatsHead>
            <StatsBody>
              <StatRow i={-1} stat={averageStat} />

              {props?.statistics
                ?.sort((a, b) => b.averageSpeed - a.averageSpeed)
                ?.map((stat, i) => {
                  return <StatRow key={stat.id} stat={stat} i={i} />;
                })}
            </StatsBody>
          </StatsTable>
        </StatsTableContainer>
      </StatsTableParent>
    </Parent>
  );
}

const Parent = styled.div.attrs({
  className: `mb-8 rounded-none sm:rounded-lg overflow-hidden -mx-5 sm:mx-4 lg:w-3/4`,
})``;

const CardButton = styled.button.attrs({
  className: `mt-4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded z-10`,
})``;

const Row = styled.div.attrs({
  className: `flex flex-row`,
})``;

const BodyText = styled.p.attrs({
  className: `leading-relaxed text-base`,
})``;

const TierTitle = styled.h2.attrs({
  className: `text-xl text-gray-900 font-bold title-font mb-4`,
})``;

const TierText = styled.h3.attrs({
  className: `tracking-widest text-indigo-500 text-sm font-semibold title-font`,
})``;

const CheckMarkContainer = styled.div.attrs({
  className: `absolute h-10 w-10 rounded-full bg-green-200 top-4 right-4 text-green-400  flex items-center justify-center`,
})``;

const XMarkContainer = styled.div.attrs({
  className: `absolute h-10 w-10 rounded-full bg-yellow-200 top-4 right-4 text-yellow-400  flex items-center justify-center`,
})``;

const StatsButton = styled.div.attrs({
  className: `rounded-full bg-gray-200 p-2 hover:bg-gray-300 active:bg-gray-400`,
})``;

const StatsButtonContainer = styled.div.attrs({
  className: `flex flex-row justify-end absolute bottom-4 right-4 w-full`,
})``;

interface CardBodyProps {
  areStatsOpen?: boolean;
}

const CardBody = styled.div.attrs<CardBodyProps>((props) => ({
  className: `rounded-none bg-white p-6 relative ${
    props.areStatsOpen ? 'rounded-none' : 'sm:rounded-b-lg'
  }
  sm:rounded-t-lg 
  `,
}))<CardBodyProps>``;

const StatsBody = styled.tbody.attrs({
  className: `bg-white divide-y divide-gray-200`,
})``;

const StatsHead = styled.thead.attrs({
  className: `bg-gray-50`,
})``;

const StatsTable = styled.table.attrs({
  className: `min-w-full divide-y divide-gray-200`,
})``;

const StatsTableContainer = styled.div.attrs({
  className: `shadow overflow-hidden border-b border-gray-200 sm:rounded-b-lg border-t-2 border-solid -mx-4 lg:-mx-0`,
})``;

const StatsTableParent = styled.div.attrs<CardBodyProps>((props) => ({
  className: `align-middle inline-block rounded-t-none transition-all overflow-hidden overflow-y-scroll ${
    props.areStatsOpen ? 'max-h-[400px]' : 'max-h-0'
  }`,
}))<CardBodyProps>`
  min-width: calc(100% + 17px);
`;
