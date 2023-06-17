import React, { ReactElement } from 'react';
import RefreshIcon from './RefreshIcon';
import EditIcon from './EditIcon';
import { useStoreState, useStoreActions } from 'easy-peasy';

function OpenEditChordModal(): ReactElement {
  const beginTraining = useStoreActions(
    (store: any) => store.beginTrainingMode,
  );
  const trainingSceneario = useStoreState(
    (store) => store.currentTrainingScenario,
  );
  const currentWordTestNumber = useStoreState((store) => store.wordTestNumber);
  const setRestartTestMode = useStoreActions(
    (store) => store.setRestartTestMode,
  );
  const mode = useStoreState((store) => store.restartTestMode);

  const payload = [];
  payload.push(trainingSceneario);
  payload.push(currentWordTestNumber);
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
      <EditIcon />
    </button>
  );
}

export default OpenEditChordModal;
