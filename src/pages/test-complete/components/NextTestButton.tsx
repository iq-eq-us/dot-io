import React, { ReactElement } from 'react';
import RefreshIcon from './RefreshIcon';
import ForwardIcon from '../../../../src/pages/test/components/ForwardIcon';
import { useStoreState, useStoreActions } from 'easy-peasy';

function NextTestButton(): ReactElement {
  const wordTestNumber = useStoreState((store: any) => store.wordTestNumber);
  const currentTrainingScenario = useStoreState(
    (store: any) => store.currentTrainingScenario,
  );
  const beginTraining = useStoreActions(
    (store: any) => store.beginTrainingMode,
  );
  const payload = [currentTrainingScenario, wordTestNumber];
  const setRestartTestMode = useStoreActions(
    (store) => store.setRestartTestMode,
  );
  const setModuleNumber = useStoreActions((store) => store.setModuleNumber);
  const moduleNumber = useStoreState((store) => store.moduleNumber);

  return (
    <button
      className="p-2 bg-[#333] flex w-10 rounded mt-4 m-2 cursor-pointer hover:bg-[#444] active:bg-[#222]"
      onClick={() => [
        sessionStorage.removeItem('tempTestDeIncrement'),
        setRestartTestMode(false),
        setModuleNumber(4),
        beginTraining(payload),
      ]}
    >
      <ForwardIcon />
    </button>
  );
}

export default NextTestButton;
