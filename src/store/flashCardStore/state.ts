import type { flashCardStoreStateModel } from '../../models/flashCardsModel';

// Default state for the flashCardStore
const flashCardStoreState: flashCardStoreStateModel = {
  activeFlashCardSetIndex: -1,

  allFlashCardSets: [],
};

export default flashCardStoreState;
