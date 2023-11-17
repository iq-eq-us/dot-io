import React, { ReactElement, useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import styled from 'styled-components';
import store, { useStoreState, useStoreActions } from '../../../store/store';
import useContainerDimensions from '../../../hooks/useContainerDimensions';
import { TestControlRow } from './testControlsRow';
import { wpmMethodCalculator } from '../../../helpers/aggregation';
import { getCumulativeAverageChordTypeTime } from '../../../helpers/aggregation';
import { stubString } from 'lodash';

export function TestStatsCard(): ReactElement {
  const beginTraining = useStoreActions(
    (store: any) => store.beginTrainingMode,
  );
  const trainingScenario = useStoreState(
    (store) => store.currentTrainingScenario,
  );
  const currentWordTestNumber = useStoreState((store) => store.wordTestNumber);
  const currentTrainingSetting = useStoreState(
    (store: any) => store.trainingStatistics,
  );
  const tier = useStoreState((store) => store.trainingLevel);
  const testNumber = useStoreState((store) => store.wordTestNumber);
  const localTrainingStatistics = useStoreState(
    (store) => store.localTrainingStatistics.statistics,
  );

  const wordTestNumber = useStoreState((store) => store.wordTestNumber);

  const testTierHighestWPM = useStoreState((store) => store.testTierHighestWPM);
  const numberOfWordsTypedCorrectly = useStoreState(
    (store) => store.numberOfWordsTypedCorrectly,
  );

  const payload = [];
  let thisVal = 0;
  let sumOccurrences = 0;
  const numberOfWordsChorded = useStoreState(
    (state: any) => state.numberOfWordsChorded,
  );
  payload.push(trainingScenario);
  payload.push(currentWordTestNumber);

  currentTrainingSetting.statistics?.forEach((d) => {
    thisVal += d.numberOfErrors;
    sumOccurrences += d.displayTitle.length * d.numberOfOccurrences;
    //console.log(d.displayTitle.length * d.numberOfOccurrences);
  });

  const allTypedText = useStoreState(
    (store: any) => store.allTypedCharactersStore,
  );

  const trainingSessionErrors = useStoreState(
    (store) => store.trainingSessionErrors,
  );

  const Accuracy =
    ((allTypedText.length - 1 - trainingSessionErrors) /
      (allTypedText.length - 1)) *
    100;

  console.log('Errors ' + trainingSessionErrors);
  //console.log("CPM: " + testTierHighestWPM);
  //store.getActions().addTestCPM([testTierHighestWPM]);

  const timerValue = useStoreState((store) => store.timerValue);
  const trainingIsDone = useStoreState((store) => store.trainingIsDone);

  const averageOfLocalStats = wpmMethodCalculator(
    getCumulativeAverageChordTypeTime(localTrainingStatistics),
  );

  useEffect(() => {
    /* eslint-disable */
    let date = new Date().toLocaleDateString();
    /* eslint-enable */
    // Add the accuracy value to the store when the component mounts
    store.getActions().addAccuracy([Accuracy]);
    store.getActions().addTestDate([date]);
    store.getActions().addTestErrors([trainingSessionErrors]);
  }, []);

  function returnValueBasedOnTier() {
    if (tier == 'CPM') {
      if (averageOfLocalStats.toFixed(0) == 'Infinity') return 0;
      else return parseFloat(averageOfLocalStats.toFixed(0) * 5);
    } else if (tier == 'CHM') {
      if (averageOfLocalStats.toFixed(0) == 'Infinity') return 0;
      else return parseFloat(averageOfLocalStats.toFixed(0));
    }
  }

  const numCPM =
    wordTestNumber != undefined ? testTierHighestWPM : returnValueBasedOnTier();
  useEffect(() => {
    if (numCPM != 0 && numCPM != null) {
      console.log('CPM with the correct value only: ' + numCPM);
      store.getActions().addTestCPM([numCPM]);
    }
  }, [numCPM]);

  let sumOfLastTenOccurences = 0;
  let averageOfLocalStats2 = 0;
  localTrainingStatistics?.forEach((d) => {
    sumOfLastTenOccurences += d.speedOfLastTen?.length;
    averageOfLocalStats2 +=
      wpmMethodCalculator(d.averageSpeed, d.id.length) == Infinity
        ? 0
        : wpmMethodCalculator(d.averageSpeed, d.id.length) *
          d.speedOfLastTen?.length;
  });
  return (
    <React.Fragment>
      <TrainingStatsColumnContainer>
        {tier == 'CPM' && (
          <StatsCardContainer>
            <div className="text-6xl">
              {console.log('here:')}
              {console.log(wordTestNumber)}
              {wordTestNumber != undefined
                ? testTierHighestWPM
                : returnValueBasedOnTier()}
            </div>
            <h1 className="text-2xl">{tier}</h1>
          </StatsCardContainer>
        )}
        <StatsCardContainer>
          <div className="text-4xl">
            {wordTestNumber != undefined
              ? (testTierHighestWPM / 5)?.toFixed(0) != 'Infinity'
                ? (testTierHighestWPM / 5)?.toFixed(0)
                : '0'
              : (averageOfLocalStats2 / sumOfLastTenOccurences)?.toFixed(0)}
          </div>
          <h1 className="text-lg">WPM</h1>
        </StatsCardContainer>
        <StatsCardContainer>
          <div className="text-4xl">
            {wordTestNumber != undefined
              ? Accuracy.toFixed(2) + '%'
              : Accuracy.toFixed(2) + '%'}
          </div>
          <h1 className="text-lg">Typing Accuracy</h1>
        </StatsCardContainer>
        <StatsCardContainer>
          <div className="text-4xl">
            {(numberOfWordsChorded.toFixed(0) / 25) * 100 + '%'}
          </div>
          <h1 className="text-lg">Chorded</h1>
        </StatsCardContainer>
        <StatsCardContainer>
          <div className="text-4xl">{timerValue}</div>
          <h1 className="text-lg">Time Taken</h1>
        </StatsCardContainer>
      </TrainingStatsColumnContainer>
      <div
        className="items-center absolute text-lg text-red-500 ml-16 mt-2"
        style={
          (Accuracy < 95 || (numberOfWordsChorded.toFixed(0) / 25) * 100 > 5) &&
          trainingIsDone
            ? { display: '' }
            : { display: 'none' }
        }
      >
        *Only tests with a minimum accuracy of 95% and less than 5% words
        chorded are counted towards your progress.
      </div>
    </React.Fragment>
  );
}

const TrainingStatsColumnContainer = styled.div.attrs({
  className: 'flex flex-row text-center align-center pl-36 bg-[#222424]',
})``;
const StatsCardContainer = styled.div.attrs({
  className:
    'flex flex-row text-center align-center w-full  ml-auto mr-auto  bg-[#222424]',
})``;

const TextPromptContainer = styled.div`
flex items-center justify-center h-screen
`;

const TestContainer = styled.div`flex items-center justify-center h-screen	`;
