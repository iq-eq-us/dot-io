import React, { ReactElement, useRef, useState } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { chordLibrary, ChordLibraryRecord } from '../../../data/chordLibrary';
import type { TrainingScenario } from '../../../models/trainingScenario';
import { useStoreActions, useStoreState } from '../../../store/store';
import { ThirdButton } from './ThirdButton';
import { XIcon } from './XIcon';

function EditChordsModal(): ReactElement {
  const isShowingPortal = useStoreState(
    (store) => store.isDisplayingChordEditModal,
  );
  const trainingMode = useStoreState((store) => store.currentTrainingScenario);
  const [chords, setChords] = useState(getDefaultChords(trainingMode));
  const [tempChords, setTempChords] = useState(chords);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

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

  const addChord = (chord?: string) => {
    const parts = chord?.split(' ') || [];
    if (parts.length) {
      setTempChords(
        [...tempChords, ...parts].sort((a, b) => a.localeCompare(b)),
      );
      setInputValue('');
    }
  };

  const restoreDefaults = () => {
    setTempChords(getDefaultChords(trainingMode));
  };

  const cancelEditing = () => {
    setTempChords(chords);
    togglePortal();
    setInputValue('');
  };

  const confirmEditing = () => {
    const hasChangeBeenMade =
      JSON.stringify(tempChords) !== JSON.stringify(chords);

    if (hasChangeBeenMade) {
      const newChordLibraryRecord = generateNewChordRecord(tempChords);
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
              className="w-[400px] max-w-[100vw] bg-black p-2 shadow-lg"
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
                <ChordInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  type="text"
                  placeholder="New chord..."
                  ref={inputRef}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addChords();
                  }}
                />

                <AddButton onClick={addChords}>Add</AddButton>
              </Row>

              <BottomButtonRow>
                <ThirdButton
                  title="Restore Defaults"
                  onClick={restoreDefaults}
                />
                <ThirdButton title="Cancel" onClick={cancelEditing} />
                <ThirdButton title="Confirm" onClick={confirmEditing} />
              </BottomButtonRow>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

const getDefaultChords = (trainingMode?: TrainingScenario) =>
  Object.keys(getChordLibraryForTrainingScenario(trainingMode) || {}).sort(
    (a, b) => a.localeCompare(b),
  );

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
  className: `mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`,
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
  else if (scenario === 'CHORDING') return chordLibrary.chords;
  else if (scenario === 'LEXICAL') return chordLibrary.lexical;
  else if (scenario === 'TRIGRAM') return chordLibrary.trigrams;
  return undefined;
};
