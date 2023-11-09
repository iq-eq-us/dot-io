import { computed } from 'easy-peasy';
import type { flashCardStoreStateModel } from '../../models/flashCardsModel';

// Default state for the flashCardStore
const flashCardStoreState: flashCardStoreStateModel = {
  loadedFromStorage: false,

  flashCards: [],
  tags: {},
  nextTrainingDate: new Date(),
  sessionTrainingData: [],
  numberOfDailyFlashCards: 10,

  activeFlashCards: computed((state) => {
    return state.flashCards.filter((card) => {
      return card.nextReinforcement <= Date.now() && card.ebbinghausValue < 20;
    });
  }),
};

export default flashCardStoreState;
