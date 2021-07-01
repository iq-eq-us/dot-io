import React, { ReactElement } from 'react';
import styled from 'styled-components';
import comingSoonImageTop from '../../../assets/ComingSoonTop.png';
import comingSoonImageRight from '../../../assets/ComingSoonRight.png';
import DashboardStatisticsTable from './DashboardStatisticsTable';
import { extraLarge, large } from '../../../helpers/breakpoints';

function DashboardGrid(): ReactElement {
  return (
    <GridContainer>
      <TopGridArea>
        <FitImageButMaintainAspectRatio
          src={comingSoonImageTop}
          alt="Coming soon text"
        />
      </TopGridArea>

      <BottomLeftGridArea>
        <DashboardStatisticsTable />
      </BottomLeftGridArea>

      <BottomRightGridArea>
        <FitImageButMaintainAspectRatio
          src={comingSoonImageRight}
          alt="Coming soon text"
        />
      </BottomRightGridArea>
    </GridContainer>
  );
}

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 55% 35%;
  grid-template-rows: 40vh 60vh;
  gap: 20px 20px;
  grid-template-areas:
    'Top Top'
    'BottomLeft BottomRight';

  @media only screen and (max-width: ${extraLarge}) {
    grid-template-columns: 55% 35%;
    grid-template-rows: 40vh 60vh;
    grid-template-areas:
      'Top Top'
      'BottomLeft BottomLeft';
  }

  @media only screen and (max-width: ${large}) {
    grid-template-areas: 'BottomLeft';
    grid-template-rows: 100vh;
    grid-template-columns: 100%;
    margin-top: 48px;
    margin-right: 12px;
  }
`;

const TopGridArea = styled.div`
  grid-area: Top;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BottomLeftGridArea = styled.div`
  grid-area: BottomLeft;
  color: black;
`;

const BottomRightGridArea = styled.div`
  grid-area: BottomRight;

  @media only screen and (max-width: ${extraLarge}) {
    display: none;
  }
`;

const FitImageButMaintainAspectRatio = styled.img`
  height: 90%;
  max-height: 100%;
`;

export default DashboardGrid;
