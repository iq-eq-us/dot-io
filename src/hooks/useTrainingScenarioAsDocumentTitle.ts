import React from 'react';
import { useStoreState } from '../store/store';

export default function useTrainingScenarioAsDocumentTitle(): void {
  const currentTrainingScenario = useStoreState(
    (store) => store.currentTrainingScenario,
  );
  React.useEffect(() => {
    const scenario = String(currentTrainingScenario);
    document.title =
      scenario.substr(0, 1) +
      scenario.substr(1, scenario.length - 1).toLowerCase();
  }, []);
}
