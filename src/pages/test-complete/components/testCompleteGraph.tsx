import ApexCharts from 'apexcharts';
import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import usePopover from '../../../hooks/usePopover';
import store, { useStoreState, useStoreActions } from '../../../store/store';
import {
  getCumulativeAverageChordTypeTime,
  wpmMethodCalculator,
  avgCalculatorForTheSpeedOfLastTen,
} from '../../../../src/helpers/aggregation';

//myGraph(wordNames, wordOccurrences, wordPerMinute)

export function myGraph(
  wordNames: any,
  wordOccurrences: any,
  wordPerMinute: any,
  rawSpeedOfCurrentWord: any,
) {
  const options = {
    chart: {
      type: 'area',
      height: 350,
      foreColor: '#FFFFFF',
      stacked: false,
      dropShadow: {
        enabled: false,
        enabledSeries: [0],
        top: -2,
        left: 2,
        blur: 5,
        opacity: 1,
      },
    },
    colors: ['#0090FF', '#22C55E', '#FF0000'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: undefined,
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45,
        },
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45,
      },
    },
    series: [
      {
        name: 'Average CPM',
        data: wordPerMinute,
      },
      {
        name: 'Individual CPM',
        data: rawSpeedOfCurrentWord,
      },

      {
        name: 'Errors',
        data: wordOccurrences,
      },
    ],
    xaxis: {
      categories: wordNames,
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#0090FF',
        },
        labels: {
          style: {
            colors: ['#0090FF', '#0090FF'],
          },
        },
        title: {
          text: 'Raw CPM',
          style: {
            color: '#0090FF',
          },
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#247BA0',
        },
        labels: {
          style: {
            colors: '#22C55E',
          },
        },
        title: {
          text: 'Raw CPM',
          style: {
            color: '#22C55E',
          },
        },
      },
      {
        floating: true,
        axisTicks: {
          show: false,
          color: '#22C55E',
        },
        axisBorder: {
          show: false,
          color: '#22C55E',
        },
        labels: {
          show: false,
          color: '#22C55E',
        },
      },
    ],
    grid: {
      padding: {
        left: -5,
        right: 5,
      },
    },

    tooltip: {
      theme: 'dark',
      x: {
        format: 'dd MM yyyy',
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      onItemClick: {
        toggleDataSeries: true,
      },
    },
  };

  const chart = new ApexCharts(
    document.getElementById('timeline-chart'),
    options,
  );

  chart.render();
}

function calculateStandardDeviationAndVariance(arr) {
  // Step 1: Calculate the mean
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += parseFloat(arr[i]);
  }
  console.log('Sum: ' + sum);
  const mean = sum / arr.length;
  console.log('Mean: ' + mean);
  const squaredDifferences = arr.map((value) =>
    Math.pow(parseFloat(value) - mean, 2),
  );
  const variance =
    squaredDifferences.reduce((sum, value) => sum + parseFloat(value), 0) /
    (arr.length - 1);
  console.log('Variance: ' + variance);
  const standardDeviation = Math.sqrt(variance);
  console.log('standardDeviation: ' + standardDeviation);
  const consist = standardDeviation / mean;
  //standard deviation is equal to the consistency
  return consist;
}

