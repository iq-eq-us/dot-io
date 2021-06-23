import React, { ReactElement } from 'react';
import type { TrainingScenario } from '../../../models/trainingScenario';
import { useStoreState } from '../../../store/store';
import { useCurrentTrainingScenario } from '../useCurrentTrainingScenario';

function TrainingTextPrompt(): ReactElement {
  const currentTrainingMode = useCurrentTrainingScenario();
  const isInAlphabetMode = currentTrainingMode === 'ALPHABET';
  const trainingText = useStoreState((store) => store.trainingText);
  const indexOfCurrentLineOfTrainingText = useStoreState(
    (store) => store.currentLineOfTrainingText,
  );
  const subindexOfCurrentLine = useStoreState(
    (store) => store.currentSubindexInTrainingText,
  );
  const targetWord = useStoreState((store) => store.targetWord);

  const previousText = getTextToShowBehindCurrentWord(
    indexOfCurrentLineOfTrainingText,
    subindexOfCurrentLine,
    trainingText,
    currentTrainingMode,
  );
  const afterText = getTextToShowAfterCurrentWord(
    indexOfCurrentLineOfTrainingText,
    subindexOfCurrentLine,
    trainingText,
    currentTrainingMode,
  );
  const nextLine = getNextLineOfTrainingText(
    indexOfCurrentLineOfTrainingText,
    trainingText,
    currentTrainingMode,
  );

  return (
    <div className="text-4xl mt-8 text-center">
      <div className="row flex-row">
        <p className="inline">
          {previousText}
          {!isInAlphabetMode && <span> </span>}
        </p>
        <p className="inline bg-white text-black">{targetWord}</p>
        <p className="inline">
          {!isInAlphabetMode && <span> </span>}
          {afterText}
        </p>
      </div>
      <div className="row flex-row">
        <p className="inline">{nextLine}</p>
      </div>
    </div>
  );
}

export default TrainingTextPrompt;

const getTextToShowBehindCurrentWord = (
  primaryIndex: number,
  subIndex: number,
  trainingText: string[][],
  trainingMode: TrainingScenario | void,
): string => {
  const previousLetters = trainingText?.[primaryIndex]?.slice(0, subIndex);
  return formatTrainingTextBasedOnTrainingMode(trainingMode, previousLetters);
};

const getTextToShowAfterCurrentWord = (
  primaryIndex: number,
  subIndex: number,
  trainingText: string[][],
  trainingMode: TrainingScenario | void,
): string => {
  const previousLetters = trainingText?.[primaryIndex]?.slice(
    subIndex + 1,
    trainingText[primaryIndex].length,
  );
  return formatTrainingTextBasedOnTrainingMode(trainingMode, previousLetters);
};

const getNextLineOfTrainingText = (
  primaryIndex: number,
  trainingText: string[][],
  trainingMode: TrainingScenario | void,
) => {
  return formatTrainingTextBasedOnTrainingMode(
    trainingMode,
    trainingText?.[primaryIndex + 1],
  );
};

const formatTrainingTextBasedOnTrainingMode = (
  trainingMode: TrainingScenario | void,
  text: string[],
) => {
  if (trainingMode === 'ALPHABET') return text?.join('');

  return text?.join(' ');
};
