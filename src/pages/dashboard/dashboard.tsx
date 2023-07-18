import React, { ReactElement } from 'react';
import {
  DashboardPageContainer,
  TopSectionContainer,
  Column,
} from './dashboard.styled';
import { CardDataRowDisplay } from './components/CardDataRowDisplay';
import { Graph } from '../../pages/manager/components/chordGraphs';

// Change this variable to true to display Improving, Code Authority, and Code Launch branding material at the bottom of the dashboard screen
const SHOULD_DISPLAY_BRANDING_MATERIAL = true;

/**
 * This is the main dashboard page. It is responsible for displaying all of the training cards, statistics tables, etc.
 * The styled components for this page are located in the dashboard.styled.tsx file in the same directory.
 */
const Dashboard = (): ReactElement => {
  React.useEffect(() => {
    document.title = 'dot i/o Profile';
  }, []);

  return (
    <DashboardPageContainer>
      <TopSectionContainer>
        <Column>
          <Graph />

          <CardDataRowDisplay />
          {/* This is the most important component in the dashboard. It includes the entire list of training module cards. */}
        </Column>
      </TopSectionContainer>
    </DashboardPageContainer>
  );
};

export default Dashboard;
