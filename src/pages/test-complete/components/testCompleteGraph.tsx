import  ApexCharts from 'apexcharts';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import usePopover from '../../../hooks/usePopover';
import { useStoreState, useStoreActions } from '../../../store/store';



//myGraph(wordNames, wordOccurrences, wordPerMinute)

export function myGraph(wordNames, wordOccurrences, wordPerMinute){

 const options = {
  chart: {
    type: "area",
    height: 350,
    foreColor: "#FFFFFF",
    stacked: false,
    dropShadow: {
      enabled: false,
      enabledSeries: [0],
      top: -2,
      left: 2,
      blur: 5,
      opacity: 1
    }
    

  },
  colors: ['#22C55E', '#0090FF', 'pink', 'yellow'],
  stroke: {
    curve: "smooth",
    width: 3
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 'bold',
      colors: undefined
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
      opacity: 0.45
    }
  },
  dropShadow: {
      enabled: false,
      top: 1,
      left: 1,
      blur: 1,
      color: '#000',
      opacity: 0.45
  }
  },
  series: [
    {
      name: "Word Per Minute",
      data: wordPerMinute
    },
    {
      name: "Typing Errors",
      data: wordOccurrences
    }
  ],
  xaxis: {
    categories: wordNames
  },
  yaxis: [
    {
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#FF1654"
      },
      labels: {
        style: {
          colors: "#FF1654"
        }
      },
      title: {
        text: "Words Per Minute",
        style: {
          color: "#FF1654"
        }
      }
    },
    {
      opposite: true,
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#247BA0"
      },
      labels: {
        style: {
          colors: "#247BA0"
        }
      },
      title: {
        text: "Typing Errors",
        style: {
          color: "#247BA0"
        }
      }
    }
  ],
  grid: {
    padding: {
      left: -5,
      right: 5
    }
  },
  tooltip: {
    x: {
      format: 'dd MM yyyy'
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    onItemClick: {
      toggleDataSeries: false
  },
  },
  
};

const chart = new ApexCharts(document.getElementById("timeline-chart"), options);

chart.render();
}

export function TestCompleteGraph(): ReactElement {

  const currentTrainingSetting = useStoreState((store : any) => store.trainingStatistics);

    const wordNames : any = [];
    const wordOccurrences : any = [];
    const wordPerMinute : any = [];

    currentTrainingSetting.statistics.forEach((d : any) => {

      if(d.displayTitle.length * d.numberOfOccurrences != 0) {
          wordNames.push(d.displayTitle);
          wordOccurrences.push(d.displayTitle.length * d.numberOfErrors);

          let avgSpeedMilliseconds = d.averageSpeed.toFixed(0) * 10;
          let millisecondsPerCharacter = avgSpeedMilliseconds;
          let averageCharacterPerMin = 60000/millisecondsPerCharacter;
          let wpm = averageCharacterPerMin; 
          wordPerMinute.push(wpm.toFixed(0));
      }

    });

    const handleEvent = () => {
        myGraph(wordNames, wordOccurrences, wordPerMinute)
      };
  
      React.useEffect(() => {
        handleEvent();
      }, []);
    

  return (
    
    <React.Fragment>


      <div style={{ backgroundColor:"#333", border: "1px solid #000", borderRadius: "5px", borderWidth: '80%'}}>
      <div id="chart" >
     <div id="timeline-chart" onLoad={handleEvent}/>
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