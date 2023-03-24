import type { GlobalStoreState } from 'src/models/globalStorage';

/**
 * The storage keys for the saved data
 */

/**
 * The saved data is then injected into the store.
 */

const storedChordState: boolean = JSON.parse(
  sessionStorage.getItem('chordingEnabledDevice') || 'false',
) as boolean; //This or false statement may be the reason I am facing issues

const sessionChordingState = sessionStorage.getItem('chordingEnabledDevice');

const globalStoreState: GlobalStoreState = {
  isUsingChordingEnabledDevice: false,
  isDisplayingSettingsModal: false,
  isDisplayingStatisticsModal: false,
  isDisplayingIntroductionModal: false,
  numberOfWordsChorded: 0,
};

export default globalStoreState;
