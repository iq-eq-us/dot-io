import React, { ReactElement, useState } from 'react';
import { useStoreState } from '../../../store/store';
import sessionStatHistoryTest from '../components/testSessionStats';

// Streak heatmap is a visual representation of practice streak.

sessionStatHistoryTest();

export function StreakHeatmap(): ReactElement {
  return (
    <div>
      <p>Streak Heatmap</p>
    </div>
  );
}
