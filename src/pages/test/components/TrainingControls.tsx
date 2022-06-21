import React, { ReactElement, useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/store';



// This is used to account for the header row as well as the "aggregate" row that shows average speed and
// a sum of errors and occurrences
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

  const isWordTestDone = useStoreState((store : any) => store.isTestDone);
  const trainingSetting = useStoreState((store : any) => store.trainingStatistics);
  const currentTrainingSetting = useStoreState((store : any) => store.trainingSettings);
  const setIsDisplaying = useStoreActions((store) => store.setIsDisplayingTestComplete,);
  const wordTestNumber = useStoreState((store) => store.wordTestNumber,);


  let sumErrors = 0;
  let sumOccurrences = 0;
  data.forEach((d : any) => {
    sumErrors += d.numberOfErrors;
    sumOccurrences += d.numberOfOccurrences;
  });



  const [popUpDisplayValue, setPopUpDisplayValue] = useState(false);
  const setVariable = wordTestNumber == undefined ? '10' : wordTestNumber;
  const [count, setCount] = useState(setVariable);

  function beginTestBasedOnTrainingSelection (val : number){
    const payload = []
    payload.push('LEXICAL');
    payload.push(""+val+"");
    setCount(val);
    sessionStorage.removeItem("tempTestDeIncrement");
    beginTraining(payload); 
  }
useEffect(() => {
  console.log(currentTrainingSetting);
  console.log(trainingSetting)
  // run something every time name changes
  if(sumOccurrences>=parseInt(count)){
    setIsDisplaying(true); //Set the testcomplete page variable to true which fires the completed page
    setPopUpDisplayValue(true);
    //Method will send the test values to local storage
  }
  
}, [sumOccurrences, isWordTestDone, setIsDisplaying]); // <-- dependency array

  return (
      <React.Fragment>
        <WordRowContainer> 
        <AggregateStatRow>
        <RowStatItemName >Words: </RowStatItemName>
        <RowStatItem onClick={() => beginTestBasedOnTrainingSelection(10)} style={ (count ==10) ? {color: '#1e90ff'} :{} }>10</RowStatItem>
        <RowStatItem onClick={() => beginTestBasedOnTrainingSelection(25)} style={ (count ==25) ? {color: '#1e90ff'} :{} }>25</RowStatItem>
        <RowStatItem onClick={() =>beginTestBasedOnTrainingSelection(50)} style={ (count ==50) ? {color: '#1e90ff'} :{} }>50</RowStatItem>
        <RowStatItem onClick={() =>beginTestBasedOnTrainingSelection(75)} style={ (count ==75) ? {color: '#1e90ff'} :{} }>75</RowStatItem>
        </AggregateStatRow>
        </WordRowContainer>
    </React.Fragment>
  );
};

const TrainingStatsColumnContainer = styled.div.attrs({
  className: 'flex flex-col text-center align-center w-full  ml-auto mr-auto relative bg-[#181818]' ,
})``;

const WordRowContainer = styled.div `
  margin-top: 30px;
  max-width: 100%;
  max-height: 100%;
 `;

const TextPromptContainer = styled.div `
  width: 100%;
  height: 105%;
  background: #181818;
  animation: blinker 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
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
  whitespace-nowrap 
  text-sm w-1/4 
  font-semibold`,
})``;


export default TrainingControls;
