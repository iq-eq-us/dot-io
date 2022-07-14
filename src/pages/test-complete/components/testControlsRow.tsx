import React, { ReactElement } from 'react';
import { useCurrentTrainingScenario } from '../../../hooks/useCurrentTrainingScenario';
import { useStoreState, useStoreActions } from '../../../store/store';
import RefreshIcon from './RefreshIcon';
import styled from 'styled-components';
import GrCaretNext from 'react-icons';
import TrainingControls from '../../test/components/TrainingControls';



export function TestControlRow(): ReactElement {

    const beginTraining = useStoreActions((store: any) => store.beginTrainingMode);
    const trainingSceneario = useStoreState((store) => store.currentTrainingScenario);
    const currentWordTestNumber = useStoreState((store) => store.wordTestNumber);

    const payload = []
    payload.push(trainingSceneario);
    payload.push(currentWordTestNumber);
    function letsGoAgain(){
      sessionStorage.setItem("Refresh", JSON.stringify(1))
      sessionStorage.removeItem("CutomTierTestValue");
      sessionStorage.removeItem("tempTestDeIncrement");
      console.log('Here I am removing in testControls Row')

      beginTraining(payload);
      

    }
    return (
        <React.Fragment>
        <RowContainer>
            <ItemsContainer>
        <div
        className="p-2 bg-[#333] flex items-center justify-center rounded mb-2 ml-2 cursor-pointer hover:bg-[#444] active:bg-[#222]"
        onClick={() => {
          letsGoAgain()
        }}
      >
        <RefreshIcon />
      </div>
         </ItemsContainer>
      </RowContainer>    
       <TeirSelector>
       <TrainingControls/>
       </TeirSelector>
       </React.Fragment>
      );
  }

  const TeirSelector = styled.div `
background-color: #181818;
height: 60px;
min-width: 100%;


`;
  const ItemsContainer = styled.div`
    height: 30px;
    display: "flex", 
    padding: '1rem' ,  
    justifyContent: "space-between", 
    alignItems: "center", 
  `
  const RowContainer = styled.div `
background-color: #181818;
height: 60px;
display: flex;
justify-content: center;
align-items: center;
font-size: 1rem;
position: sticky;
top: 0;
z-index: 10;

@media screen and (max-width: 960px) {
  transition: 0.8s all ease;
}
`;