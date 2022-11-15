import type { Action, Computed } from 'easy-peasy';


export interface GlobalStoreState {
  isUsingChordingEnabledDevice: boolean;
  numberOfWordsChorded: number;
  isDisplayingSettingsModal: boolean,
  isDisplayingStatisticsModal: boolean,
  isDisplayingIntroductionModal: boolean,

}

export interface GlobalStoreActions {
  setIsUsingChordingEnabledDevice: Action<GlobalStore, boolean>;
  setNumberOfWordsChorded: Action<GlobalStore, number>;
  setIsDisplayingSettingsModal: Action<GlobalStore, boolean>;
  setIsDisplayingStatisticsModal: Action<GlobalStore, boolean>;
  setIsDisplayingIntroductionModal: Action<GlobalStore, boolean>;


}

export type GlobalStore = GlobalStoreState & GlobalStoreActions;
