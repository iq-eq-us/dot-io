import { computed } from 'easy-peasy';
import type { flashCardStoreStateModel } from '../../models/flashCardsModel';

// Default state for the flashCardStore
const flashCardStoreState: flashCardStoreStateModel = {
  loadedFromStorage: false,

  activeFlashCardSetIndex: -1,

  allFlashCardSets: [],

  sessionTrainingData: [],

  numberOfDailyFlashCards: 10,

  activeFlashCards: computed((state) => {
    if (state.activeFlashCardSetIndex === -1) return [];
    console.log('Active Flash Cards: ', state.activeFlashCardSetIndex);
    return state.allFlashCardSets[
      state.activeFlashCardSetIndex
    ]?.flashCards.filter(
      (card) =>
        card.nextReinforcement <= new Date() && card.ebbinghausValue < 20,
    );
  }),
};

export default flashCardStoreState;
