import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { TopSectionContainer } from '../analyticalDashboard.styled';
import { DashboardStaticStats } from './AnalyticalDashboardStaticStat';
import { AnalyticalDashboardAccAndConOverall } from './AnalyticalDashboardAccAndConOverall';
import VerticalStatsLetters from './VerticalStatsLetters';
import VerticalStatsWords from './VerticalStatsWords';
import VerticalStatsTrigrams from './VerticalStatsTrigrams';

export function CPMdashboardAnalytics(): ReactElement {
  const [currentPage, setCurrentPage] = useState('letters');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="flex">
        <div className="pt-12 h-96 w-96">
          <DashboardStaticStats />
        </div>
        <div className="flex flex-col">
          <WordPageContainer>
            <TierLetters
              className={
                currentPage === 'letters'
                  ? 'text-white text-2xl font-semibold'
                  : 'text-gray-500 text-xl'
              }
            >
              <HoverOverall onClick={() => handlePageChange('letters')}>
                Letters
              </HoverOverall>
            </TierLetters>
            <TierLetters
              className={
                currentPage === 'trigrams'
                  ? 'text-white text-2xl font-semibold'
                  : 'text-gray-500 text-xl'
              }
            >
              <HoverOverall onClick={() => handlePageChange('trigrams')}>
                Trigrams
              </HoverOverall>
            </TierLetters>
            <TierLetters
              className={
                currentPage === 'words'
                  ? 'text-white text-2xl font-semibold'
                  : 'text-gray-500 text-xl'
              }
            >
              <HoverOverall onClick={() => handlePageChange('words')}>
                Words
              </HoverOverall>
            </TierLetters>
          </WordPageContainer>
          {currentPage === 'letters' && (
            <h1 className="h-96 w-96 text-center">
              <VerticalStatsLetters />
            </h1>
          )}
          {currentPage === 'words' && (
            <h1 className="h-96 w-96 text-center">
              <VerticalStatsWords />
            </h1>
          )}
          {currentPage === 'trigrams' && (
            <h1 className="h-96 w-96 text-center">
              <VerticalStatsTrigrams />
            </h1>
          )}
        </div>
      </div>
      <div className="pt-42">
        <AnalyticalDashboardAccAndConOverall />
      </div>
    </div>
  );
}

const WordPageContainer = styled.div.attrs({
  className: `flex flex-row space-x-12`,
})``;

const TierLetters = styled.div.attrs({
  className: `text-white text-xl font-normal font-mono pb-3 pl-3`,
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
