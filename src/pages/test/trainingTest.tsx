import React, { ReactElement, useEffect } from 'react';
import SettingsColumn from './components/SettingsColumn';
import CenterTrainingColumn from './components/CenterTrainingColumn';
import { StatisticsColumn } from './components/StatisticsColumn';
import { useContrast } from '../../hooks/useContrast';
import EditChordsModal from './components/EditChordModal';
import { PageContainer } from './trainingTest.styled';
import useTrainingScenarioAsDocumentTitle from '../../hooks/useTrainingScenarioAsDocumentTitle';
import { useStoreState, useStoreActions } from '../../store/store';
import { Redirect } from 'react-router-dom';
import TrainingControls from './components/TrainingControls';
import { PreviousTest } from './components/PreviousTests';
import styled from 'styled-components';
import TestCompletePage from '../test-complete/testComplete';
import Footer from '../../../src/components/footer';

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

  


  useEffect(() => {
    document.title = "IQ-EQ Test"

    sessionStorage.removeItem("tempTestDeIncrement");
    sessionStorage.removeItem('Refresh');

    const payload : any [] = []
    payload.push('LEXICAL');
    if(wordTestNumber != undefined){
      payload.push(wordTestNumber);
    } else{
    payload.push('10');
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

const TestandStatsContainer = styled.div.attrs({
  className: 'grid ',
})``;




const FooterContainer = styled.footer `
background-color: #181818;
`

const FooterWrap = styled.div `
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 1100px;
margin: 0 auto;
`;

const FooterLinksContainer = styled.div `
display: flex;
justify-content: center;

@media screen and (max-width: 820px) {
padding-top: 32px;
}
`

const FooterLinksWrapper = styled.div `
display: flex;

@media screen and (max-width: 820px) {
flex-direction: column;
}
`;

const FooterLinkItems = styled.div `
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
width: 300px;
box-sizing: border-box;
color #fff

@media screen and (max-width: 420px){
margin 0;
padding: 10px;
width: 100%;
}
`;

const FooterLinkTitle = styled.h1 `
font-size: 14px;
margin-bottom: 16px
`

const FooterLink = styled.a `
color: #fff;
text-decoration: none;
margin-bottom: 0.5rem;
font-size: 14px;

&:hover {
color: #01bf71;
transition: 0.3s ease out;
}
`;

const FooterLinkLogo = styled.img `
color: #fff;
text-decoration: none;
margin-bottom: 0.5rem;
font-size: 14px;
height: 40px;
display: block;
margin-left: auto;
margin-right: auto;
&:hover {
color: #01bf71;
transition: 0.3s ease out;
}
`;