import React, { ReactElement } from 'react';
import Row from '../../components/row';
import DashboardHeader from './components/DashboardHeader';
import DashboardPageContainer from './components/DashboardPageContainer';
import DashboardTrainingList from './components/DashboardTrainingList';
import { DashboardColumn } from './components/DashboardRow';
import DashboardGrid from './components/DashboardGrid';

const Dashboard = (): ReactElement => {
  return (
    <DashboardPageContainer>
      <Row>
        <DashboardColumn>
          <DashboardHeader />
          <DashboardTrainingList />
        </DashboardColumn>

        <DashboardGrid />
      </Row>
    </DashboardPageContainer>
  );
};

export default Dashboard;
