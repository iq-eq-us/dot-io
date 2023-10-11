import type { Action, ActionOn, Computed, ThunkOn } from 'easy-peasy';

export interface flashCard {
  image: boolean;
  question: string;
  answer: string;
  url: string;
  tags: string[];
}

export interface flashCardSet {
  name: string;
  flashCards: flashCard[];
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
  setActiveFlashIndex: Action<flashCardStoreStateModel, number>;
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
}

export interface flashCardStoreStateModel {
  // The active flash card set is the set of flash cards that the user is currently training with
  activeFlashCardSetIndex: number;

  // All current flash card sets
  allFlashCardSets: flashCardSet[];
}

export type FlashCardStoreModel = flashCardStoreStateModel &
  flashCardActionModel;
