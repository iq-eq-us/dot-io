import React, { ReactElement, useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store/store';
import StatisticsTable from './StatisticsTable';
import { flashcardStats } from '../../../models/flashCardStatistics';

export function StatisticsIcon(): ReactElement {
  const setTrainingSettings = useStoreActions(
    (store) => store.setTrainingSettings,
  );
  const trainingSettings = useStoreState((store) => store.trainingSettings);

  // State to control the visibility of the statistics table
  const [showStatisticsTable, setShowStatisticsTable] = useState(false);

  const toggleStatisticsTable = () => {
    setShowStatisticsTable(!showStatisticsTable);
  };

  const rightSideStyles = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '300px', // Adjust the width as needed
    height: '100%', // Adjust the height as needed
    backgroundColor: 'white',
    boxShadow: '-3px 0 10px rgba(0, 0, 0, 0.2)', // Optional: Add a shadow to the right side
    zIndex: 1000, // Make sure it's above other content
    // Add any other styles as needed
  };

  return (
    <div>
      <svg
        onClick={toggleStatisticsTable}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-bar-chart-2 lg:hidden feather feather-settings hover:text-gray-400 text-white cursor-pointer active:text-gray-700"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>

      {showStatisticsTable && (
        <StatisticsTable flashcardStats={flashcardStats} />
      )}
    </div>
  );
}
