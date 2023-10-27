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

  // Makes a weighted array of flash cards based on the ebbinghaus value
  //activeFlashCardSetWeights: computed((state) => {
  //  const activeSet = state.activeFlashCardSetIndex;
  //  const weights: number[] = [];
  //  if (activeSet != -1) {
  //    const activeCardSet = state.allFlashCardSets[activeSet].flashCards;
  //    for (let i = 0; i < activeCardSet.length; i++) {
  //      if (
  //        activeCardSet[i].lastReinforcement < new Date() &&
  //        activeCardSet[i].ebbinghausValue < 100
  //      )
  //        weights.concat(
  //          Array(Math.ceil(activeCardSet[i].ebbinghausValue / 2)).fill(i),
  //        );
  //    }
  //  }
  //
  //  return weights;
  //}),
};

export default flashCardStoreState;