export function TestCompleteGraph(): ReactElement {
  const trainingStatistics = useStoreState(
    (store: any) => store.trainingStatistics,
  );
  const localTrainingStatistics = useStoreState(
    (store: any) => store.localTrainingStatistics,
  );
  const timeTakenToTypeEachWordInOrder = useStoreState(
    (store: any) => store.timeTakenToTypeEachWordInOrder,
  );
  const currentTrainingScenario = useStoreState(
    (store) => store.currentTrainingScenario,
  );
  const wordsPracticedInOrder = useStoreState(
    (store) => store.wordsPracticedInOrder,
  );

  const numberOfErrorsArrayForTestMode = useStoreState(
    (store) => store.numberOfErrorsArrayForTestMode,
  );
  const allTypedCharactersStore = useStoreState(
    (store) => store.allTypedCharactersStore,
  );
  const wordTestNumber = useStoreState((store) => store.wordTestNumber);
  const testTierHighestWPM = useStoreActions(
    (store) => store.setTestTierHighestWPM,
  );
  const averageOfLocalStats = wpmMethodCalculator(
    getCumulativeAverageChordTypeTime(localTrainingStatistics.statistics),
  );
  const tier = useStoreState((store) => store.trainingLevel);

  let wordNames: any = [];
  let wordOccurrences: any = [];
  let wordPerMinute: any = [];
  let rawSpeedOfCurrentWord: any = [];

  const chordsToChooseFrom = JSON.parse(
    localStorage.getItem('chordsToChooseFrom'),
  );

  const finalErrorsArray = [];
  const finalWPMArray = [];
  const finalRawWPM = [];
  let aggregate = 0;
  const timeTakenArray = [];

  if (tier == 'CPM') {
    for (let i = 0; i < timeTakenToTypeEachWordInOrder.length; i++) {
      const tempWPM = wpmMethodCalculator(
        timeTakenToTypeEachWordInOrder[i],
        wordsPracticedInOrder[i].length,
      );
      finalRawWPM.push((tempWPM * 5).toFixed(0));
      timeTakenArray.push(tempWPM * 5);
      aggregate = avgCalculatorForTheSpeedOfLastTen(timeTakenArray);
      finalWPMArray.push(aggregate.toFixed(0));
    }
    testTierHighestWPM(wordPerMinute[wordPerMinute.length - 1] * 5);
  } else {
    for (let i = 0; i < timeTakenToTypeEachWordInOrder.length; i++) {
      const tempWPM = wpmMethodCalculator(
        timeTakenToTypeEachWordInOrder[i],
        wordsPracticedInOrder[i].length,
      );
      finalRawWPM.push(tempWPM.toFixed(0));
      timeTakenArray.push(tempWPM);
      aggregate = avgCalculatorForTheSpeedOfLastTen(timeTakenArray);
      finalWPMArray.push(aggregate.toFixed(0));
    }
    testTierHighestWPM(wordPerMinute[wordPerMinute.length - 1]);
  }
  wordPerMinute = finalWPMArray;
  rawSpeedOfCurrentWord = finalRawWPM;
  wordOccurrences = numberOfErrorsArrayForTestMode;
  wordNames = wordsPracticedInOrder;
  console.log('finalWPMArray: ' + rawSpeedOfCurrentWord);

  const cons = (
    (1 - calculateStandardDeviationAndVariance(rawSpeedOfCurrentWord)) *
    100
  ).toFixed(2);
  console.log('Consistencty: ' + cons);
  /* store.getActions().addConsistency([parseFloat(cons)]); */

  useEffect(() => {
    // Add the accuracy value to the store when the component mounts
    store.getActions().addConsistency([parseFloat(cons)]);
  }, []);

  if (wordTestNumber == undefined && averageOfLocalStats != undefined) {
    if (tier == 'CPM') {
      wordPerMinute.pop();
      wordPerMinute.push(averageOfLocalStats?.toFixed(0) * 5);
    } else {
      //  wordPerMinute.pop();
      // wordPerMinute.push(averageOfLocalStats.toFixed(0));
    }
  }

  const handleEvent = () => {
    testTierHighestWPM(wordPerMinute[wordPerMinute.length - 1]);
    myGraph(wordNames, wordOccurrences, wordPerMinute, rawSpeedOfCurrentWord);
  };

  React.useEffect(() => {
    handleEvent();
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: '#333',
          border: '1px solid #000',
          borderRadius: '5px',
          borderWidth: '80%',
        }}
      >
        <div id="chart">
          <div id="timeline-chart">{handleEvent}</div>
        </div>
      </div>
    </React.Fragment>
  );
}
export const AverageSpeed = styled.button.attrs({
  className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
})``;
export const ChordsMastered = styled.button.attrs({
  className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
})``;
export const TopSpeed = styled.button.attrs({
  className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
})``;
export const PracticeStreak = styled.button.attrs({
  className: `text-white rounded p-2 mb-4 inline-block ml-2 bg-green-500`,
})``;
export const HorizontalRule = styled.hr.attrs({
  className: `mx-16 border-gray-600 mb-16`,
})``;
