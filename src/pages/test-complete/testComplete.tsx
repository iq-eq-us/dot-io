import React, { ReactElement, useState } from 'react';
import { TestControlRow } from './components/testControlsRow';
import { TestStatsCard } from './components/testStatsCard';
import { TestCompleteGraph } from './components/testCompleteGraph';
import { TrainingModeSelector } from '../test/components/TrainingModeSelector';
import {
  ManagerPageContainer,
  HorizontalRule,
} from '../test-complete/testComplete.styled';
import ImageSlider from '../test/components/imageSlider';
import { useStoreState, useStoreActions } from '../../store/store';

/**
 * This is the main Test Complete page.
 * It will adapt its content depending on which training scenario is currently active in the trainingStore.
 * Be sure to check out the contents of the trainingStore to understand the application logic.
 */

function TestCompletePage(): ReactElement {
  const isDisplayingIntroductionModal = useStoreState(
    (store: any) => store.isDisplayingIntroductionModal,
  );
  const setIsDisplayingIntroductionModal = useStoreActions(
    (store: any) => store.setIsDisplayingIntroductionModal,
  );
  const [toggleValue, setToggleValue] = useState(true);

  return (
    <React.Fragment>
      <ManagerPageContainer>
        {isDisplayingIntroductionModal ||
        localStorage.getItem('FirstTimeViewingModal') == undefined ? (
          <div style={modal}>
            <div style={modal_content}>
              <button
                className="close absolute ml-96 text-5xl text-white"
                onClick={() => [
                  setToggleValue(!toggleValue),
                  localStorage.setItem(
                    'FirstTimeViewingModal',
                    JSON.stringify(true),
                  ),
                  setIsDisplayingIntroductionModal(false as boolean),
                ]}
              >
                &times;
              </button>
              <ImageSlider />
            </div>
          </div>
        ) : null}
        <TestStatsCard />
        <HorizontalRule />
        <TestCompleteGraph />
        <TestControlRow />
        <TrainingModeSelector />
      </ManagerPageContainer>
    </React.Fragment>
  );
}

export default TestCompletePage;

const modal = {
  position: 'absolute' as const,
  zIndex: '1' as const,
  left: '5%' as const,
  width: '75%' as const,
  textAlign: 'center' as const,
  backgroundColor: 'rgba(0, 0, 0, 0.25)' as const,
};

const modal_content = {
  backgroundColor: '#181818' as const,
  position: 'absolute' as const,
  top: '20%' as const,
  left: '20%' as const,
  borderRadius: '5px' as const,
  border: '2px solid black' as const,
};
