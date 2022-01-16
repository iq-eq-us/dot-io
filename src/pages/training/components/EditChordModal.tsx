import React, { ReactElement, useRef, useState } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { chordLibrary, ChordLibraryRecord } from '../../../data/chordLibrary';
import { useCurrentTrainingScenario } from '../../../hooks/useCurrentTrainingScenario';
import usePopover from '../../../hooks/usePopover';
import type { TrainingScenario } from '../../../models/trainingScenario';
import { useStoreActions, useStoreState } from '../../../store/store';
import { getGlobalDictionaries, setGlobalDictionaries } from '../../../store/trainingStore/actions';
import HelpCircleIcon from './HelpCircleIcon';
import { ThirdButton } from './ThirdButton';
import { XIcon } from './XIcon';
import {pickerV1, pickerLite} from '../../../models/keyboardDropDownFolder/keyboardDropDown';


function EditChordsModal(): ReactElement {
  const isShowingPortal = useStoreState(
    (store) => store.isDisplayingChordEditModal,
  );
  const trainingMode = useStoreState((store) => store.currentTrainingScenario);
  const [chords, setChords] = useState(getDefaultChords(trainingMode));
  const [tempChords, setTempChords] = useState(chords);
  const inputRef = useRef<HTMLInputElement>(null);
  const trainingScenario = useCurrentTrainingScenario();

  const updateChordsUsedInStore = useStoreActions(
    (store) => store.updateChordsUsedForTraining,
  );
  const togglePortal = useStoreActions((store) => store.toggleChordEditModal);

  const removeChord = (index: number) => {
    setTempChords(
      tempChords
        .map((c, i) => (i === index ? undefined : c))
        .filter((item): item is string => typeof item === 'string'),
    );
  };

  const setInputValue = (value: string) => {
    if (inputRef.current) inputRef.current.value = value;
  };

  const phraseSeparator = " ";
  const spaceSeparator = "_";

  const canCloseModal =
    trainingScenario === 'LEXICAL' || trainingScenario === 'TRIGRAM';

  const addChord = (chord?: string) => {
    const parts = chord?.split(phraseSeparator).map((e) => e.replaceAll(spaceSeparator, " ")) || [];
    if (parts.length) {
      setTempChords(
        [...tempChords, ...parts]
      );
      setInputValue('');
    }
  };

  const clearChords = () => {
    setTempChords([]);
  }

  const restoreDefaults = () => {
    setTempChords(getDefaultChordsFromChordLibrary(trainingMode));
  };

  const cancelEditing = () => {
    if (canCloseModal) {
      setTempChords(chords);
      togglePortal();
      setInputValue('');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupIntoPairs = (array: any[]) => {
    if (array.length < 2) {
      return array;
    } else {
      return array
        .map((e, i) =>
          i < array.length - 1 ? [e + ' ' + array[i + 1]] : undefined,
        )
        .filter((e) => !!e);
    }
  };

  const confirmEditing = () => {
    if (typeof trainingScenario === "string")
      setGlobalDictionaries({
        ...getGlobalDictionaries(),
        [trainingScenario]: generateNewChordRecord(tempChords),
      });
      
    let chordsToUse = [];
    const shouldGroupChords = trainingScenario === 'SUPERSONIC';
    if (shouldGroupChords) chordsToUse = groupIntoPairs(tempChords);
    else chordsToUse = tempChords;

    const hasChangeBeenMade =
      JSON.stringify(tempChords) !== JSON.stringify(chords) ||
      trainingScenario === 'SUPERSONIC';

    if (hasChangeBeenMade) {
      const newChordLibraryRecord = generateNewChordRecord(chordsToUse);
      updateChordsUsedInStore(newChordLibraryRecord);
      setChords(tempChords);
      setInputValue('');
    }

    togglePortal();
  };

  const generateNewChordRecord = (chords: string[]): ChordLibraryRecord => {
    const newChordLibraryRecord: ChordLibraryRecord = {};
    chords.forEach((chord) => {
      if (chordLibrary.all[chord])
        newChordLibraryRecord[chord] = chordLibrary.all[chord];
      else newChordLibraryRecord[chord] = [];
    });
    return newChordLibraryRecord;
  };

  const addChords = () => {
    if (inputRef.current?.value) addChord(inputRef.current?.value);
  };

  const { parentProps, Popper } = usePopover(
    `You can enter multiple chords at once by separating them with a "${phraseSeparator}" character. Create multi-word chords by separating words with a "${spaceSeparator}"`,
  );

  return (
    <div>
      {isShowingPortal && (
        <Portal>
          <div
            onClick={cancelEditing}
            className="fixed inset-0 width-screen height-screen bg-opacity-70 bg-black flex items-center justify-center"
          >
            <div
              onClick={stopPropagation}
              className="w-[600px] max-w-[100vw] bg-black p-2 shadow-lg"
            >
              <ChordGrid>
                {tempChords.map((chord, index) => {
                  return (
                    <ChordTag
                      onClick={() => {
                        removeChord(index);
                      }}
                      key={Math.random()}
                    >
                      <Chord>{chord}</Chord>
                      <XIcon />
                    </ChordTag>
                  );
                })}
              </ChordGrid>

              <Row>
                <div className="relative w-full mt-2">
                  <ChordInput
                    type="text"
                    placeholder="New chord..."
                    ref={inputRef}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addChords();
                    }}
                  />

                  <div
                    {...parentProps}
                    className="absolute right-0 top-0 h-full flex flex-col items-center justify-center w-10"
                  >
                    <HelpCircleIcon />
                  </div>
                </div>
                {Popper}

                <AddButton onClick={addChords}>Add</AddButton>
              </Row>

              <BottomButtonRow>
                <ThirdButton
                  title="Restore Defaults"
                  onClick={restoreDefaults}
                />
                {canCloseModal && (
                  <ThirdButton title="Cancel" onClick={cancelEditing} />
                )}
                <ThirdButton title="Confirm" onClick={confirmEditing} />
                <ThirdButton title="Clear" onClick={clearChords} />
              </BottomButtonRow>
            </div>
          </div>
        </Portal>
      )}
    </div>   
    );
}

