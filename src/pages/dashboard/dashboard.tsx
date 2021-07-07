import React, { ReactElement } from 'react';
import Row from '../../components/row';
import DashboardHeader from './components/DashboardHeader';
import DashboardPageContainer from './components/DashboardPageContainer';
import DashboardTrainingList from './components/DashboardTrainingList';
import { DashboardRow } from './components/DashboardRow';
import DashboardGrid from './components/DashboardGrid';

const Dashboard = (): ReactElement => {
  return (
    <DashboardPageContainer>
      <Row>
        <DashboardRow>
          <DashboardHeader />
          <DashboardTrainingList />
        </DashboardRow>

        <DashboardGrid />
      </Row>
    </DashboardPageContainer>
  );
};

export default Dashboard;
