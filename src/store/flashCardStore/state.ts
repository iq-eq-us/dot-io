// state.ts

import { computed } from 'easy-peasy';
import type { flashCardStoreStateModel } from '../../models/flashCardsModel';

const flashCardStoreState: flashCardStoreStateModel = {
  loadedFromStorage: false,
  flashCards: [],
  tags: {},
  nextTrainingDate: new Date(),
  sessionTrainingData: [],
  numberOfDailyFlashCards: 10,
  selectedTags: '', // Add this line

  activeFlashCards: computed((state) => {
    return state.flashCards.filter((card) => {
      return (
        card.nextReinforcement <= Date.now() &&
        card.ebbinghausValue < 20 &&
        (state.selectedTags === '' || card.tags.includes(state.selectedTags))
      );
    });
  }),

  percentageCompleted: computed((state) => {
    return (tag: string | null) => {
      let flashCards = state.flashCards;
      if (tag == null || !(tag in state.tags)) {
        flashCards = flashCards.filter((_, index) =>
          state.tags[tag].includes(index),
        );
      }
      let totalLevel = 0;
      flashCards.forEach((card) => {
        totalLevel += card.ebbinghausValue;
      });
      return totalLevel / 20 / flashCards.length;
    };
  }),
};

export default flashCardStoreState;
