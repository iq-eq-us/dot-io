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
  serialPort: '',
  portReader: '',
  lineReader: '',
  lineReaderDone: '',
  abortController1: new AbortController(),
  abortController2: new AbortController(),
  _chordmapCountOnDevice: 50,
  _firmwareVersion: '0',
  _chordMapIdCounter: 0,
  count: 0,
};

export default managerStoreState;
