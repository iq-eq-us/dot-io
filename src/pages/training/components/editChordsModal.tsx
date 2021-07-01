import React, {
  MouseEventHandler,
  ReactElement,
  useRef,
  useState,
} from 'react';
import { Portal } from 'react-portal';
import { chordLibrary, ChordLibraryRecord } from '../../../data/chordLibrary';
import type { TrainingScenario } from '../../../models/trainingScenario';
import { useStoreActions, useStoreState } from '../../../store/store';
import { getChordLibraryForTrainingScenario } from './trainingProgressContainer';

interface ThirdButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

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
        .filter((c) => c !== undefined) as any,
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
    const newChordLibraryRecord = generateNewChordRecord(tempChords);
    updateChordsUsedInStore(newChordLibraryRecord);
    setChords(tempChords);
    togglePortal();
    setInputValue('');
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
              <div className="bg-white break-all border-2 border-solid border-gray-400 h-[400px] max-h-[90vh] flex flex-row flex-wrap p-2 gap-x-1 gap-y-1 content-start  overflow-scroll">
                {tempChords.map((chord, index) => {
                  return (
                    <span
                      onClick={(e) => {
                        removeChord(index);
                      }}
                      key={Math.random()}
                      className="bg-gray-300 text-gray-900 hover:bg-gray-400 rounded-full block px-3 h-8 flex flex-row items-center pr-2 leading-loose flex flex-row items-center"
                    >
                      <span className="mb-1">{chord}</span>
                      <span className="ml-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-x"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </span>
                    </span>
                  );
                })}
              </div>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="New chord..."
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addChord(inputRef.current?.value);
                }}
              />
              <div className="flex flex-row mt-2 text-sm gap-2">
                <ThirdButton
                  title="Restore Defaults"
                  onClick={restoreDefaults}
                />
                <ThirdButton title="Cancel" onClick={cancelEditing} />
                <ThirdButton title="Confirm" onClick={confirmEditing} />
              </div>
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

const stopPropagation = (e: React.MouseEvent<any, MouseEvent>) =>
  e.stopPropagation();

const ThirdButton = ({ title, onClick }: ThirdButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="w-1/3 bg-white hover:bg-gray-200 py-2 rounded-sm cursor-pointer active:bg-gray-300"
    >
      <p className="text-center w-full">{title}</p>
    </div>
  );
};

export default EditChordsModal;
