import React, { ReactElement, useRef, useState } from 'react';
import { useHUD } from '../../../hooks/useHUD';
import usePopover from '../../../hooks/usePopover';
import { useStoreActions, useStoreState } from '../../../store/store';

function ChordTextInput(): ReactElement {
  const setStoreText = useStoreActions(
    (store: any) => store.setTypedTrainingText,
  );

  const textTyped = useStoreState((store: any) => store.typedTrainingText);
  const allTypedCharactersStore = useStoreState(
    (store: any) => store.allTypedCharactersStore,
  );
  const storedTestTextData = useStoreState(
    (store: any) => store.storedTestTextData,
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const regenerateTrainingText = useStoreActions(
    (store: any) => store.resetTrainingText,
  );
  const restartMode = useStoreState((store) => store.restartTestMode);
  const setRestartTestMode = useStoreActions(
    (store) => store.setRestartTestMode,
  );

  const setStartTimer = useStoreActions((store) => store.setStartTimer);
  const startTimer = useStoreState((store) => store.startTimer);

  const setTextPromptUnFocused = useStoreActions(
    (store) => store.setTextPromptUnFocused,
  );

  const trainingScenario = useStoreState(
    (store) => store.currentTrainingScenario,
  );
  const displayHUD = useHUD();
  const isShowingPortal = useStoreState(
    (store) => store.isDisplayingChordEditModal,
  );

  const set = useStoreActions((store: any) => store.setCompareText);
  const setGenerateThePreviousLine = useStoreActions(
    (store: any) => store.setGenerateThePreviousLine,
  );
  const generateThePreviousLine = useStoreActions(
    (store: any) => store.generateThePreviousLine,
  );

  const setS = useStoreState((store: any) => store.compareText);
  const currentLineOfTrainingText = useStoreState(
    (store: any) => store.currentLineOfTrainingText,
  );
  const currentSubindexInTrainingText = useStoreState(
    (store: any) => store.currentSubindexInTrainingText,
  );
  const currentTrainingScenario = useStoreState(
    (store: any) => store.currentTrainingScenario,
  );
  const targetCharacterIndex = useStoreState(
    (store: any) => store.targetCharacterIndex,
  );

  const { parentProps, Popper } = usePopover(
    'Generate a new set of training text.',
  );
  const [firstTyped, setFirstTyped] = useState(true); //This is used to see if the first word has been typed
  const yer = restartMode;

  const userIsTypingFirstChord =
    currentLineOfTrainingText === 0 &&
    currentSubindexInTrainingText === 0 &&
    targetCharacterIndex === 0;

  const wasPreviousTextIncorrect =
    currentTrainingScenario == 'ALPHABET'
      ? allTypedCharactersStore[allTypedCharactersStore.length - 1] !=
        storedTestTextData[allTypedCharactersStore.length - 1]
      : allTypedCharactersStore[allTypedCharactersStore.length - 1]?.slice(
          0,
          -1,
        ) != storedTestTextData[allTypedCharactersStore.length - 1];

  return (
    <div className="w-full flex flex-row items-end justify-center">
      {Popper}
      <span
        className={`mb-2 mr-2 text-white font-semibold ${
          !displayHUD && 'hidden'
        }`}
      />

      <input
        autoCorrect="off"
        autoCapitalize="none"
        className="relative bg-transparent caret-transparent focus:outline-none w-0 text-white font-bold text-center max-w-[60vw] border-b-2 border-solid border-transparent"
        ref={inputRef}
        id="chordsInput"
        autoFocus
        onBlurCapture={() => [
          setTextPromptUnFocused(true),
          setStartTimer(false),
        ]}
        onFocus={() =>
          isShowingPortal == true
            ? document.getElementById('chordsInput')?.focus()
            : document.getElementById('chordsInput')?.focus()
        }
        value={textTyped}
        onChange={(e) => {
          {
            userIsTypingFirstChord
              ? [
                  sessionStorage.setItem(
                    'timeThat',
                    JSON.stringify(performance.now()),
                  ),
                ]
              : '';
          } // This here logs the time that the first letter was pressed and sets the state variable to false
          e.target.value[0] == ' ' ? '' : setStoreText(e.target.value);
          {
            e.target.value[0] == ' ' ? '' : set(e.target.value);
          }
        }}
        //This code below triggers the go back
        onKeyDownCapture={(e) => {
          if (
            e.target.value.length == 0 &&
            currentSubindexInTrainingText == 0 &&
            targetCharacterIndex == 0 &&
            e.key === 'Backspace' &&
            currentLineOfTrainingText != 0 &&
            wasPreviousTextIncorrect
          )
            setGenerateThePreviousLine(true as boolean);
          //console.log('I should go back ' + generateThePreviousLine + ' ' + currentSubindexInTrainingText + ' ' + targetCharacterIndex + ' ' + currentLineOfTrainingText);
        }}
      />
    </div>
  );
}

export default ChordTextInput;
