import React, { ReactElement, useEffect } from 'react';
import useScreenSizeBoundary from '../../../hooks/useScreenSizeBoundary';
import useWindowSize from '../../../hooks/useWindowSize';
import { useStoreActions, useStoreState } from '../../../store/store';
import { StatisticsColumnContainer } from './StatisticsColumnContainer';
import { PreviousTestTableContainer } from './PreviousTestTableContainer';
import { PreviousTestTableTitle } from './PreviousTestTableTitle';
import PreviousTestTable from './PreviousTestTable';
import { EditChordsButton } from './EditChordsButton';
import { useCurrentTrainingScenario } from '../../../hooks/useCurrentTrainingScenario';
import styled from 'styled-components';

const HIDDEN_BREAKPOINT = 1024;

export function PreviousTest(): ReactElement {
  const trainingSettings = useStoreState(
    (store: any) => store.trainingSettings,
  );
  const setIsDisplaying = useStoreActions(
    (store: any) => store.setIsDisplayingStatisticsModal,
  );

  const setIsDisplayingStatisticsModal = useStoreActions(
    (store: any) => store.setIsDisplayingStatisticsModal,
  );
  const isDisplayingStatisticsModal = useStoreState(
    (store: any) => store.isDisplayingStatisticsModal,
  );
  // If the screen size changes from a small size to a large size, show this column
  // If the screen size changes from a large size to a small size, make sure this column is hidden (until the user presses the button to open it again)

  const transitionTransform = `transform translate-x-full transition-transform ${
    isDisplayingStatisticsModal && 'translate-x-0'
  }`;

  const windowSize = useWindowSize();
  const onClickOutside = () => {
    if (windowSize.width < HIDDEN_BREAKPOINT)
      setIsDisplayingStatisticsModal(false);
  };

  const openChordEditModal = useStoreActions(
    (store: any) => store.toggleChordEditModal,
  );

  const updateTrainingSetting = (newProperty: Record<string, unknown>) =>
    setTrainingSettings({ ...trainingSettings, ...newProperty });
  const setTrainingSettings = useStoreActions(
    (store: any) => store.setTrainingSettings,
  );

  const handleSettingsTabClick = () => {
    setIsDisplayingStatisticsModal(!isDisplayingStatisticsModal);
    updateTrainingSetting({
      isDisplayingStatisticsModal:
        !trainingSettings.isDisplayingStatisticsModal,
    });
  };
  const currentTrainingMode = useCurrentTrainingScenario();
  const wordTestNumber = useStoreState(
    (store: any) => store.wordTestNumber == undefined,
  );

  console.log('INSIDE PREVIOUSTEST');
  console.log(wordTestNumber);

  return (
    <React.Fragment>
      <StatisticsColumnContainer
        onClick={onClickOutside}
        isDisplayingModal={isDisplayingStatisticsModal}
        isTestTier={wordTestNumber}
      >
        <PreviousTestTableContainer transitionTransform={transitionTransform}>
          <Row>
            <PreviousTestTableTitle />
          </Row>
          <p>jfeiwoafjioewajfoiwa</p>
          <PreviousTestTable />
          <p>jfeiwoafjioewajfoiwa</p>
        </PreviousTestTableContainer>
      </StatisticsColumnContainer>
      <svg
        onClick={handleSettingsTabClick}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`feather feather-bar-chart-2 feather mr-8 feather-settings hover:text-gray-400 text-white cursor-pointer active:text-gray-700 ${
          isDisplayingStatisticsModal == true ? 'relative' : 'relative'
        }`}
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    </React.Fragment>
  );
}

const Row = styled.div.attrs({
  className: `flex flex-row w-full justify-end items-end mb-4 `,
})``;
