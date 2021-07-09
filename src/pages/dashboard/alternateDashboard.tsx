import React, { ReactElement } from 'react';
import { LaunchpadHeader } from './alternateComponents/LaunchpadHeader';
import { TrainingCardColumn } from './alternateComponents/TrainingCardColumn';
import {
  DashboardPageContainer,
  TopSectionContainer,
  Column,
  HorizontalRule,
  ComingSoonContainer,
  ComingSoonTitle,
  ComingSoonText,
} from './alternativeDashboard.styled';

const Dashboard = (): ReactElement => {
  return (
    <DashboardPageContainer>
      <TopSectionContainer>
        <LaunchpadHeader />

        <Column>
          <TrainingCardColumn />
        </Column>
      </TopSectionContainer>

      <HorizontalRule />

      <ComingSoonContainer>
        <ComingSoonTitle>Coming Soon...</ComingSoonTitle>
        <ComingSoonText>
          Charachorder is working daily to add and improve these training
          courses. Be sure to check back again soon to take your Charachorder
          skills to the next level!
        </ComingSoonText>
      </ComingSoonContainer>
    </DashboardPageContainer>
  );
};

export default Dashboard;
