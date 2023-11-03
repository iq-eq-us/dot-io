import { action, computed, thunk } from 'easy-peasy';
import type {
  flashCardSet,
  flashCardActionModel,
  sessionTrainingData,
  flashCard,
} from '../../models/flashCardsModel';

const flashCardStoreActions: flashCardActionModel = {
  setLoadedFromStorage: action((state) => {
    state.loadedFromStorage = true;
  }),

  updateLocalStorage: action((state) => {
    localStorage.setItem(
      'flashCardSets',
      JSON.stringify(state.allFlashCardSets),
    );
  }),

  // Actions to add and remove cards from the active flash card set
  addFlashCard: action((state, payload) => {
    const activeSet = state.activeFlashCardSetIndex;
    if (activeSet === -1) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      // Adds a new flash card set to the list of sets
      const emptyFlashCardSet: flashCardSet = {
        name: 'Default Set',
        flashCards: [payload],
        nextTrainingDate: currentDate,
      };
      state.allFlashCardSets.push(emptyFlashCardSet);
      state.activeFlashCardSetIndex = state.allFlashCardSets.length - 1;
    } else {
      state.allFlashCardSets[activeSet].flashCards.push(payload);
    }
  }),

  removeFlashCard: action((state, payload) => {
    // Gets the active Flash Card Set and removes the flash card from it
    const activeSet = state.activeFlashCardSetIndex;
    state.allFlashCardSets[activeSet].flashCards.splice(payload, 1);
  }),

  editFlashCard: action((state, payload) => {
    // Gets the active Flash Card Set and edits the flash card from it
    const activeSet = state.activeFlashCardSetIndex;
    state.allFlashCardSets[activeSet].flashCards[payload.index] =
      payload.newFlashCard;
  }),

  // Actions to set and use the active flash card set
  setActiveFlashCardSetIndex: action((state, payload) => {
    // Checks the number of flash Card sets then replaces if valid
    const numberOfSets = state.allFlashCardSets.length;
    if (payload >= 0 && payload < numberOfSets) {
      state.activeFlashCardSetIndex = payload;
    } else {
      console.error('Invalid Flash Card Set Index: ' + payload);
      console.error('Give a number between 0 and ' + numberOfSets);
    }
  }),

  getActiveFlashCardSet: computed((state) => {
    // Gets the active Flash Card Set and returns it
    const activeSet = state.activeFlashCardSetIndex;
    return state.allFlashCardSets[activeSet]?.flashCards;
  }),

  getActiveFlashCardsName: computed((state) => {
    // Gets the active Flash Card Set and returns it's name
    const activeSet = state.activeFlashCardSetIndex;
    return state.allFlashCardSets[activeSet]?.name;
  }),

  getActiveFlashCardSetLength: computed((state) => {
    // Gets the active Flash Card Set and returns it's length
    const activeSet = state.activeFlashCardSetIndex;
    return state.allFlashCardSets[activeSet]?.flashCards.length;
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
    state.activeFlashCardSetIndex = state.allFlashCardSets.length - 1;
  }),

  addFlashCardSet: action((state, payload) => {
    state.allFlashCardSets.push(payload);
    state.activeFlashCardSetIndex = state.allFlashCardSets.length - 1;
  }),

  removeActiveFlashCardSet: action((state) => {
    const activeSet = state.activeFlashCardSetIndex;
    console.log(activeSet);
    state.allFlashCardSets.splice(activeSet, 1);
    if (activeSet === state.allFlashCardSets.length - 1) {
      state.activeFlashCardSetIndex--;
    }
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

  exportActiveFlashCardSetCSV: action((state) => {
    const activeSet = state.activeFlashCardSetIndex;
    downloadCSV(state.allFlashCardSets[activeSet]);
  }),

  // Actions to get and set the last daily training date of card sets
  setNextDailyTraining: action((state) => {
    // Sets the next date for the next training date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(currentDate.getDate() + 1);

    // Sets the next date for the next training date
    const activeSet = state.activeFlashCardSetIndex;
    state.allFlashCardSets[activeSet].nextTrainingDate = currentDate;
  }),

  getLastDailyTraining: computed((state) => {
    // Gets the last daily training date of the active set
    const activeSet = state.activeFlashCardSetIndex;
    return state.allFlashCardSets[activeSet]?.nextTrainingDate;
  }),

  getLastDailyTrainingAll: computed((state) => {
    // Gets the last daily training date of all sets
    const allDates = [];
    for (const set of state.allFlashCardSets) {
      allDates.push(set.nextTrainingDate);
    }
    return allDates;
  }),

  //Actions to generate training data
  setSessionTrainingData: action((state) => {
    const activeFlashCards = state.activeFlashCards;

    const sessionTrainingData: sessionTrainingData[] = [];

    while (
      sessionTrainingData.length < state.numberOfDailyFlashCards &&
      activeFlashCards.length != 0
    ) {
      const randomIndex = Math.floor(Math.random() * activeFlashCards.length);
      const randomFlashCard = activeFlashCards[randomIndex];

      sessionTrainingData.push({
        flashCard: randomFlashCard,
        numberOfTimesWritten: 0,
        numberOfTimesWrittenFast: 0,
        lastTenTimesSpeed: [],
      });

      activeFlashCards.splice(randomIndex, 1);
    }

    state.sessionTrainingData = sessionTrainingData;
  }),

  addTimeSessionTrainingData: action((state, payload) => {
    const index = payload[0];
    const time = payload[1];

    state.sessionTrainingData[index].lastTenTimesSpeed.push(time);
    if (state.sessionTrainingData[index].lastTenTimesSpeed.length > 10) {
      state.sessionTrainingData[index].lastTenTimesSpeed.shift();

      let totalTime = 0;
      for (const time of state.sessionTrainingData[index].lastTenTimesSpeed) {
        totalTime += time;
      }
      const averageTime = totalTime / 10;

      if (averageTime < 0.6) {
        state.sessionTrainingData[index].numberOfTimesWrittenFast++;
      }
    }

    state.sessionTrainingData[index].numberOfTimesWritten++;
    if (
      state.sessionTrainingData[index].numberOfTimesWritten >= 100 ||
      state.sessionTrainingData[index].numberOfTimesWrittenFast >= 10
    ) {
      const flashCard = state.sessionTrainingData.splice(index, 1)[0].flashCard;
      const poppedFlashCard: string = JSON.stringify(flashCard);
      for (
        let i = 0;
        i <
        state.allFlashCardSets[state.activeFlashCardSetIndex].flashCards.length;
        i++
      ) {
        if (
          JSON.stringify(
            state.allFlashCardSets[state.activeFlashCardSetIndex].flashCards[i],
          ) === poppedFlashCard
        ) {
          const newDate = new Date();
          newDate.setHours(0, 0, 0, 0);
          newDate.setDate(
            newDate.getDate() +
              state.allFlashCardSets[state.activeFlashCardSetIndex].flashCards[
                i
              ].ebbinghausValue +
              1,
          );

          state.allFlashCardSets[state.activeFlashCardSetIndex].flashCards[i]
            .ebbinghausValue++;
          state.allFlashCardSets[state.activeFlashCardSetIndex].flashCards[
            i
          ].nextReinforcement = newDate;
          break;
        }
      }
    }
  }),

  fetchUserData: thunk(async (actions) => {
    const flashCardSets: flashCardSet[] = await JSON.parse(
      localStorage.getItem('flashCardSets'),
    );
    if (flashCardSets != null) {
      flashCardSets.forEach((flashCardSet) => {
        actions.addFlashCardSet(flashCardSet);
      });
      actions.setActiveFlashCardSetIndex(0);
    }
    actions.setLoadedFromStorage();
  }),
};

export default flashCardStoreActions;

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
      'nextReinforcement',
    ],
    ...cardSet.flashCards.map((flashcard) => [
      flashcard.question,
      flashcard.answer,
      flashcard.tags,
      flashcard.url,
      flashcard.image,
      flashcard.ebbinghausValue,
      flashcard.nextReinforcement,
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
