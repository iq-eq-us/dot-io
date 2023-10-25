import React, { ReactElement, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import store, { useStoreState, useStoreActions } from '../../../store/store';

export function AnalyticalDashboardAccAndConOverall(): ReactElement {
  console.log(
    'Getting stored accuracy list is: ' + store.getState().currConsistency,
  );

  const [options, setOptions] = useState({
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
      text: 'Overall Statistics',
      align: 'left',
      offsetY: 25,
      offsetX: 20,
      style: {
        color: '#FFFFFF',
      },
    },
    subtitle: {
      text: 'Accuracy & Consistency',
      offsetY: 55,
      offsetX: 20,
      style: {
        color: '#FFFFFF',
      },
    },
    labels: JSON.parse(localStorage.getItem('TestDate5') || '[]'),
    xaxis: {
      tooltip: {
        enabled: false,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -20,
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Accuracy (%)',
      data: JSON.parse(localStorage.getItem('TestAccuracy5') || '[]'),
      //data: [0, 39, 52, 11, 29, 43]
    },
    {
      name: 'Consistency (%)',
      data: JSON.parse(localStorage.getItem('TestConsistency5') || '[]'),
      //data: [0, 39, 52, 11, 29, 43]
    },
    {
      name: 'Errors',
      data: JSON.parse(localStorage.getItem('TestErrors5') || '[]'),
    },
  ]);

  return (
    <div className="pl-16 pt-72">
      <Chart options={options} series={series} width={700} height={350}></Chart>
    </div>
  );
}
