import React, { ReactElement, useState } from 'react';
import CardData from '../../dashboard/components/dataCard';
import { useStoreState } from 'easy-peasy';
import { wpmMethodCalculatorForStoredChords } from '../../src/helpers/aggregation';
import {
  getChordsPerMinute,
  getAverageWPM,
  getChordsMastered,
  getHighestWPM,
} from '../../../pages/manager/components/chordGraphs';
import { ScoresComponent } from '../../../components/scoresComponent';
import type { fromPairs } from 'lodash';

import { useRef } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from 'chart.js';
import { Radar, getElementAtEvent } from 'react-chartjs-2';
ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
);
import styled from 'styled-components';

// visual/graphic for the dynamic hexbin on the analytical dashboard
// the hexbin has 6 vertices each representing a different stat (the stats are showcased on the welcome message on the homepage)
// the vertices are flexibility (CPM), constitution (ChM), stamina (aWPM), power (tWPM), intelligence (CM), and technique (StM)
export function Hexbin(): ReactElement {
  const maxWPM = useStoreState((store) => store.fastestRecordedWordsPerMinute);

  const storedChordsFromDevice = useStoreState(
    (store) => store.storedChordsFromDevice,
  );

  // let sumOfChordsMastered = 0;
  // storedChordsFromDevice?.statistics?.forEach((d) => {
  //   console.log("Hi")
  //   // console.log("Chords mastered" + d.chordsMastered);
  //   sumOfChordsMastered +=
  //     d.chordsMastered[d?.chordsMastered.length - 1] == null ||
  //     d?.chordsMastered.length == 0 ||
  //     (d.chordsMastered.length == 1 && d.chordsMastered[0] == 0)
  //       ? 0
  //       : wpmMethodCalculatorForStoredChords(d?.chordsMastered, d.id.length);
  // });

  // the vertices are flexibility (CPM), constitution (ChM), stamina (aWPM), power (tWPM), intelligence (CM), and technique (StM)

  const options = {
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 100,
        stepSize: 20,
        display: true,
      },
      pointLabels: {
        fontSize: 20,
        fontColor: 'white',
        fontStyle: 'bold',
      },
      gridLines: {
        color: 'white',
      },
      angleLines: {
        color: 'white',
      },
    },
    legend: {
      display: true,
    },
    tooltips: {
      enabled: false,
    },
  };

  const data = {
    labels: [
      'flexibility (CPM)',
      'constitution (ChM)',
      'stamina (aWPM)',
      'power (tWPM)',
      'intelligence (CM)',
      'technique (StM)',
    ],
    datasets: [
      {
        label: '',
        data: [50, 30, 30, 35, 40, 45],
        backgroundColor: 'rgba(0, 246, 120, 0.38)',
        borderColor: 'rgba(0, 246, 120, 0.38)',
        lineTension: -0.05,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgba(0, 246, 120, 0.38)',
        pointBorderWidth: 5,
        pointRadius: 5,
        pointHoverBackgroundColor: 'rgba(0, 246, 120, 0.38)',
        pointHoverBorderColor: 'white',
        pointHoverRadius: 5,
        link: ['https://www.google.com', 'https://yahoo.com'],
      },
    ],
  };

  const chartRef = useRef();
  const onClick = (event) => {
    console.log('clicked');
    console.log(getElementAtEvent(chartRef.current, event));
    // console.log(getElementAtEvent(chartRef.current, event)[0].datasetIndex);
    // console.log(getElementAtEvent(chartRef.current, event)[0].index);
    // console.log(data.datasets[getElementAtEvent(chartRef.current, event)[0].datasetIndex].link[getElementAtEvent(chartRef.current, event)[0].index]);
    window.open();
  };

  return (
    <div>
      <HexbinContainer>
        <Radar
          data={data}
          // options = {options}
          onClick={onClick}
          ref={chartRef}
        />
      </HexbinContainer>

      <CardData />
      <p>
        Result of flexibility (CPM):
        {parseInt(Math.max.apply(Math, Object.values(maxWPM))?.toFixed())}
      </p>
      <p>
        Result of constitution (ChM):
        {/* 100? */}
      </p>
      <p>Result of stamina (aWPM): {getAverageWPM()}</p>
      <p>Result of power (tWPM): {getHighestWPM()}</p>
      <p>Result of intelligence (CM): </p>
      <p>Result of technique (StM): </p>

      <br />
      <p>ScoresComponent:</p>
      {ScoresComponent}
    </div>
  );
}

const HexbinContainer = styled.div.attrs({
  className: `
    text-white 
    text-4xl 
    font-normal 
    font-mono 
    border-4
    max-w-5xl`,
})``;
