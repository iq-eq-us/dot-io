import type { ApexOptions } from 'apexcharts';
import React, { ReactElement, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import FadeIn from './FadeIn';

interface Props {
  name: string;
  progress: number;
}

const CMradialGraph = ({ name, progress }: Props): React.ReactElement => {
  const progressNumber = parseInt(progress.toFixed(0));

  // useEffect(() => {
  //     setSeries({...series});
  // });

  console.log(progressNumber);

  const options: ApexOptions = {
    labels: [`${progressNumber}% Complete`],
    colors: ['#1d6bc4'],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#fff',
          strokeWidth: '75%',
          margin: 15, // margin is in pixels
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -25,
            show: true,
            color: '#fff',
            fontSize: '15px',
          },
          value: {
            color: 'rgba(0, 246, 120, 0.38)',
            fontSize: '1px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 1,
        gradientToColors: ['rgba(0, 246, 120, 0.38)'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 51, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
  };

  return (
    <FadeIn
      transitionDuration={1000}
      delay={40}
      className="flex flex items-center"
    >
      <div className="text-[17px] font-semibold font-mono flex flex-col text-center text-align-center">
        <h3>Level Progression Towards {name}</h3>
        {/* <h3>\\Quantifier\\ until next level!</h3> */}
      </div>
      <Chart
        options={options}
        series={[progress]}
        type="radialBar"
        height={400}
        className="text-[17px] font-semibold font-mono flex flex-col text-center"
      />
    </FadeIn>
  );
};

export default CMradialGraph;
