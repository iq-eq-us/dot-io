import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { TopSectionContainer } from '../analyticalDashboard.styled';
import { DashboardStaticStats } from './AnalyticalDashboardStaticStat';
import { AnalyticalDashboardAccAndConOverall } from './AnalyticalDashboardAccAndConOverall';
import VerticalStats from './VerticalStats';

export function CPMdashboardAnalytics(): ReactElement {
  return (
    <div>
      <div className="flex">
        <div className="pt-12 h-96 w-96">
          <DashboardStaticStats />
        </div>
        <h1 className="h-96 w-96 text-center border-2">
          <VerticalStats />
        </h1>
      </div>
      <div>
        <AnalyticalDashboardAccAndConOverall />
      </div>
    </div>
  );
}
