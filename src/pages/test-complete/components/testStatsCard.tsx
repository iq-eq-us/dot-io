
import React, { ReactElement, useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/store';
import useContainerDimensions from '../../../hooks/useContainerDimensions';
import { getAverageWPM } from '../../manager/components/chordGraphs';
import { useWordsPerMinute } from '../../../hooks/useWordsPerMinute';
import { TestControlRow } from './testControlsRow';



export function TestStatsCard(): ReactElement {

    const beginTraining = useStoreActions((store: any) => store.beginTrainingMode);
    const trainingSceneario = useStoreState((store) => store.currentTrainingScenario);
    const currentWordTestNumber = useStoreState((store) => store.wordTestNumber);
    const currentTrainingSetting = useStoreState((store : any) => store.trainingStatistics);
    const trainingSettings = useStoreState((store) => store.trainingSettings);
    const testNumber = useStoreState((store) => store.wordTestNumber);

    

    const payload = []
    let thisVal = 0;
    let sumOccurrences = 0;
    const oo = [];
    const stats = useStoreState((state  : any) => state.trainingStatistics);
    payload.push(trainingSceneario);
    payload.push(currentWordTestNumber);

    currentTrainingSetting.statistics.forEach((d) => {
      thisVal += d.numberOfErrors;
      sumOccurrences += d.displayTitle.length * d.numberOfOccurrences ;
      sumOccurrences += d.displayTitle.length * d.numberOfOccurrences ;
      console.log(d.displayTitle.length * d.numberOfOccurrences);

    });

    return (
      <React.Fragment>
        <TrainingStatsColumnContainer>
         <StatsCardContainer>
          <div className='text-4xl'>{useWordsPerMinute().toFixed(0)}</div>
          <h1 className='text-lg'>WPM</h1>
          </StatsCardContainer>
          <StatsCardContainer>
          <div className='text-4xl'>{testNumber}</div>
          <h1 className='text-lg'>Test Type</h1>
          </StatsCardContainer>
          <StatsCardContainer>
          <div className='text-4xl'>{(((sumOccurrences -thisVal)/sumOccurrences)*100).toFixed(2) + '%'}</div>
          <h1 className='text-lg'>Typing Accuracy</h1>
          </StatsCardContainer>
        </TrainingStatsColumnContainer>
      
      </React.Fragment>
    );
}

const TrainingStatsColumnContainer = styled.div.attrs({
    className: 'flex flex-row text-center align-center pl-36 bg-[#181818]' ,
  })``;
  const StatsCardContainer = styled.div.attrs({
    className: 'flex flex-row text-center align-center w-full  ml-auto mr-auto  bg-[#181818]' ,
  })``;

const TextPromptContainer = styled.div `
flex items-center justify-center h-screen
`;

const TestContainer = styled.div `flex items-center justify-center h-screen	`;
