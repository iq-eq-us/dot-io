import type { ChordLibraryRecord } from '../data/chordLibrary';
import { useStoreState } from '../store/store';
import useNumberOfChordsConquered from './useChordsConquered';

const calculateTotalNumberOfChords = (chordsToUse: ChordLibraryRecord) => {
  return Object.keys(chordsToUse).length;
};

export function useTotalChordsToConquer(): number {
  const chordsToUse = useStoreState((store) => store.chordsToPullFrom);
  const totalNumberOfChords = calculateTotalNumberOfChords(chordsToUse);
  return totalNumberOfChords;
}

export default function useChordsNotConquered(): number {
  const chordsConquered = useNumberOfChordsConquered();
  const totalNumberOfChords = useTotalChordsToConquer();
  const numberOfChordsRemaining = totalNumberOfChords - chordsConquered;

  return numberOfChordsRemaining;
}
