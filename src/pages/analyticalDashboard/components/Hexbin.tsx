import React, { ReactElement, useState } from 'react';
import CardData from '../../dashboard/components/dataCard';
//import { useStoreState } from 'easy-peasy';
import { useStoreState } from '../../../store/store';
import { wpmMethodCalculatorForStoredChords } from '../../src/helpers/aggregation';
import {
  getChordsPerMinute,
  getAverageWPM,
  getChordsMastered,
  getHighestWPM,
} from '../../../pages/manager/components/chordGraphs';
import { ScoresComponent } from '../../../components/scoresComponent';
import type { fromPairs } from 'lodash';
import { CPMdashboardAnalytics } from './CPMdashboardAnalytics';
import { CMdashboardAnalytics } from './CMdashboardAnalytics';
import { ChMdashboardAnalytics } from './ChMdashboardAnalytics';
import { AWPMdashboardAnalytics } from './AWPMdashboardAnalytics';
import { TWPMdashboardAnalytics } from './TWPMdashboardAnalytics';
import { StMdashboardAnalytics } from './StMdashboardAnalytics';
import FadeIn from './FadeIn';
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
export function Hexbin(): ReactElement {
  const maxWPM = useStoreState((store) => store.fastestRecordedWordsPerMinute);
  const flashcard = useStoreState((state) => state.flashCards);

  const [componentToShow, setComponentToShow] = useState('');

  // was following logic in
  // will update with correct logic once logic is implemented
  const ChM = 300;
  const aWPM = 250;
  const tWPM = 275;
  const CM = 325;
  const StM = 75;
  /* eslint-disable */
  const CPM = parseInt(Math.max.apply(Math, Object.values(maxWPM))?.toFixed());
  /* eslint-enable */

  // const storedChordsFromDevice = useStoreState(
  //   (store) => store.storedChordsFromDevice,
  // );

  // data for hexbin visual
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
        data: [CPM, ChM, aWPM, tWPM, CM, StM],
        backgroundColor: 'rgba(0, 246, 120, 0.38)', //green fill-in
        borderColor: 'rgba(0, 246, 120, 0.38)', // border for green fill-in
        lineTension: -0.05,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgba(0, 246, 120, 0.38)',
        pointBorderWidth: 5,
        pointRadius: 6,
        pointHoverBackgroundColor: 'rgba(0, 246, 120, 0.38)',
        pointHoverBorderColor: 'white',
        pointHoverRadius: 5,
        link: ['CPM', 'ChM', 'aWPM', 'tWPM', 'CM', 'StM'],
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

      console.log('Current component to show: ' + componentToShowCurr);

      if (componentToShowCurr == 'CPM') {
        setComponentToShow('CPM');
      } else if (componentToShowCurr == 'ChM') {
        setComponentToShow('ChM');
      } else if (componentToShowCurr == 'aWPM') {
        setComponentToShow('aWPM');
      } else if (componentToShowCurr == 'tWPM') {
        setComponentToShow('tWPM');
      } else if (componentToShowCurr == 'CM') {
        setComponentToShow('CM');
      } else if (componentToShowCurr == 'StM') {
        setComponentToShow('StM');
      }
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
      <div className="flex justify-center mb-1.5 border-1">
        <HexbinContainer>
          <Radar
            data={data}
            onClick={onClick}
            options={options}
            ref={chartRef}
          />
        </HexbinContainer>
      </div>
      <div className="flex align-center justify-center text-white mb-10">
        <FadeIn transitionDuration={1000} delay={40}>
          {componentToShow == 'CPM' ? <CPMdashboardAnalytics /> : null}
        </FadeIn>
        <FadeIn transitionDuration={1000} delay={40}>
          {componentToShow == 'ChM' ? <ChMdashboardAnalytics /> : null}
        </FadeIn>
        <FadeIn transitionDuration={1000} delay={40}>
          {componentToShow == 'aWPM' ? <AWPMdashboardAnalytics /> : null}
        </FadeIn>
        <FadeIn transitionDuration={1000} delay={40}>
          {componentToShow == 'tWPM' ? <TWPMdashboardAnalytics /> : null}
        </FadeIn>
        <FadeIn transitionDuration={1000} delay={40}>
          {componentToShow == 'CM' && flashcard.length > 0 ? (
            <CMdashboardAnalytics />
          ) : null}
          {componentToShow == 'CM' && flashcard.length <= 0 ? (
            <div>Please Import Flashcards</div>
          ) : null}
        </FadeIn>
        <FadeIn transitionDuration={1000} delay={40}>
          {componentToShow == 'StM' ? <StMdashboardAnalytics /> : null}
        </FadeIn>
      </div>

      {/* <CardData /> */}
      {/* <div>
          <p>
            Result of flexibility (CPM):
            {parseInt(Math.max.apply(Math, Object.values(maxWPM))?.toFixed())}
          </p>
        <p>
          Result of constitution (ChM):
          {ChM} */}
      {/* {(sumOfChordsMastered / 100)?.toFixed(2)} */}
      {/* </p>
        <p>Result of stamina (aWPM): {getAverageWPM()}</p>
        <p>Result of power (tWPM): {getHighestWPM()}</p>
        <p>Result of intelligence (CM): </p>
        <p>Result of technique (StM): </p>

        <br />
        <p>ScoresComponent:</p>
        {ScoresComponent}
        </div> */}
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
