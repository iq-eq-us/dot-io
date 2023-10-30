import React, { ReactElement, useState } from 'react';
import '../analyticalDashboard.css';
import Chart from 'react-apexcharts';

export function DashboardStaticStats(): ReactElement {
  const tSpeed = JSON.parse(localStorage.getItem('CPMTopSpeed') || '0');
  const percentSpeed = ((tSpeed / 1250) * 100).toFixed(0);
  console.log('Percent Speed' + percentSpeed);
  const progressBar = (815 - 815 * (percentSpeed / 100)).toFixed(0);
  console.log('Prg Bar: ' + progressBar);
  return (
    <div class="skill">
      <div class="outer">
        <div class="inner">
          <div className="text-center text-[#777272] font-semibold font-mono">
            CPM Top Speed:
          </div>
          <div className="text-center text-white font-medium font-mono pt-3">
            {tSpeed} CPM
          </div>
        </div>
      </div>
      <svg
        id="grad"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="280px"
        height="280px"
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stop-color="#D2DBFD" />
            <stop offset="50%" stop-color="#777272" />
            <stop offset="100%" stop-color="#5E5858" />
          </linearGradient>
        </defs>
        <circle
          id="circle1"
          cx="140"
          cy="140"
          r="130"
          stroke-linecap="round"
          style={{ strokeDashoffset: progressBar }}
        />
      </svg>
    </div>
  );
}
