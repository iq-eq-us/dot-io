
import React, { ReactElement, useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/store';
import useContainerDimensions from '../../../hooks/useContainerDimensions';
import { getCumulativeAverageChordTypeTime } from '../../../helpers/aggregation';
import DropDown from '../../../models/keyboardDropDownFolder/keyboardDropDown';
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
    const stats = useStoreState(
        (state  : any) => state.trainingStatistics,
      ).statistics.sort((a  : any) => a.sumErrors);
    payload.push(trainingSceneario);
    payload.push(currentWordTestNumber);
   // beginTraining(payload);
        //numberOfErrors
    return (
        <TestContainer>
        <TextPromptContainer>
        <TrainingStatsColumnContainer>
          <h3>Stats</h3>
          <h1>WPM: {useWordsPerMinute()}</h1>
          <h1>Test: {testNumber}</h1>
        </TrainingStatsColumnContainer>
        </TextPromptContainer>
        </TestContainer>
    );
}

const TrainingStatsColumnContainer = styled.div.attrs({
    className: 'flex flex-col text-center align-center w-full  ml-auto mr-auto  bg-[#181818]' ,
  })``;

const TextPromptContainer = styled.div `
flex items-center justify-center h-screen
`;

const TestContainer = styled.div `flex items-center justify-center h-screen	`;
