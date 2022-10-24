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
import styled from 'styled-components';
import TestCompletePage from '../test-complete/testComplete';
import ImageSlider from './components/imageSlider';
import { SliderData } from './components/SliderData';

/**
 * This is the main training page.
 * It will adapt its content depending on which training scenario is currently active in the trainingStore.
 * Be sure to check out the contents of the trainingStore to understand the application logic.
 */


function TrainingTestPage(): ReactElement {
  const contrast = useContrast();
  const currentTrainingScenario = useStoreState((store : any) => store.currentTriningScenario);
  const currentTrainingVal = useStoreState((store : any) => store.WordTrainingValues);
  useTrainingScenarioAsDocumentTitle();
  const beginTraining = useStoreActions((store: any) => store.beginTrainingMode);
  const currentTrainingSetting = useStoreState((store : any) => store.trainingSettings);
  const isTrainingTestDone = currentTrainingSetting.isTestDone;
  const wordTestNumber = useStoreState((store : any) => store.wordTestNumber);
  const isDisplayingIntroductionModal = useStoreState((store : any) => store.isDisplayingIntroductionModal);
  const setIsDisplayingIntroductionModal = useStoreActions((store : any) => store.setIsDisplayingIntroductionModal);


  //setIsDisplayingIntroductionModal
  
  const [toggleValue, setToggleValue] = useState(true);


  useEffect(() => {
    document.title = "IQ-EQ Test"
    sessionStorage.removeItem("tempTestDeIncrement");
    sessionStorage.removeItem('Refresh');

    const payload : any [] = []
    payload.push('ALPHABET');
    if(wordTestNumber != undefined){
      payload.push(wordTestNumber);
    } 
    beginTraining(payload);    
    
    
  }, []); // <-- dependency array

  return (
    <React.Fragment>
        <PageContainer contrast={contrast}>
      {!currentTrainingScenario &&
        <Redirect to="" />
      }
       {(isTrainingTestDone == false) && (
        <React.Fragment>
        <EditChordsModal />
      <SettingsColumn/>
      <CenterTrainingColumn />
      <PreviousTest/>
      {console.log('This is the inside test'+ isDisplayingIntroductionModal)}
      <div {...isDisplayingIntroductionModal == true || localStorage.getItem("FirstTimeViewingModal") == undefined ? '' : {className: 'hidden'}}>
      { isDisplayingIntroductionModal ? 
      <div style={modal}> 
      <div style={modal_content}>
      <button className="close absolute ml-96 text-5xl text-white" onClick={() => [setToggleValue(!toggleValue), localStorage.setItem("FirstTimeViewingModal", JSON.stringify(true)), setIsDisplayingIntroductionModal(false as boolean)]}>
            &times;
          </button>
      <ImageSlider slides={SliderData} />
      </div>
      </div>
      : null
}
</div>
      </React.Fragment>
       )}
       {(isTrainingTestDone == true) && (
        <React.Fragment>
        <TestCompletePage/>
      </React.Fragment>
       )}
      </PageContainer>
      </React.Fragment>

  );
}

export default TrainingTestPage;

const modal = {
  position: "absolute" as const, 
  zIndex: "1" as const, 
  left: "5%" as const,
  width: "75%" as const,
  textAlign: "center" as const,
  backgroundColor: "rgba(0, 0, 0, 0.25)" as const
};


const modal_content = {
  backgroundColor: "#181818" as const,
   position: "absolute" as const,
   top: "20%" as const, 
   left: "20%" as const, 
   borderRadius: "5px" as const, 
   border: "2px solid black" as const
  }
