import React, { ReactElement, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import store, { useStoreState, useStoreActions } from '../../../store/store';

export function AnalyticalDashboardAccAndConOverall(): ReactElement {
  console.log(
    'Getting stored accuracy list is: ' + store.getState().currConsistency,
  );

  const [options, setOptions] = useState({
    colors: ['#a855f7', '#14b8a6', '#f472b6', '#06b6d4'],
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
      text: 'CPM Module Test History',
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
    labels: JSON.parse(localStorage.getItem('TestDate') || '[]'),
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
      name: 'Accuracy (%)',
      data: JSON.parse(localStorage.getItem('TestAccuracy') || '[]'),
      //data: [0, 39, 52, 11, 29, 43]
    },
    {
      name: 'Consistency (%)',
      data: JSON.parse(localStorage.getItem('TestConsistency') || '[]'),
      //data: [0, 39, 52, 11, 29, 43]
    },
    {
      name: 'Errors',
      data: JSON.parse(localStorage.getItem('TestErrors') || '[]'),
    },
    {
      name: 'CPM',
      data: JSON.parse(localStorage.getItem('TestCPM') || '[]'),
      //data: [0, 39, 52, 11, 29, 43]
    },
  ]);

  return (
    <div className="pl-16 pt-48 text-black">
      <Chart options={options} series={series} width={625} height={350}></Chart>
    </div>
  );
}
