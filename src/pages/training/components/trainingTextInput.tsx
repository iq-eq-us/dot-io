import React, { ReactElement, useRef, useState, useEffect } from 'react';
import { useHUD } from '../../../hooks/useHUD';
import { useStoreActions, useStoreState } from '../../../store/store';
import { useCurrentTrainingScenario } from '../useCurrentTrainingScenario';

function TrainingTextInput(): ReactElement {
  const inputTextBoxRef = useRef<HTMLInputElement>(null);
  const [userEnteredText, setUserEnteredText] = useState('');

  const timeTakenToTypePreviousChord = useStoreState(
    (store) => store.timeTakenToTypePreviousChord,
  );

  const currentTrainingMode = useCurrentTrainingScenario();
  const isInAlphabetMode = currentTrainingMode === 'ALPHABET';
  const targetWord = useStoreState((store) => store.targetWord);

  const isErrorInUserEnteredText = targetWord
    ? !(isInAlphabetMode ? targetWord : targetWord + ' ')?.startsWith(
        userEnteredText,
      ) || false
    : false;

  const proceedToNextTargetString = useStoreActions(
    (store) => store.proceedToNextWord,
  );

  const refreshTrainingText = useStoreActions(
    (store) => store.resetTrainingText,
  );

  useEffect(() => {
    const checkToSeeIfProgramShouldProceedToNextWord = () => {
      const wordToCompare = isInAlphabetMode ? targetWord : targetWord + ' ';
      const userHasEnteredChordCorrectly = wordToCompare === userEnteredText;
      if (userHasEnteredChordCorrectly) {
        proceedToNextTargetString();
        setUserEnteredText('');
      }
    };

    checkToSeeIfProgramShouldProceedToNextWord();
  }, [userEnteredText, targetWord]);

  const setErrorOccurredWhileTypingTargetChord = useStoreActions(
    (store) => store.setErrorOccurredWhileAttemptingToTypeTargetChord,
  );
  if (isErrorInUserEnteredText) setErrorOccurredWhileTypingTargetChord(true);

  const shouldDisplayHUD = useHUD();

  return (
    <div className="flex flex-row items-center mt-8 w-3/4 mx-8">
      <p
        className="mr-4"
        style={{ whiteSpace: 'nowrap', color: 'skyblue', fontSize: '0.9rem' }}
      >
        Last:{' '}
        <span className={`${shouldDisplayHUD ? '' : 'invisible'}`}>
          {timeTakenToTypePreviousChord?.toFixed(0)}
        </span>
      </p>
      <input
        autoFocus
        ref={inputTextBoxRef}
        value={userEnteredText}
        onChange={(e) => setUserEnteredText(e.target.value)}
        type="text"
        placeholder="Type Here to Begin"
        className={`th-10 px-3 py-2 placeholder-white text-white relative bg-white rounded-l text-sm shadow outline-none focus:outline-none focus:ring w-full bg-gray-500 border-[1px] h-[40px] border-white border-solid ${
          isErrorInUserEnteredText ? 'bg-red-500' : ''
        }`}
      />
      <button
        className="h-10 shadow hover:bg-black focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-r border-[1px] border-white border-solid border-l-0 h-[40px]"
        type="button"
        onClick={() => {
          refreshTrainingText();
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
  );
}

export default TrainingTextInput;
