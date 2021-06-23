import type { TrainingScenario } from '../../models/trainingScenario';
import { useHistory } from 'react-router-dom';
import { ROUTER_PATHS } from '../../components/router';

export const useCurrentTrainingScenario = (): TrainingScenario | void => {
  const history = useHistory();

  return getTrainingModeFromURL(history.location.pathname);
};

export const getCurrentTrainingScenario = (): TrainingScenario | void => {
  return getTrainingModeFromURL(window.location.href);
};

const getTrainingModeFromURL = (url: string): TrainingScenario | void => {
  if (url.endsWith(ROUTER_PATHS.alphabetTraining)) return 'ALPHABET';
  else if (url.endsWith(ROUTER_PATHS.trigramTraining)) return 'TRIGRAM';
  else if (url.endsWith(ROUTER_PATHS.chordTraining)) return 'CHORDING';
  else if (url.endsWith(ROUTER_PATHS.lexicalTraining)) return 'LEXICAL';
};
