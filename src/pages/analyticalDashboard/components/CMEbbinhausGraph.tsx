import React, { ReactElement, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import store, { useStoreState, useStoreActions } from '../../../store/store';

export function CMEbbinghausGraph(): ReactElement {
  // console.log(
  //   'Getting stored accuracy list is: ' + store.getState().currConsistency,
  // );

  const [options, setOptions] = useState({
    colors: ['#a855f7'],
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 4,
    },
    title: {
      text: 'CM Ebbinghaus Forgetting Curve',
      align: 'left',
      offsetY: 25,
      offsetX: 15,
      style: {
        color: '#FFFFFF',
      },
    },
    subtitle: {
      text: '',
      offsetY: 45,
      offsetX: 15,
      style: {
        color: '#FFFFFF',
      },
    },
    dataLabels: {
      style: {
        colors: ['#FFFFFF'],
      },
    },
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    xaxis: {
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          colors: '#FFFFFF',
          fontSize: '12px',
          cssClass: 'apexcharts-yaxis-label',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FFFFFF',
          fontSize: '12px',
          cssClass: 'apexcharts-yaxis-label',
        },
      },
      axisBorder: {
        show: true,
        color: '#78909C',
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: 'solid',
        color: '#78909C',
        width: 6,
        offsetX: 0,
        offsetY: 0,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -5,
      labels: {
        colors: '#FFFFFF',
        useSeriesColors: false,
      },
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Memory Retention',
      data: [100, 80, 60, 40, 20, 5, 4, 3, 2, 1],
    },
  ]);

  return (
    <div className=" text-black">
      <Chart options={options} series={series} width={625} height={350}></Chart>
    </div>
  );
}
