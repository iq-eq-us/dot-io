import { action, computed } from 'easy-peasy';
import type {
  flashCardSet,
  flashCardActionModel,
} from '../../models/flashCardsModel';

const flashCardStoreActions: flashCardActionModel = {
  // Actions to add and remove cards from the active flash card set
  addFlashCard: action((state, payload) => {
    // Gets the active Flash Card Set and adds the new flash card to it
    const activeSet = state.activeFlashCardSetIndex;
    if (activeSet != -1) {
      state.allFlashCardSets[activeSet].flashCards.push(payload);
    } else {
      console.error('No active flash card set');
    }
  }),

  removeFlashCard: action((state, payload) => {
    // Gets the active Flash Card Set and removes the flash card from it
    const activeSet = state.activeFlashCardSetIndex;
    if (activeSet != -1) {
      state.allFlashCardSets[activeSet].flashCards.splice(payload, 1);
    } else {
      console.error('No active flash card set');
    }
  }),

  editFlashCard: action((state, payload) => {
    // Gets the active Flash Card Set and edits the flash card from it
    const activeSet = state.activeFlashCardSetIndex;
    if (activeSet != -1) {
      state.allFlashCardSets[activeSet].flashCards[payload.index] =
        payload.newFlashCard;
    } else {
      console.error('No active flash card set');
    }
  }),

  // Actions to set and use the active flash card set
  setActiveFlashIndex: action((state, payload) => {
    // Checks the number of flash Card sets then replaces if valid
    const numberOfSets = state.allFlashCardSets.length;
    if (payload > 0 && payload < numberOfSets) {
      state.activeFlashCardSetIndex = payload;
    } else {
      console.error('Invalid Flash Card Set Index: ' + payload);
      console.error('Give a number between 0 and ' + numberOfSets);
    }
  }),

  getActiveFlashCardSet: computed((state) => {
    // Gets the active Flash Card Set and returns it
    const activeSet = state.activeFlashCardSetIndex;
    if (activeSet != -1) {
      return state.allFlashCardSets[activeSet].flashCards;
    } else {
      return undefined;
      console.error('No active flash card set');
    }
  }),

  getActiveFlashCardsName: computed((state) => {
    // Gets the active Flash Card Set and returns it's name
    const activeSet = state.activeFlashCardSetIndex;
    if (activeSet != -1) {
      return state.allFlashCardSets[activeSet].name;
    } else {
      return undefined;
      console.error('No active flash card set');
    }
  }),

  getActiveFlashCardSetLength: computed((state) => {
    // Gets the active Flash Card Set and returns it's length
    const activeSet = state.activeFlashCardSetIndex;
    if (activeSet != -1) {
      return state.allFlashCardSets[activeSet].flashCards.length;
    } else {
      return undefined;
      console.error('No active flash card set');
    }
  }),

  // Actions to add and remove flash card sets

  addEmptyFlashCardSet: action((state, payload) => {
    // Adds a new flash card set to the list of sets
    const emptyFlashCardSet: flashCardSet = {
      name: payload,
      flashCards: [],
    };
    state.allFlashCardSets.push(emptyFlashCardSet);
  }),

  removeFlashCardSet: action((state, payload) => {
    // Removes a flash card set from the list of sets
    state.allFlashCardSets.splice(payload, 1);
  }),

  // Actions to edit the flash card sets

  getFlashCardSetNameAtIndex: computed((state) => {
    // Gets the name of the flash card set at the given index
    return (index) => state.allFlashCardSets[index].name;
  }),

  getAllFlashCardSetNames: computed((state) => {
    // Gets the name of all flash Card Sets
    const allNames = [];
    for (const set of state.allFlashCardSets) {
      allNames.push(set.name);
    }
    return allNames;
  }),
};

export default flashCardStoreActions;
