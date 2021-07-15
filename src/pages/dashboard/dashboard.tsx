import React, { ReactElement } from 'react';
import { LaunchpadHeader } from './components/LaunchpadHeader';
import { TrainingCardColumn } from './components/TrainingCardColumn';
import {
  DashboardPageContainer,
  TopSectionContainer,
  Column,
  HorizontalRule,
  ComingSoonContainer,
  ComingSoonTitle,
  ComingSoonText,
} from './dashboard.styled';
import { CardDataRowDisplay } from './components/CardDataRowDisplay';
import { BrandingMaterial } from './components/BrandingMaterial';
import { CopyrightNotice } from './components/CopyrightNotice';

const SHOULD_DISPLAY_BRANDING_MATERIAL = false;

const Dashboard = (): ReactElement => {
  return (
    <DashboardPageContainer>
      <TopSectionContainer>
        <LaunchpadHeader />

        <Column>
          <CardDataRowDisplay />
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

      {SHOULD_DISPLAY_BRANDING_MATERIAL && <BrandingMaterial />}

      <CopyrightNotice lightBg={SHOULD_DISPLAY_BRANDING_MATERIAL} />
    </DashboardPageContainer>
  );
};

export default Dashboard;
