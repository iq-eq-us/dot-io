import React, { ReactElement, useEffect } from 'react';
import store, { useStoreActions } from '../../../store/store';
import { PromptBeforeClosing } from '../../../components/PromptBeforeClosing';
import { useHistory } from 'react-router-dom';

export function ClosingPrompt(): ReactElement {
  const history = useHistory();
  const setStoredChordTrainingStats = useStoreActions(
    (store) => store.setTotalSavedTrainingStatistics,
  );

  const handleLocationChange = () => {
    // If the user navigates off of a training page, we want to save their data, but only if they have AutoWrite enabled
    const didLeaveTrainingSession = '/';
    const isAutoWriteEnabled = store.getState().trainingSettings.isAutoWrite;
    if (didLeaveTrainingSession && isAutoWriteEnabled)
      setStoredChordTrainingStats(store.getState().trainingStatistics);
  };

  useEffect(() => {
    const backListener = history.listen(handleLocationChange);

    return () => {
      backListener();
    };
  }, []);

  const handleAutowriteData = (isAutoWriteEnabled: boolean) => {
    // The other way we save data is if the user exits out of the tab entirely, which is done here, but again only if they have AutoWrite enabled
    if (isAutoWriteEnabled)
      setStoredChordTrainingStats(store.getState().trainingStatistics);
  };

  return <PromptBeforeClosing onClose={handleAutowriteData} />;
}
