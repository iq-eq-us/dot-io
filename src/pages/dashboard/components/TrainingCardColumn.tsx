import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import type { TrainingScenario } from '../../../models/trainingScenario';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import { useStoreActions, useStoreState } from '../../../store/store';
import trainingCardProps from './TrainingCardProps';
import { TierCardProps, TrainingTierCard } from './TrainingTierCard';

export function TrainingCardColumn(): ReactElement {
  const history = useHistory();
  const beginTraining = useStoreActions((store) => store.beginTrainingMode);

  const stats = useStoreState((store) => store.totalSavedTrainingStatistics);

  const getStatsFromIndex = (index: number): ChordStatistics[] | undefined => {
    // Don't return any stats for training modules 5 and 6
    if (index > 3) return undefined;

    const indexMap: Record<number, TrainingScenario> = {
      0: 'ALPHABET',
      1: 'TRIGRAM',
      2: 'LEXICAL',
      3: 'CHORDING',
      4: 'CUSTOMTIER',
      5: 'LEXICOGRAPHIC',
      6: 'SUPERSONIC',
    };

    return stats.statistics.filter((stat) => stat.scenario === indexMap[index]);
  };

  return (
    <CardColumn>
      {trainingCardProps.map((allProps, i) => (
        <TrainingTierCard
          key={Math.random()}
          statistics={getStatsFromIndex(i)}
          onPressTraining={onPressTierCard(allProps)}
          {...allProps}
        />
      ))}
    </CardColumn>
  );

  function onPressTierCard(allProps: TierCardProps): () => void {
    return () => {
      const payload = [allProps.scenario];
      beginTraining(payload);
      history.push('/training');
    };
  }
}

const CardColumn = styled.div.attrs({
  className: `flex flex-wrap flex-col items-center`,
})``;
