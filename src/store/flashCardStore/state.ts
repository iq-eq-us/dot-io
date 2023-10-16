import { action, computed } from 'easy-peasy';
import type { flashCardStoreStateModel } from '../../models/flashCardsModel';

// Default state for the flashCardStore
const flashCardStoreState: flashCardStoreStateModel = {
  activeFlashCardSetIndex: -1,

  allFlashCardSets: [],

  numberOfDailyFlashCards: 10,

  activeFlashCardLength: computed((state) => {
    return state.getActiveFlashCardSet.filter(
      (card) =>
        card.lastReinforcement < new Date() && card.ebbinghausValue < 100,
    ).length;
  }),

  // Makes a weighted array of flash cards based on the ebbinghaus value
  activeFlashCardSetWeights: computed((state) => {
    const activeSet = state.activeFlashCardSetIndex;
    const weights: number[] = [];
    if (activeSet != -1) {
      const activeCardSet = state.allFlashCardSets[activeSet].flashCards;
      for (let i = 0; i < activeCardSet.length; i++) {
        if (
          activeCardSet[i].lastReinforcement < new Date() &&
          activeCardSet[i].ebbinghausValue < 100
        )
          weights.concat(
            Array(Math.ceil(activeCardSet[i].ebbinghausValue / 2)).fill(i),
          );
      }
    }

    return weights;
  }),

  // Action to add and remove cards from the active flash card set while loading CSV
  addFlashCardSet: action((state, payload) => {
    state.allFlashCardSets.push(payload);
  }),
};

export default flashCardStoreState;
