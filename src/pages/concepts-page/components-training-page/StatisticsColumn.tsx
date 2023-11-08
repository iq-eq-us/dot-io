import React, { ReactElement } from 'react';
import useScreenSizeBoundary from '../../../hooks/useScreenSizeBoundary';
import useWindowSize from '../../../hooks/useWindowSize';
import { useStoreActions, useStoreState } from '../../../store/store';
import { StatisticsColumnContainer } from './StatisticsColumnContainer';
import { StatisticsTableContainer } from './StatisticsTableContainer';
import StatisticsTable from './StatisticsTable';
import { useCurrentTrainingScenario } from '../../../hooks/useCurrentTrainingScenario';
import styled from 'styled-components';
import {
  FlashcardStatistics,
  flashcardStats,
} from '../../../models/flashCardStatistics';

const HIDDEN_BREAKPOINT = 1024;

export function StatisticsColumn(): ReactElement {
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const setIsDisplaying = useStoreActions(
    (store) => store.setIsDisplayingStatisticsModal,
  );
  const flashCards = useStoreState((store) => store.flashCards);
  console.log(flashCards);

  // If the screen size changes from a small size to a large size, show this column
  // If the screen size changes from a large size to a small size, make sure this column is hidden (until the user presses the button to open it again)
  useScreenSizeBoundary({
    boundary: HIDDEN_BREAKPOINT,
    callback: (direction) => {
      setIsDisplaying(direction === 'ABOVE');
    },
  });

  const transitionTransform = `transform translate-x-full transition-transform ${
    trainingSettings.isDisplayingStatisticsModal && 'translate-x-0'
  }`;

  const windowSize = useWindowSize();
  const onClickOutside = () => {
    if (windowSize.width < HIDDEN_BREAKPOINT) setIsDisplaying(false);
  };

  return (
    <StatisticsColumnContainer
      isDisplayingModal={trainingSettings.isDisplayingStatisticsModal}
      onClick={onClickOutside}
    >
      <StatisticsTableContainer transitionTransform={transitionTransform}>
        <StatisticsTable flashCards={flashCards} />{' '}
        {/* Pass the FlashcardStatistics array */}
      </StatisticsTableContainer>
    </StatisticsColumnContainer>
  );
}

const Row = styled.div.attrs({
  className: `flex flex-row w-full justify-end items-end mb-4 `,
})``;
