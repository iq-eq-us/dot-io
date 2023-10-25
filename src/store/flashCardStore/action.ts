import { action, computed, thunk } from 'easy-peasy';
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
    // Sets the current date for the next training date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Adds a new flash card set to the list of sets
    const emptyFlashCardSet: flashCardSet = {
      name: payload,
      flashCards: [],
      nextTrainingDate: currentDate,
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

  // Actions to load and unload flash card sets
  importFlashCardSetCSV: thunk(async (actions, payload) => {
    const newFlashCardSet: flashCardSet = await uploadCSV(payload);
    actions.addFlashCardSet(newFlashCardSet);
  }),

  exportActiveFlashCardSetCSV: action((state) => {
    const activeSet = state.activeFlashCardSetIndex;
    if (activeSet != -1) {
      downloadCSV(state.allFlashCardSets[activeSet]);
    } else {
      console.error('No active flash card set');
    }
  }),

  // Actions to get and set the last daily training date of card sets
  setNextDailyTraining: action((state) => {
    // Sets the next date for the next training date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(currentDate.getDate() + 1);

    // Sets the next date for the next training date
    const activeSet = state.activeFlashCardSetIndex;
    if (activeSet != -1) {
      state.allFlashCardSets[activeSet].nextTrainingDate = currentDate;
    } else {
      console.error('No active flash card set');
    }
  }),

  getLastDailyTraining: computed((state) => {
    // Gets the last daily training date of the active set
    const activeSet = state.activeFlashCardSetIndex;
    if (activeSet != -1) {
      return state.allFlashCardSets[activeSet].nextTrainingDate;
    } else {
      console.error('No active flash card set');
    }
  }),

  getLastDailyTrainingAll: computed((state) => {
    // Gets the last daily training date of all sets
    const allDates = [];
    for (const set of state.allFlashCardSets) {
      allDates.push(set.nextTrainingDate);
    }
    return allDates;
  }),

  // Actions to generate training data
  //generateDailyData: action((state) => {
  //  const activeSet = state.activeFlashCardSetIndex;
  //  const selectedFlashCards: flashCard[] = [];
  //  if (activeSet != -1) {
  //    const tempWeights = state.activeFlashCardSetWeights;
  //
  //    if (state.activeFlashCardLength < state.numberOfDailyFlashCards) {
  //      return state.allFlashCardSets[activeSet].flashCards.filter(
  //        (card) =>
  //          card.lastReinforcement < new Date() && card.ebbinghausValue < 100,
  //      );
  //    }
  //
  //    while (selectedFlashCards.length < state.numberOfDailyFlashCards) {
  //      // Gets a random flash card from the active set
  //      const randomIndex = Math.floor(Math.random() * tempWeights.length);
  //      const randomFlashCard =
  //        state.allFlashCardSets[activeSet].flashCards[
  //          tempWeights[randomIndex]
  //        ];
  //      tempWeights.splice(randomIndex, 1);
  //
  //      // Checks if the flash card is already selected
  //      if (!selectedFlashCards.includes(randomFlashCard)) {
  //        selectedFlashCards.push(randomFlashCard);
  //      }
  //    }
  //  } else {
  //    console.error('No active flash card set');
  //  }
  //
  //  return selectedFlashCards;
  //
  //}),
};

export default flashCardStoreActions;

const uploadCSV = async (filename: File) => {
  // Sets the current date for the next training date
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Makes an empty flash card set
  const flashCardSet: flashCardSet = {
    name: filename.toString(),
    flashCards: [],
    nextTrainingDate: currentDate,
  };

  const blobtoData = (blob: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsText(blob);
    });
  };
  blobtoData(filename).then((data) => {
    const lines = (<string>data).split('\n');
    for (const line of lines.slice(1)) {
      const flashCard = line.split(',');
      flashCardSet.flashCards.push({
        question: flashCard[0],
        answer: flashCard[1],
        tags: flashCard[2].split(', '),
        url: flashCard[3],
        image: flashCard[4] == 'TRUE',
        ebbinghausValue: parseFloat(flashCard[5]),
        lastReinforcement: new Date(flashCard[6]),
      });
    }
  });

  return flashCardSet;
};

const downloadCSV = (cardSet: flashCardSet) => {
  // Makes a csv string from the flash card set
  const csvString = [
    [
      'question',
      'answer',
      'tags',
      'url',
      'image',
      'ebbinghausValue',
      'lastReinforcement',
    ],
    ...cardSet.flashCards.map((flashcard) => [
      flashcard.question,
      flashcard.answer,
      flashcard.tags,
      flashcard.url,
      flashcard.image,
      flashcard.ebbinghausValue,
      flashcard.lastReinforcement,
    ]),
  ]
    .map((e) => e.join(','))
    .join('\n');

  // Downloads the csv file
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString),
  );
  element.setAttribute('download', cardSet.name);
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();

  // Clean up the element
  document.body.removeChild(element);
};
