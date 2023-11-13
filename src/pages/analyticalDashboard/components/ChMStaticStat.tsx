import React, { ReactElement, useState } from 'react';
import Chart from 'react-apexcharts';

export function ChMStaticStat() {
  const chordsMastered = JSON.parse(
    localStorage.getItem('ChMChordsMastered') || '0',
  );
  //can be changed based off of the goal that we want to set
  const intProgBar = parseInt(((chordsMastered / 100) * 100).toFixed(0));

  const [options, setOptions] = useState({
    labels: [`ChM Chords Mastered: ${chordsMastered}`],
    //colors: ['#253f4b'],
    colors: ['#1d6bc4'],
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#222424',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: 5,
            show: true,
            color: '#fff',
            fontSize: '17px',
          },
          value: {
            formatter: function (val) {
              return parseInt(val);
            },
            color: '#111',
            fontSize: '1px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'linear',
        shadeIntensity: 0.25,
        //gradientToColors: ['#acc8d7'],
        gradientToColors: ['rgba(0,246,120,0.38)'],
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
  const [series, setSeries] = useState([intProgBar]);
  return (
    <div className="radialbar pr-24">
      <Chart options={options} series={series} type="radialBar" height="380" />
    </div>
  );
}
