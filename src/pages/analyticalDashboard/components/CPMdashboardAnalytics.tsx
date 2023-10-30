import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { TopSectionContainer } from '../analyticalDashboard.styled';
import { DashboardStaticStats } from './AnalyticalDashboardStaticStat';
import { AnalyticalDashboardAccAndConOverall } from './AnalyticalDashboardAccAndConOverall';

export function CPMdashboardAnalytics(): ReactElement {
  return (
    <div>
      <div className="flex">
        <div className="pt-12 h-96 w-96">
          <DashboardStaticStats />
        </div>
        <h1 className="h-96 w-96 text-center">[LETTER TIER WILL GO HERE]</h1>
      </div>
      <div>
        <AnalyticalDashboardAccAndConOverall />
      </div>
    </div>
  );
}
