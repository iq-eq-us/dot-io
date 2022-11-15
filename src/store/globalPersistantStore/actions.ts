import { action } from 'easy-peasy';
import type { GlobalStoreActions, GlobalStoreState } from '../../../src/models/globalStorage';

const SAVED_STATS_STORAGE_KEY = 'SAVED_STATS_STORAGE_KEY';
/**
 * This section contains all the state for the saved items in storage.
 * It also handles merging existing stored data with new data.
 * This logic is rather complex so it may take a few tries to understand it.
 */

 const sessionChordingState = sessionStorage.getItem('chordingEnabledDevice');

const globalStorageStoreActions: GlobalStoreActions = {
  setIsUsingChordingEnabledDevice: action((state, payload) => {
  state.isUsingChordingEnabledDevice = payload as boolean;
  updateIsChordingEnabledInSessionStorage(payload as boolean);
  }),
  setIsDisplayingSettingsModal: action((state, payload) => {
    state.isDisplayingSettingsModal = payload;
    }),
    setNumberOfWordsChorded: action((state, payload) => {
  state.numberOfWordsChorded = state.numberOfWordsChorded +1 as number;
  }),
  setIsDisplayingStatisticsModal: action((state, payload) => {
  state.isDisplayingStatisticsModal = payload;
  }),
  setIsDisplayingIntroductionModal: action((state, payload) => {
  state.isDisplayingIntroductionModal = payload;
  }),

}

export default globalStorageStoreActions;

function updateIsChordingEnabledInSessionStorage(payload: boolean) {
    sessionStorage.setItem('chordingEnabledDevice', JSON.stringify(payload))
  }
