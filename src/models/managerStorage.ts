import type { Action, Thunk } from 'easy-peasy';
import type { Chords, ChordLayout } from './managerModels';

export interface ManagerStoreState {
  downloadedChords: Chords;
  downloadedChordLayout: ChordLayout;
  serialApiResponses: string[];
  serialApiRequests: string[];
  commitAllCounterForChords: number;
  commitAllCounterForChordLayout: number;
}

export interface ManagerStoreActions {
  setDownloadedChords: Action<ManagerStore, Chords>;
  deleteDownloadedChordsData: Action<ManagerStore, Chords>;
  saveDownloadedChordsData: Action<ManagerStore, Chords>;
  setDownloadedChordLayout: Action<ManagerStore, ChordLayout>;
  setImportedChords: Action<ManagerStore, Chords>;
  setImportedChordsLayout: Action<ManagerStore, Chords>;
  deleteDownloadedChordsLayoutData: Action<ManagerStore, ChordLayout>;
  saveDownloadedChordLayoutData: Action<ManagerStore, ChordLayout>;
  clearDownloadedChords: Action<ManagerStore, ChordLayout>;
  clearDownloadedChordLayout: Action<ManagerStore, ChordLayout>;
  setSerialApiResponses: Action<ManagerStore, string[]>;
  setSerialApiRequests: Action<ManagerStore, number>;
  setCommitAllCounterForChords: Action<ManagerStore, number>;
  setCommitAllCounterForChordLayout: Action<ManagerStore, number>;
  updateSerialAPiDataThunk: Thunk<ManagerStore>;
}

export type ManagerStore = ManagerStoreState & ManagerStoreActions;
