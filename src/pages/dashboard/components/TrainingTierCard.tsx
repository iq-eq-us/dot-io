import React, { ReactElement, useState } from 'react';
import { getCumulativeAverageChordTypeTime } from '../../../helpers/aggregation';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import { useStoreActions, useStoreState } from '../../../store/store';
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
  ClearButtonContainer,
} from './TrainingTierCard.styled';
import DisclosureIcon from './DisclosureIcon';
import ExternalLinkIcon from './ExternalLinkIcon';
import RightArrowIcon from './RightArrowIcon';
import type { TrainingScenario } from '../../../models/trainingScenario';
import TrashIcon from './TrashIcon';
import usePopover from '../../../hooks/usePopover';

export interface TierCardProps {
  tierTitle: string;
  bodyText: string;
  orientationLink?: string;
  isComplete?: boolean;
  statistics?: ChordStatistics[];
  minWPM: number;
  maxWPM: number;
  scenario: TrainingScenario;
  previousScenario?: TrainingScenario;
}

interface OnPressInterface {
  onPressTraining: () => void;
}

export type TierCardPropsWithFunction = TierCardProps & OnPressInterface;

type CardState = 'LOCKED' | 'UNLOCKED' | 'COMPLETED';

export function TrainingTierCard(
  props: TierCardPropsWithFunction,
): ReactElement {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const fastestWPMAll = useStoreState(
    (store) => store.fastestRecordedWordsPerMinute,
  );
  const fastestWPM = fastestWPMAll[props.scenario];

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
    else if (
      (props.previousScenario &&
        fastestWPMAll[props.previousScenario] > props.minWPM) ||
      !props.previousScenario ||
      fastestWPMAll[props.scenario] !== 0
    )
      return 'UNLOCKED';
    return 'LOCKED';
  })();

  const { parentProps, Popper } = usePopover(
    'Clear your stats for this training module only.',
  );

  const clearStatsForOneScenario = useStoreActions(
    (store) => store.clearStatsForOneModule,
  );
  const clearStats = () => {
    if (confirm('Are you sure you want to clear your stat for this module?'))
      clearStatsForOneScenario(props.scenario);
  };

  return (
    <Parent areStatsOpen={isStatsOpen}>
      {Popper}

      <CardBody areStatsOpen={isStatsOpen}>
        {cardState === 'COMPLETED' && (
          <div className="flex flex-row justify-end absolute w-full top-3 right-4 items-center">
            <p className="text-gray-800 font-lg mr-2">
              Complete: {fastestWPM.toFixed()} WPM
            </p>
            <GreenIconContainer>
              <CheckMark />
            </GreenIconContainer>
          </div>
        )}

        {cardState === 'UNLOCKED' && (
          <div className="flex flex-row justify-end absolute w-full top-3 right-4 items-center">
            <p className="text-gray-800 font-lg mr-2">
              In Progress - {((fastestWPM / props.maxWPM) * 100).toFixed()}%
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
          {props.orientationLink && (
            <CardButton
              onClick={() => {
                window.open(props.orientationLink, '_blank');
              }}
            >
              View Orientation
              <ExternalLinkIcon />
            </CardButton>
          )}
          <CardButton onClick={props.onPressTraining}>
            Start Training
            <RightArrowIcon />
          </CardButton>
        </Row>

        {props.statistics && (
          <StatsButtonContainer>
            <StatsButton onClick={() => setIsStatsOpen(!isStatsOpen)}>
              <DisclosureIcon open={isStatsOpen} />
            </StatsButton>
          </StatsButtonContainer>
        )}

        <ClearButtonContainer>
          <StatsButton {...parentProps} onClick={clearStats}>
            <TrashIcon />
          </StatsButton>
        </ClearButtonContainer>
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
