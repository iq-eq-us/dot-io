import { action } from 'easy-peasy';
import type { flashCardStoreStateModel } from '../../models/flashCardsModel';

// Default state for the flashCardStore
const flashCardStoreState: flashCardStoreStateModel = {
  activeFlashCardSetIndex: -1,

  allFlashCardSets: [],

  // Action to add and remove cards from the active flash card set while loading CSV
  addFlashCardSet: action((state, payload) => {
    state.allFlashCardSets.push(payload);
  }),
};

export default flashCardStoreState;
