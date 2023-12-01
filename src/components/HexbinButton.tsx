import React, { ReactElement, useState } from 'react';
// import CardData from '../../dashboard/components/dataCard';
import { useStoreState } from 'easy-peasy';
import { wpmMethodCalculatorForStoredChords } from '../../src/helpers/aggregation';
// import {
//   getChordsPerMinute,
//   getAverageWPM,
//   getChordsMastered,
//   getHighestWPM,
// } from '../../../pages/manager/components/chordGraphs';
// import { ScoresComponent } from '../../../components/scoresComponent';
import type { fromPairs } from 'lodash';
// import { CPMdashboardAnalytics } from './CPMdashboardAnalytics';
// import { CMdashboardAnalytics } from './CMdashboardAnalytics';
// import { ChMdashboardAnalytics } from './ChMdashboardAnalytics';
// import { AWPMdashboardAnalytics } from './AWPMdashboardAnalytics';
// import { TWPMdashboardAnalytics } from './TWPMdashboardAnalytics';
// import { StMdashboardAnalytics } from './StMdashboardAnalytics';
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
// import { ChartOptions } from 'chart.js';
import { Radar, getElementAtEvent, getElementsAtEvent } from 'react-chartjs-2';
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
export function HexbinButton(): ReactElement {
  const [componentToShow, setComponentToShow] = useState('');

  // was following logic in
  // will update with correct logic once logic is implemented
  const ChM = 300;
  const aWPM = 250;
  const tWPM = 275;
  const CM = 325;
  const StM = 75;
  /* eslint-disable */
  //   const CPM = parseInt(Math.max.apply(Math, Object.values(maxWPM))?.toFixed());
  /* eslint-enable */

  // const storedChordsFromDevice = useStoreState(
  //   (store) => store.storedChordsFromDevice,
  // );

  // data for hexbin visual
  const data = {
    labels: ['', '', '', '', '', ''],
    datasets: [
      {
        data: [20, 30, 40, 50, 60, 70],
        backgroundColor: 'rgba(0, 246, 120, 0.38)', //green fill-in
        borderColor: 'rgba(0, 246, 120, 0.38)', // border for green fill-in
        lineTension: -0.05,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgba(0, 246, 120, 0.38)',
        pointBorderWidth: 1,
        pointRadius: 4,
        // pointHoverBackgroundColor: 'rgba(0, 246, 120, 0.38)',
        // pointHoverBorderColor: 'white',
        // pointHoverRadius: 5,
        // link: ['CPM', 'ChM', 'aWPM', 'tWPM', 'CM', 'StM'],
      },
    ],
  };

  // making it where can click on verticies to activate components showing
  const chartRef = useRef();
  const onClick = (event) => {
    console.log('clicked');
    if (getElementAtEvent(chartRef.current, event).length > 0) {
      console.log(getElementAtEvent(chartRef.current, event)[0].datasetIndex);
      const datasetIndexNum = getElementAtEvent(chartRef.current, event)[0]
        .datasetIndex;
      const dataPoint = getElementAtEvent(chartRef.current, event)[0].index;
      const componentToShowCurr =
        data.datasets[datasetIndexNum].link[dataPoint];
    }
  };

  ChartJS.defaults.color = 'white';

  const options = {
    plugins: {
      legend: {
        labels: {
          fontColor: 'white',
        },
        display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.25)',
        },
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.25)',
        },
        ticks: {
          display: false,
        },
        pointLabels: {
          font: {
            size: 15,
            weight: '500',
          },
          fontColor: 'blue',
        },
        legend: {
          display: false,
        },
        // drawTicks: false,
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    // ...
    <NavLinksBtnImage>
      <HexbinContainer>
        <Radar data={data} options={options} ref={chartRef} />
      </HexbinContainer>
    </NavLinksBtnImage>
  );
}

const NavLinksBtnImage = styled.div``;

const HexbinContainer = styled.a`
  width: 50%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;
