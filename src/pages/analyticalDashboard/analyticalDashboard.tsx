import React, { ReactElement, useEffect, useState } from 'react';
import {
  AnalyticalDashboardPageContainer,
  TopSectionContainer,
} from './analyticalDashboard.styled';
import { AnalyticalDashboardHeader } from './components/AnalyticalDashboardHeader';
import styled from 'styled-components';
import { AnalyticalDashboardAccAndConOverall } from './components/AnalyticalDashboardAccAndConOverall';
// import { AnalyticalDashboardPageToggle } from './components/AnalyticalDashboardPageToggle';
import { StreakHeatmap } from './components/StreakHeatmap';
import { Hexbin } from './components/Hexbin';
import { DashboardStaticStats } from './components/AnalyticalDashboardStaticStat';
import { useStoreActions } from '../../store/store';

/**
 * This is the analytical dashboard page. It is responsible for displaying all user-specific stats.
 * The styled components for this page are located in the analyticalDashboard.styled.tsx file in the same directory.
 */

const AnalyticalDashboard = (): ReactElement => {
  React.useEffect(() => {
    document.title = 'dot i/o Dashboard';
  }, []);

  const [currentPage, setCurrentPage] = useState('overall');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <AnalyticalDashboardPageContainer className="h-full min-h-screen">
        <TopSectionContainer>
          <Hexbin />
          <StreakHeatmap />
        </TopSectionContainer>
      </AnalyticalDashboardPageContainer>
    </React.Fragment>
  );
};

export default AnalyticalDashboard;

{
  /* <React.Fragment>
      <AnalyticalDashboardPageContainer>
        <TopSectionContainer>
          <AnalyticalDashboardPageToggle />
          <AnalyticalDashboardHeader />
        </TopSectionContainer>
      </AnalyticalDashboardPageContainer>
    </React.Fragment> */
}

const WordPageContainer = styled.div.attrs({
  className: `flex flex-row space-x-96 space-x-[500px] pl-80 pt-16`,
})``;

const PageTextOverall = styled.div.attrs({
  className: `text-white text-4xl font-normal font-mono`,
})``;

const PageTextMod = styled.div.attrs({
  className: `text-gray-300 text-4xl font-normal font-mono`,
})``;

const HoverOverall = styled.div`
  &:hover {
    color: #d1d5db;
    transition: 0.3s ease in;
  }
`;

const HoverMod = styled.div`
  &:hover {
    color: white;
    transition: 0.3s ease in;
  }
`;

const AnalyticalDashboardPageContainer = styled.div`
  background-color: #222424;
`;

// const AnalyticalDashboardPageContainer = styled.div.attrs({
//   className: `border-4 border-red-500 flex items-center bg-transparent`,
// })``;
