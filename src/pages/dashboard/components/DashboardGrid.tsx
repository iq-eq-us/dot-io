import React, { ReactElement } from 'react';
import styled from 'styled-components';
import comingSoonImageTop from '../../../assets/ComingSoonTop.png';
import comingSoonImageRight from '../../../assets/ComingSoonRight.png';
import DashboardStatisticsTable from './DashboardStatisticsTable';

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
  grid-template-columns: 1.95fr 1fr;
  grid-template-rows: 0.9fr 1fr;
  gap: 20px 20px;
  grid-template-areas:
    'Top Top'
    'BottomLeft BottomRight';
`;

const TopGridArea = styled.div`
  grid-area: Top;
`;

const BottomLeftGridArea = styled.div`
  grid-area: BottomLeft;
  color: black;
`;

const BottomRightGridArea = styled.div`
  grid-area: BottomRight;
`;

const FitImageButMaintainAspectRatio = styled.img`
  height: 100%;
  max-height: 100%;
`;

export default DashboardGrid;
