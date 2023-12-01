import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { ChMStaticStat } from './ChMStaticStat';
import VerticalStatsChMTier from './VeritcalStatsChMTier';

export function ChMdashboardAnalytics(): ReactElement {
  const [currentPage, setCurrentPage] = useState('letters');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="flex">
        <div className="pt-12 h-96 w-96 ">
          <ChMStaticStat />
        </div>
        <div className="flex flex-col pb-28">
          <WordPageContainer>
            <TierLetters
              className={
                currentPage === 'letters'
                  ? 'text-white text-2xl font-semibold'
                  : 'text-gray-500 text-xl'
              }
            >
              <HoverOverall onClick={() => handlePageChange('letters')}>
                English-300
              </HoverOverall>
            </TierLetters>
          </WordPageContainer>
          {currentPage === 'letters' && (
            <h1 className="h-96 w-96 text-center">
              <VerticalStatsChMTier />
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

const WordPageContainer = styled.div.attrs({
  className: `flex flex-row space-x-12`,
})``;

const TierLetters = styled.div.attrs({
  className: `text-white text-xl font-normal font-mono pb-3 pl-32`,
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
