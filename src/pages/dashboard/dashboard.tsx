import React, { ReactElement } from 'react';
import Row from '../../components/row';
import DashboardHeader from './components/DashboardHeader';
import DashboardPageContainer from './components/DashboardPageContainer';
import DashboardTrainingList from './components/DashboardTrainingList';
import { DashboardColumn } from './components/DashboardRow';
import { Link } from 'react-router-dom';

const Dashboard = (): ReactElement => {
  return (
    <DashboardPageContainer>
      <Row>
        <DashboardColumn>
          <DashboardHeader />
          <DashboardTrainingList />

          <Link to="altDash">
            <button className="mt-4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Alternate Dashboard
            </button>
          </Link>

          <Link to="training">
            <button className="mt-4 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Training
            </button>
          </Link>
        </DashboardColumn>
      </Row>
    </DashboardPageContainer>
  );
};

export default Dashboard;
