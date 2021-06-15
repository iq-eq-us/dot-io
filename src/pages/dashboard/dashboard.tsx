import React from 'react';
import Row from '../../components/row';
import DashboardHeader from './components/DashboardHeader';
import DashboardPageContainer from './components/DashboardPageContainer';
import DashboardTrainingList from './components/DashboardTrainingList';
import { DashboardColumn } from './components/DashboardRow';

export default function Dashboard() {
  return (
    <DashboardPageContainer>
      <Row>
        <DashboardColumn>
          <DashboardHeader />
          <DashboardTrainingList />
        </DashboardColumn>
      </Row>
    </DashboardPageContainer>
  );
}
