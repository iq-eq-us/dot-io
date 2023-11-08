import type { Action, Computed } from 'easy-peasy';

export interface flashCard {
  question: string;
  answer: string;
  tags: string[];
  url: string;
  image: string;
  ebbinghausValue: number;
  lastReinforcement: string;
  // Add new properties
  numberOfOccurrences: number; // New property to track occurrences
  numberOfErrors: number; // New property to track errors
  flashcardQuestion: string; // New property to track question
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
  removeFlashCardSet: Action<flashCardStoreStateModel, number>;

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
  setFlashCardProperties: Action<flashCardActionModel>;
}

export interface flashCardStoreStateModel {
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
