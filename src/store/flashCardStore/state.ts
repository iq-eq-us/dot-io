// state.ts

import { computed } from 'easy-peasy';
import type {
  activeFlashCard,
  flashCardStoreStateModel,
} from '../../models/flashCardsModel';

const flashCardStoreState: flashCardStoreStateModel = {
  loadedFromStorage: false,
  flashCards: [],
  tags: {},
  nextTrainingDate: new Date(),
  sessionTrainingData: [],
  numberOfDailyFlashCards: 10,
  selectedTags: '', // Add this line

  activeFlashCards: computed((state) => {
    const activeFlashCards: activeFlashCard[] = [];
    state.flashCards.forEach((card, index) => {
      if (card.nextReinforcement <= Date.now() && card.ebbinghausValue < 20) {
        activeFlashCards.push({ flashCard: card, flashCardIndex: index });
      }
    });
    return activeFlashCards;
  }),

  percentageCompleted: computed((state) => {
    return (tag: string | null) => {
      let flashCards = state.flashCards;

      if (tag != null && tag in state.tags) {
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
