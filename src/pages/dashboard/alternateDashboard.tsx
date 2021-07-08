import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { LaunchpadHeader } from './alternateComponents/LaunchpadHeader';
import { TrainingCardColumn } from './alternateComponents/TrainingCardColumn';

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

const Column = styled.div.attrs({
  className: `flex flex-col`,
})``;

const TopSectionContainer = styled.div.attrs({
  className: `container px-5 py-24 mx-auto`,
})``;

const HorizontalRule = styled.hr.attrs({
  className: `mx-16 border-gray-600 mb-16`,
})``;

const ComingSoonText = styled.p.attrs({
  className: `lg:w-2/3 mx-auto leading-relaxed text-gray-50 px-4`,
})``;

const ComingSoonTitle = styled.h1.attrs({
  className: `sm:text-3xl text-2xl font-medium title-font mb-4 text-green-500`,
})``;

const ComingSoonContainer = styled.div.attrs({
  className: `flex flex-col text-center w-full pb-20`,
})``;

const DashboardPageContainer = styled.section.attrs({
  className: `text-gray-600 body-font min-h-screen bg-[#121212]`,
})``;
