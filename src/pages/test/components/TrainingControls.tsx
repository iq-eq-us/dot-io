import React, { ReactElement, useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/store';



const LIST_LENGTH_OFFSET = 2;

function TrainingControls(): ReactElement {
  const stats = useStoreState(
    (state  : any) => state.trainingStatistics,
  ).statistics.sort((a  : any, b  : any) => b.averageSpeed - a.averageSpeed);

  return (
    
    <React.Fragment>
    <AggregateRow data = {stats}/>
    </React.Fragment>
  );
}


const AggregateStatRow = styled.div.attrs({
  className: `text-gray-300 flex flex-row w-full text-white items-center max-w-xs`,
})``;



const AggregateRow = ({ data } : { data: any }) => {
  const beginTraining = useStoreActions((store: any) => store.beginTrainingMode);
  const trainingSetting = useStoreState((store : any) => store.trainingStatistics);
  const currentTrainingSetting = useStoreState((store : any) => store.trainingSettings);
  const setIsDisplaying = useStoreActions((store) => store.setIsDisplayingTestComplete,);
  const wordTestNumber = useStoreState((store) => store.wordTestNumber,);
  const currentTrainingScenario = useStoreState((store) => store.currentTrainingScenario,);

  const setTrainingLevel = useStoreActions((store) => store.setTrainingLevel,);
  const maxWPM = useStoreState((store) => store.fastestRecordedWordsPerMinute,); 
  const setIsDisplayingIntroductionModal = useStoreActions((store) => store.setIsDisplayingIntroductionModal,);


  let sumErrors = 0;
  let sumOccurrences = 0;
  data.forEach((d : any) => {
    sumErrors += d.numberOfErrors;
    sumOccurrences += d.numberOfOccurrences;
  });



  const [popUpDisplayValue, setPopUpDisplayValue] = useState(false);
  const setVariable = wordTestNumber == undefined ? 26 : wordTestNumber;
  const [count, setCount] = useState(setVariable);

  function LearnPageFunction (value: string){
    const payload : any [] = []
    payload.push(value);
    sessionStorage.removeItem("tempTestDeIncrement");
    beginTraining(payload);
  }
  const [tempCounter, setTempCounter] = useState(-100);

useEffect(() => {

  const temp = parseInt(sessionStorage.getItem("tempTestDeIncrement"))
  if(tempCounter == -100){
    setTempCounter(temp);
    sessionStorage.getItem("CutomTierTestValue")
  }

  if(currentTrainingScenario == 'CUSTOMTIER'){

    if((sumOccurrences+1>=parseInt(sessionStorage.getItem("CutomTierTestValue")))){
    setIsDisplaying(true); //Set the testcomplete page variable to true which fires the completed page
    setPopUpDisplayValue(true);
    setTempCounter(-100);
    //Method will send the test values to local storage
    }
  }
  else if((sumOccurrences+1>=parseInt(count)) && wordTestNumber !=undefined){

    setIsDisplaying(true); //Set the testcomplete page variable to true which fires the completed page
    setPopUpDisplayValue(true);
    //Method will send the test values to local storage
  }


  //The logic below controls if the CHM tier is slides are triggers
  const canCHMTierBeUnlocked =  (parseInt(Math.max.apply(Math, Object.values(maxWPM))?.toFixed()) * 5) > 200; 
   
   
  console.log('Trigger for CHM tier '+ Math.max.apply(Math, Object.values(maxWPM))?.toFixed() + ' '+ canCHMTierBeUnlocked + ' '+    JSON.parse(localStorage.getItem("FirstTimeEnteringCHMTier")));

  if(canCHMTierBeUnlocked && JSON.parse(localStorage.getItem("FirstTimeEnteringCHMTier") == null)) {
   setTrainingLevel('CHM');
   setIsDisplayingIntroductionModal(true as boolean);
   localStorage.setItem("FirstTimeEnteringCHMTier", JSON.parse(true));
   LearnPageFunction('LEXICAL')
   console.log('Trigger for CHM tier')
  }
  
}, [sumOccurrences, setIsDisplaying]); // <-- dependency array

  return (
      <React.Fragment>
        
    </React.Fragment>
  );
};

const TrainingStatsColumnContainer = styled.div.attrs({
  className: 'flex flex-col text-center align-center w-full  ml-auto mr-auto relative bg-[#181818]' ,
})``;

const WordRowContainer = styled.div `
float-left
  max-width: 100%;
  max-height: 100%;
 `;

const RowStatItem = styled.button.attrs({
  className: `
  hover:color-[#1e90ff]
  whitespace-nowrap 
  text-sm w-1/4 
  font-semibold`,
})``;

const RowStatItemName = styled.button.attrs({
  className: `
  float-left
  whitespace-nowrap 
  text-sm w-1/4 
  font-semibold`,
})``;


export default TrainingControls;
