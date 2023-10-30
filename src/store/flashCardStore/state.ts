import { computed } from 'easy-peasy';
import type { flashCardStoreStateModel } from '../../models/flashCardsModel';

// Default state for the flashCardStore
const flashCardStoreState: flashCardStoreStateModel = {
  activeFlashCardSetIndex: 0,

  allFlashCardSets: [
    {
      name: 'Default Set',
      flashCards: [],
      nextTrainingDate: new Date(),
    },
  ],

  sessionTrainingData: [],

  numberOfDailyFlashCards: 10,

  activeFlashCards: computed((state) => {
    return state.allFlashCardSets[
      state.activeFlashCardSetIndex
    ].flashCards.filter(
      (card) =>
        card.lastReinforcement <= new Date() && card.ebbinghausValue < 20,
    );
  }),
};

export default flashCardStoreState;
