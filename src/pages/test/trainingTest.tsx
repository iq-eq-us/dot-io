import React, { ReactElement, useEffect, useState } from 'react';
import SettingsColumn from './components/SettingsColumn';
import CenterTrainingColumn from './components/CenterTrainingColumn';
import { StatisticsColumn } from './components/StatisticsColumn';
import { useContrast } from '../../hooks/useContrast';
import EditChordsModal from './components/EditChordModal';
import { PageContainer } from './trainingTest.styled';
import useTrainingScenarioAsDocumentTitle from '../../hooks/useTrainingScenarioAsDocumentTitle';
import { useStoreState, useStoreActions } from '../../store/store';
import { Redirect } from 'react-router-dom';
import { PreviousTest } from './components/PreviousTests';
import TestCompletePage from '../test-complete/testComplete';
import ImageSlider from './components/imageSlider';
import ModuleCompleteModal from './components/ModuleCompleteModal';
import { chordLibrary } from '../../data/chordLibrary';

/**
 * This is the main training page.
 * It will adapt its content depending on which training scenario is currently active in the trainingStore.
 * Be sure to check out the contents of the trainingStore to understand the application logic.
 */

function TrainingTestPage(): ReactElement {
  const contrast = useContrast();
  const currentTrainingScenario = useStoreState(
    (store: any) => store.currentTriningScenario,
  ); 

  const wordTestNumber = useStoreState((store: any) => store.wordTestNumber);
  useTrainingScenarioAsDocumentTitle();
  const beginTraining = useStoreActions(
    (store: any) => store.beginTrainingMode,
  );
  const currentTrainingSetting = useStoreState(
    (store: any) => store.trainingSettings,
  );
  const isTrainingTestDone = currentTrainingSetting.isTestDone;
  const isDisplayingIntroductionModal = useStoreState(
    (store: any) => store.isDisplayingIntroductionModal,
  );
  const setIsDisplayingIntroductionModal = useStoreActions(
    (store: any) => store.setIsDisplayingIntroductionModal,
  );
  const trainingLevel = useStoreState((store: any) => store.trainingLevel);

  const trainingIsDone = useStoreState(
    (store) => store.trainingIsDone,
  );

  //setIsDisplayingIntroductionModal

  const [toggleValue, setToggleValue] = useState(true);

  
  const dictNameOfLibrary = { 
    ALPHABET: chordLibrary.letters,
    LEXICAL: chordLibrary.lexical,
    ENGLISH: chordLibrary.lexical,
    TRIGRAM: chordLibrary.trigrams,

  }

  useEffect(() => {
    document.title = 'dot i/o';
    sessionStorage.removeItem('tempTestDeIncrement');
    sessionStorage.removeItem('Refresh');
    const payload: any[] = [];

    if (trainingLevel == 'CPM') {
      payload.push('ALPHABET');
      if (wordTestNumber != undefined) {
        payload.push(wordTestNumber);
      }
    } else if (trainingLevel == 'CHM') {
      payload.push('LEXICAL');
      if (wordTestNumber != undefined) {
        payload.push(wordTestNumber);
      }
    }
    beginTraining(payload);
  }, []); // <-- dependency array

  return (
    <React.Fragment>
      <PageContainer contrast={contrast}>
        {!currentTrainingScenario && <Redirect to="" />}
        {(isTrainingTestDone == false && trainingIsDone == false) && (
          <React.Fragment>
            <EditChordsModal />
            <SettingsColumn />
            <CenterTrainingColumn />
            {wordTestNumber == undefined ? <PreviousTest /> : <div className="invisible"><PreviousTest /></div>}
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

            <ModuleCompleteModal />
          </React.Fragment>
        )}
        {(isTrainingTestDone == true || trainingIsDone) && (
          <React.Fragment>
            <TestCompletePage />
          </React.Fragment>
        )}
      </PageContainer>
    </React.Fragment>
  );
}

export default TrainingTestPage;

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
