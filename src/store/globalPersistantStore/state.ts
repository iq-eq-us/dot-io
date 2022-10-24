import type { GlobalStoreState } from 'src/models/globalStorage';
import { computed } from 'easy-peasy';


/**
 * The storage keys for the saved data
 */

/**
 * The saved data is then injected into the store.
 */

 const storedChordState: boolean = JSON.parse(
  sessionStorage.getItem('chordingEnabledDevice') || 'false',) as boolean;//This or false statement may be the reason I am facing issues

const sessionChordingState = sessionStorage.getItem('chordingEnabledDevice');

const globalStoreState: GlobalStoreState = {
  isUsingChordingEnabledDevice: false,
  isDisplayingSettingsModal: false,
  isDisplayingStatisticsModal: false,
  isDisplayingIntroductionModal: false,

  
};
{console.log('THis is the state of the session in the file '+ sessionChordingState)};



export default globalStoreState;