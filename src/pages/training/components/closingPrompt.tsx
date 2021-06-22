import React, { ReactElement } from 'react';
import store, { useStoreActions } from '../../../store/store';
import { PromptBeforeClosing } from '../../../components/promptBeforeClosing';

export function ClosingPrompt(): ReactElement {
  const setStoredChordTrainingStats = useStoreActions(
    (store) => store.setTotalSavedTrainingStatistics,
  );

  const handleAutowriteData = (isAutoWriteEnabled: boolean) => {
    if (isAutoWriteEnabled)
      setStoredChordTrainingStats(store.getState().trainingStatistics);
  };

  return <PromptBeforeClosing onClose={handleAutowriteData} />;
}