export const getDefaultChords = (trainingMode?: TrainingScenario) => {
  const globalDictionaries = getGlobalDictionaries();
  if (trainingMode && globalDictionaries[trainingMode]) {
    return Object.keys(globalDictionaries[trainingMode] as ChordLibraryRecord);
  } else {
    return Object.keys(getChordLibraryForTrainingScenario(trainingMode) || {});
  }
}

export const getDefaultChordsFromChordLibrary = (trainingMode?: TrainingScenario) => {
  return Object.keys(getChordLibraryForTrainingScenario(trainingMode) || {});
}

export const stopPropagation = (
  e: React.MouseEvent<Element, MouseEvent>,
): void => e.stopPropagation();

export default EditChordsModal;

const AddButton = styled.button.attrs({
  className: `ml-2 rounded mt-2 w-16 h-10 bg-white hover:bg-gray-200 active:bg-gray-300 text-sm`,
})``;

const BottomButtonRow = styled.div.attrs({
  className: `flex flex-row mt-2 text-sm gap-2`,
})``;

const ChordInput = styled.input.attrs({
  className: `relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`,
})``;

const Row = styled.div.attrs({
  className: `flex flex-row`,
})``;

const Chord = styled.span.attrs({
  className: `mb-1`,
})``;

const ChordTag = styled.span.attrs({
  className: `bg-gray-300 text-gray-900 hover:bg-gray-400 rounded-full px-3 h-8 flex flex-row items-center pr-2 leading-loose`,
})``;

const ChordGrid = styled.div.attrs({
  className: `bg-white break-all rounded overflow-x-hidden h-[400px] max-h-[90vh] flex flex-row flex-wrap p-2 gap-x-1 gap-y-1 content-start  overflow-scroll`,
})``;

export const getChordLibraryForTrainingScenario = (
  scenario?: TrainingScenario | undefined,
): Record<string, string[]> | undefined => {
  if (scenario === 'ALPHABET') return chordLibrary.letters;
  else if (scenario === 'CHORDING' && pickerV1) return chordLibrary.chords;
  else if (scenario === 'CHORDING' && pickerLite) return chordLibrary.chordsLite;
  else if (scenario === 'LEXICAL') return chordLibrary.lexical;
  else if (scenario === 'TRIGRAM') return chordLibrary.trigrams;
  else if (scenario === 'LEXICOGRAPHIC') return chordLibrary.lexicographic;
  else if (scenario === 'SUPERSONIC') return chordLibrary.supersonic;
  return undefined;
};
