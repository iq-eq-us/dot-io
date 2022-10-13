import React, { ReactElement } from 'react';
import { useCurrentTrainingScenario } from '../../../hooks/useCurrentTrainingScenario';
import { useStoreState } from '../../../store/store';

export function PreviousTestTableTitle(): ReactElement {

  return (
    <span className="text-white text-2xl font-semibold">
      Statistics
    </span>
  );
}
