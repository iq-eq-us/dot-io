import React, { ReactElement } from 'react';
import useScreenSizeBoundary from '../../../hooks/useScreenSizeBoundary';
import useWindowSize from '../../../hooks/useWindowSize';
import { useStoreActions, useStoreState } from '../../../store/store';
import { StatisticsTableContainer } from './StatisticsTableContainer';
import StatisticsTable from './StatisticsTable';
import styled from 'styled-components';

const HIDDEN_BREAKPOINT = 1024;

export function StatisticsColumn(): ReactElement {
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const setIsDisplaying = useStoreActions(
    (store) => store.setIsDisplayingStatisticsModal,
  );
  const flashCards = useStoreState((store) => store.flashCards);

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
    <StatisticsColumnContainer onClick={onClickOutside}>
      <StatisticsTableContainer transitionTransform={transitionTransform}>
        <StatisticsTable flashCards={flashCards} />
      </StatisticsTableContainer>
    </StatisticsColumnContainer>
  );
}

export const StatisticsColumnContainer = styled.button`
  position: fixed;
  inset: 0;
  background-color: #121212e5;
  min-width: 324px;
  overflow-y: scroll;
  max-height: 100%;
  border-radius: 1rem;

  @media (min-width: 1024px) {
    position: relative;
    background-color: '#121212E5';
    overflow: hidden;
  }
`;
