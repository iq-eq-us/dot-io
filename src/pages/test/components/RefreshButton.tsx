import React, { ReactElement } from 'react';
import RefreshIcon from './RefreshIcon';
import ForwardIcon from './ForwardIcon';
import { useStoreState, useStoreActions } from 'easy-peasy';

function RefreshButton(): ReactElement {
  const wordTestNumber = useStoreState((store: any) => store.wordTestNumber);
  const beginTraining = useStoreActions(
    (store: any) => store.beginTrainingMode,
  );
  const trainingSceneario = useStoreState(
    (store) => store.currentTrainingScenario,
  );
  const setRestartTestMode = useStoreActions(
    (store) => store.setRestartTestMode,
  );

  const payload = [];
  payload.push(trainingSceneario);
  function letsGoAgain() {
    sessionStorage.setItem('Refresh', JSON.stringify(1));
    sessionStorage.removeItem('CutomTierTestValue');
    sessionStorage.removeItem('tempTestDeIncrement');
    setRestartTestMode(true);
    beginTraining(payload);
  }

  return (
    <button
      className="p-2 bg-[#333] flex  w-10 rounded mt-4 m-2 cursor-pointer hover:bg-[#444] active:bg-[#222]"
      onClick={() => {
        letsGoAgain();
      }}
    >
      <RefreshIcon />
    </button>
  );
}

export default RefreshButton;
