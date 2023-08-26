import type { Action, Computed, Thunk } from 'easy-peasy';
import type { Chords, ChordLayout } from './managerModels';

export interface ManagerStoreState {
  downloadedChords: Chords;
  downloadedChordLayout: ChordLayout;
  serialApiResponses: string[];
  serialApiRequests: string[];
  commitAllCounterForChords: number;
  commitAllCounterForChordLayout: number;
  serialPort: any;
  portReader: any;
  lineReader: any;
  lineReaderDone: any;
  abortController1: AbortController;
  abortController2: AbortController;
  deviceId: any;
  _chordmapCountOnDevice: any;
  _firmwareVersion: any;
  _chordMapIdCounter: 0;
  count: number;
  /*
    public static CONFIG_ID_ENABLE_SERIAL_LOG = '01';
    public static CONFIG_ID_ENABLE_SERIAL_RAW = '02';
    public static CONFIG_ID_ENABLE_SERIAL_CHORD = '03';
    public static CONFIG_ID_ENABLE_SERIAL_KEYBOARD = '04';
    public static CONFIG_ID_ENABLE_SERIAL_MOUSE = '05';
    public static CONFIG_ID_ENABLE_SERIAL_DEBUG = '06';
    public static CONFIG_ID_ENABLE_SERIAL_HEADER = '07';
    public static CONFIG_ID_ENABLE_HID_KEYBOARD = '0A';
    public static CONFIG_ID_PRESS_THRESHOLD = '0B';
    public static CONFIG_ID_RELEASE_THRESHOLD = '0C';
    public static CONFIG_ID_ENABLE_HID_MOUSE = '14';
    public static CONFIG_ID_SCROLL_DELAY = '15';
    public static CONFIG_ID_ENABLE_SPURRING = '1E';
    public static CONFIG_ID_SPUR_KILLER_TOGGLE = '1F';
    public static CONFIG_ID_SPUR_KILLER = '20';
    public static CONFIG_ID_ENABLE_CHORDING = '28';
    public static CONFIG_ID_CHAR_KILLER_TOGGLE = '29';
    public static CONFIG_ID_CHAR_COUNTER_KILLER = '2A';
    */
}

export interface ManagerStoreActions {
  setDownloadedChords: Action<ManagerStore, Chords>;
  setSingleDownloadedChord: Action<ManagerStore, Chords>;
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
  setDeviceId: Action<ManagerStore, any>;
}

export type ManagerStore = ManagerStoreState & ManagerStoreActions;
