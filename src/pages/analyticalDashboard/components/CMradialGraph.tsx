import React, { ReactElement, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import store, { useStoreState, useStoreActions } from '../../../store/store';

export function CMradialGraph(): ReactElement {
  const [componentToShow, setComponentToShow] = useState('');
  const flashcardSetName = localStorage.getItem('dropdownFlashcardSetSelected');
  const progressNumber = 100;

  const update = () => {
    console.log('inside CMradialGraph');
    console.log(
      JSON.parse(localStorage.getItem('dropdownFlashcardSetSelectedUpdated')),
    );
    localStorage.setItem(
      'dropdownFlashcardSetSelectedUpdated',
      JSON.stringify(false),
    );
  };

  const [options, setOptions] = useState({
    labels: [`${progressNumber}% Complete`],
    colors: ['#1d6bc4'],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#fff',
          strokeWidth: '98%',
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
  });

  const [series, setSeries] = useState([progressNumber]);

  return (
    <div>
      <p onClick={update}>Progress towards flashcard set: {flashcardSetName}</p>
      <Chart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
}
