import React, { ReactElement } from 'react';
import useScreenSizeBoundary from '../../../hooks/useScreenSizeBoundary';
import useWindowSize from '../../../hooks/useWindowSize';
import { useStoreActions, useStoreState } from '../../../store/store';
import { StatisticsColumnContainer } from './StatisticsColumnContainer';
import { StatisticsTableContainer } from './StatisticsTableContainer';
import { StatisticsTableTitle } from './StatisticsTableTitle';
import StatisticsTable from './StatisticsTable';
import { EditChordsButton } from './EditChordsButton';
import { useCurrentTrainingScenario } from '../../../hooks/useCurrentTrainingScenario';
import styled from 'styled-components';

const HIDDEN_BREAKPOINT = 1024;

export function StatisticsColumn(): ReactElement {
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const setIsDisplaying = useStoreActions(
    (store) => store.setIsDisplayingStatisticsModal,
  );

  // If the screen size changes from a small size to a large size, show this column
  // If the screen size changes from a large size to a small size, make sure this column is hidden (until the user presses the button to open it again)
  useScreenSizeBoundary({
    boundary: HIDDEN_BREAKPOINT,
    callback: (direction) => {
      setIsDisplaying(direction === 'ABOVE');
    },
  });

  const transitionTransform = `transform translate-x-full transition-transform ${trainingSettings.isDisplayingStatisticsModal && 'translate-x-0'
    }`;

  const windowSize = useWindowSize();
  const onClickOutside = () => {
    if (windowSize.width < HIDDEN_BREAKPOINT) setIsDisplaying(false);
  };

  const openChordEditModal = useStoreActions(
    (store) => store.toggleChordEditModal,
  );

  const currentTrainingMode = useCurrentTrainingScenario();

  const shouldDisplayEditChordsButton =
    currentTrainingMode === 'LEXICAL' || currentTrainingMode === 'TRIGRAM' || currentTrainingMode === "SUPERSONIC" || currentTrainingMode === "LEXICOGRAPHIC";

  return (
    <StatisticsColumnContainer
      onClick={onClickOutside}
      isDisplayingModal={trainingSettings.isDisplayingStatisticsModal}
    >
      <StatisticsTableContainer transitionTransform={transitionTransform}>
        <Row>
          {shouldDisplayEditChordsButton && (
            <EditChordsButton openChordEditModal={openChordEditModal} />
          )}
          <StatisticsTableTitle />
        </Row>

        <StatisticsTable />
      </StatisticsTableContainer>
    </StatisticsColumnContainer>
  );
}

const Row = styled.div.attrs({
  className: `flex flex-row w-full justify-end items-end mb-4 `,
})``;
