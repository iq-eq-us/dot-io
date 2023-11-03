import type { Action, Computed, Thunk } from 'easy-peasy';

export interface flashCard {
  image: boolean;
  question: string;
  answer: string;
  url: string;
  tags: string[];
  ebbinghausValue: number;
  nextReinforcement: Date;
}

export interface flashCardSet {
  name: string;
  flashCards: flashCard[];
  nextTrainingDate: Date;
}

export interface sessionTrainingData {
  flashCard: flashCard;
  numberOfTimesWritten: number;
  numberOfTimesWrittenFast: number;
  lastTenTimesSpeed: number[];
}

export interface generatedData {
  flashCard: flashCard;
  sessionTrainingIndex: number;
}

export interface flashCardActionModel {
  setLoadedFromStorage: Action<flashCardStoreStateModel>;
  updateLocalStorage: Action<flashCardStoreStateModel>;

  // Actions to add and remove cards from the active flash card set
  addFlashCard: Action<flashCardStoreStateModel, flashCard>;
  removeFlashCard: Action<flashCardStoreStateModel, number>;
  editFlashCard: Action<
    flashCardStoreStateModel,
    { index: number; newFlashCard: flashCard }
  >;

  // Actions to set and use the active flash card set
  setActiveFlashCardSetIndex: Action<flashCardStoreStateModel, number>;
  getActiveFlashCardSet: Computed<flashCardStoreStateModel, flashCard[]>;
  getActiveFlashCardsName: Computed<flashCardStoreStateModel, string>;
  getActiveFlashCardSetLength: Computed<flashCardStoreStateModel, number>;

  // Actions to add and remove flash card sets
  addEmptyFlashCardSet: Action<flashCardStoreStateModel, string>;
  addFlashCardSet: Action<flashCardStoreStateModel, flashCardSet>;
  removeActiveFlashCardSet: Action<flashCardStoreStateModel>;

  // Actions to get information about any flash card set
  getFlashCardSetNameAtIndex: Computed<
    flashCardStoreStateModel,
    (index: number) => string
  >;
  getAllFlashCardSetNames: Computed<flashCardStoreStateModel, string[]>;

  // Actions to transition between csv and redux
  exportActiveFlashCardSetCSV: Action<flashCardStoreStateModel>;

  // Actions to get and set the last daily training date of a set
  setNextDailyTraining: Action<flashCardStoreStateModel>;
  getLastDailyTraining: Computed<flashCardStoreStateModel, Date>;
  getLastDailyTrainingAll: Computed<flashCardStoreStateModel, Date[]>;

  setSessionTrainingData: Action<flashCardStoreStateModel>;

  addTimeSessionTrainingData: Action<flashCardStoreStateModel, number[]>;

  fetchUserData: Thunk<flashCardActionModel>;
}

export interface flashCardStoreStateModel {
  loadedFromStorage: boolean;

  // The active flash card set is the set of flash cards that the user is currently training with
  activeFlashCardSetIndex: number;

  // All current flash card sets
  allFlashCardSets: flashCardSet[];

  sessionTrainingData: sessionTrainingData[];

  // Number of flash cards to practice daily
  numberOfDailyFlashCards: number;

  activeFlashCards: Computed<flashCardStoreStateModel, flashCard[]>;
}

export type FlashCardStoreModel = flashCardStoreStateModel &
  flashCardActionModel;
