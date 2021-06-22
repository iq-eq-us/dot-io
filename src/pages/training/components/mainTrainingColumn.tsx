import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { useStoreState, useStoreActions } from '../../../store/store';
import styled from 'styled-components';
import ProgressBar from './progressBar';
import CharachorderOverlay from './charachorderOverlay';
import type { TrainingScenario } from '../../../models/trainingScenario';
import { useCurrentTrainingScenario } from '../useCurrentTrainingScenario';

export default function MainTrainingColumn(): ReactElement {
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

  const [userEnteredText, setUserEnteredText] = useState('');

  const proceedToNextTargetString = useStoreActions(
    (store) => store.proceedToNextWord,
  );
  const inputTextBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const wordToCompare = isInAlphabetMode ? targetWord : targetWord + ' ';
    const userHasEnteredChordCorrectly = wordToCompare === userEnteredText;
    if (userHasEnteredChordCorrectly) {
      proceedToNextTargetString();
      setUserEnteredText('');
    }
  }, [userEnteredText, targetWord]);

  const isErrorInUserEnteredText =
    !(isInAlphabetMode ? targetWord : targetWord + ' ')?.startsWith(
      userEnteredText,
    ) || false;

  const setErrorOccurredWhileTypingTargetChord = useStoreActions(
    (store) => store.setErrorOccurredWhileAttemptingToTypeTargetChord,
  );
  if (isErrorInUserEnteredText) setErrorOccurredWhileTypingTargetChord(true);

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

  const timeTakenToTypePreviousChord = useStoreState(
    (store) => store.timeTakenToTypePreviousChord,
  );

  return (
    <LocalColumn>
      <h1 className="text-4xl mb-4">Lvl: 0</h1>
      <div className="flex flex-row">
        <div className="flex flex-col items-center">
          <p>Letters Conquered</p>
          <p>0</p>
        </div>
        <div className="flex flex-col px-8" style={{ width: '500px' }}>
          <ProgressBar progress={40} />
          <p>∞ wpm</p>
        </div>
        <div className="flex flex-col items-center">
          <p>To Next Level</p>
          <p>0</p>
        </div>
      </div>

      <div className="text-4xl mt-8">
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

      <div className="flex flex-row items-center mt-8 w-3/4 mx-8">
        <p className="mr-4" style={{ whiteSpace: 'nowrap' }}>
          Last: {timeTakenToTypePreviousChord?.toFixed(0)}
        </p>
        <input
          autoFocus
          ref={inputTextBoxRef}
          value={userEnteredText}
          onChange={(e) => setUserEnteredText(e.target.value)}
          type="text"
          placeholder="Type Here to Begin"
          className={`th-10 px-3 py-2 placeholder-white text-white relative bg-white rounded-l text-sm shadow outline-none focus:outline-none focus:ring w-full bg-gray-500 border-[1px] border-white border-solid ${
            isErrorInUserEnteredText ? 'bg-red-500' : ''
          }`}
        />
        <button
          className="h-10 shadow hover:bg-black focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-r border-[1px] border-white border-solid border-l-0"
          type="button"
          onClick={() => {
            setUserEnteredText('');
            inputTextBoxRef?.current?.focus();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-refresh-ccw"
          >
            <polyline points="1 4 1 10 7 10"></polyline>
            <polyline points="23 20 23 14 17 14"></polyline>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
          </svg>
        </button>
      </div>

      <CharachorderOverlay />
    </LocalColumn>
  );
}

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

const LocalColumn = styled.div.attrs({
  className: 'flex flex-col items-center mt-4',
})`
  width: 1000px;
`;
