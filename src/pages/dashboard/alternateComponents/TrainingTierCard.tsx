import React, { ReactElement, useState } from 'react';
import { getCumulativeAverageChordTypeTime } from '../../../helpers/aggregation';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import { useStoreState } from '../../../store/store';
import { CheckMark } from './CheckMark';
import { StatisticsHeader } from './StatisticsHeader';
import { StatRow } from './StatRow';
import UnlockIcon from './UnlockIcon';
import LockIcon from './LockIcon';
import {
  Parent,
  CardBody,
  GreenIconContainer,
  GrayIconContainer,
  TierText,
  TierTitle,
  BodyText,
  Row,
  CardButton,
  StatsButtonContainer,
  StatsButton,
  StatsTableParent,
  StatsTableContainer,
  StatsTable,
  StatsHead,
  StatsBody,
} from './TrainingTierCard.styled';
import DisclosureIcon from './DisclosureIcon';

export interface TierCardProps {
  tierTitle: string;
  bodyText: string;
  orientationLink: string;
  onPressTraining: () => void;
  isComplete?: boolean;
  statistics?: ChordStatistics[];
  minWPM: number;
  maxWPM: number;
}

type CardState = 'LOCKED' | 'UNLOCKED' | 'COMPLETED';

export function TrainingTierCard(props: TierCardProps): ReactElement {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const fastestWPM = useStoreState(
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

  const cardState = ((): CardState => {
    if (fastestWPM > props.maxWPM) return 'COMPLETED';
    else if (fastestWPM >= props.minWPM && fastestWPM <= props.maxWPM)
      return 'UNLOCKED';
    return 'LOCKED';
  })();

  return (
    <Parent areStatsOpen={isStatsOpen}>
      <CardBody areStatsOpen={isStatsOpen}>
        {cardState === 'COMPLETED' && (
          <div className="flex flex-row justify-end absolute w-full top-3 right-4 items-center">
            <p className="text-gray-800 font-lg mr-2">Complete</p>
            <GreenIconContainer>
              <CheckMark />
            </GreenIconContainer>
          </div>
        )}

        {cardState === 'UNLOCKED' && (
          <div className="flex flex-row justify-end absolute w-full top-3 right-4 items-center">
            <p className="text-gray-800 font-lg mr-2">
              In Progress -{' '}
              {(
                ((fastestWPM - props.minWPM) / (props.maxWPM - props.minWPM)) *
                100
              ).toFixed()}
              %
            </p>
            <GrayIconContainer>
              <UnlockIcon />
            </GrayIconContainer>
          </div>
        )}

        {cardState === 'LOCKED' && (
          <div className="flex flex-row justify-end absolute w-full top-3 right-4 items-center">
            <p className="text-gray-800 font-lg mr-2">Locked</p>
            <GrayIconContainer>
              <LockIcon />
            </GrayIconContainer>
          </div>
        )}

        <TierText>Tier</TierText>
        <TierTitle>{props.tierTitle}</TierTitle>

        {props.bodyText.split('\n').map((t) => (
          <BodyText key={Math.random()}>{t}</BodyText>
        ))}

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
              <DisclosureIcon open={isStatsOpen} />
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
                ?.sort((a, b) => a.id.localeCompare(b.id))
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
