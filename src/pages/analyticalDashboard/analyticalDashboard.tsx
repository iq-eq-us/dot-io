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
      <AnalyticalDashboardPageContainer>
        <WordPageContainer>
          <PageTextOverall
            className={
              currentPage === 'overall'
                ? 'text-white text-4xl'
                : 'text-gray-500 text-3xl'
            }
          >
            <HoverOverall onClick={() => handlePageChange('overall')}>
              Overall
            </HoverOverall>
          </PageTextOverall>
          <PageTextMod
            className={
              currentPage === 'module'
                ? 'text-white text-4xl'
                : 'text-gray-500 text-3xl'
            }
          >
            <HoverMod onClick={() => handlePageChange('module')}>
              Module
            </HoverMod>
          </PageTextMod>
        </WordPageContainer>
        <div className="pl-48">
          <div className="w-[1070px] h-px border-2 border-zinc-300"></div>
        </div>
        {currentPage === 'overall' && (
          <TopSectionContainer>
            <AnalyticalDashboardHeader />
            <Hexbin />
            <StreakHeatmap />
          </TopSectionContainer>
        )}
        {currentPage === 'module' && (
          <TopSectionContainer>
            <div className="w-84 text-center leading-relaxed text-4xl text-gray-300 font-medium font-mono">
              CPM Dashboard
            </div>
            <AnalyticalDashboardAccAndConOverall />
          </TopSectionContainer>
        )}
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
