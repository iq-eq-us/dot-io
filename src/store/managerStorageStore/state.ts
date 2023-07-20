import type { ManagerStoreState } from '../../models/managerStorage';

const managerStoreState: ManagerStoreState = {
  downloadedChords: {
    chords: [],
  },
  downloadedChordLayout: {
    chordLayout: [],
  },
  serialApiResponses: [],
  serialApiRequests: [],
  commitAllCounterForChords: 0,
  commitAllCounterForChordLayout: 0,
};

export default managerStoreState;
