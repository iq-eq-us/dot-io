import type { Action, Computed } from 'easy-peasy';


export interface GlobalStoreState {
  isUsingChordingEnabledDevice: boolean;
}

export interface GlobalStoreActions {
  setIsUsingChordingEnabledDevice: Action<GlobalStore, boolean>;
}

export type GlobalStore = GlobalStoreState & GlobalStoreActions;
