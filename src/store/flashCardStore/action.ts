import { action, thunk } from 'easy-peasy';
import type {
  flashCardActionModel,
  sessionTrainingData,
  flashCard,
} from '../../models/flashCardsModel';

const flashCardStoreActions: flashCardActionModel = {
  setLoadedFromStorage: action((state) => {
    state.loadedFromStorage = true;
  }),

  updateLocalStorage: action((state) => {
    localStorage.setItem('flashCards', JSON.stringify(state.flashCards));
  }),

  addFlashCard: action((state, payload) => {
    state.flashCards.push(payload);
  }),

  addEmptyFlashCard: action((state) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const emptyFlashCard: flashCard = {
      type: 'text',
      question: '',
      answer: '',
      imageSrc: '',
      tags: [],
      ebbinghausValue: 0,
      nextReinforcement: currentDate.getTime(),
      timesTyped: 0,
      timesErrored: 0,
    };

    state.flashCards.push(emptyFlashCard);
  }),

  removeFlashCard: action((state, payload) => {
    state.flashCards.splice(payload, 1);
  }),

  editFlashCard: action((state, payload) => {
    state.flashCards[payload.index] = payload.newFlashCard;
  }),

  /*addTagFlashCard: action((state, payload) => {
    if (!(payload.key in state.tags)) {
      state.tags[payload.key] = [];
    }
    if (payload.index != undefined) {
      state.flashCards[payload.index].tags.push(payload.key);
      state.tags[payload.key].push(payload.index);
    }
  }),*/

  addTagFlashCard: action((state, payload) => {
    const { key, index } = payload;
    if (!state.flashCards[index].tags.includes(key)) {
      state.flashCards[index].tags.push(key);
    }
    if (!(key in state.tags)) {
      state.tags[key] = [];
    }
    if (index != undefined && !state.tags[key].includes(index)) {
      state.tags[key].push(index);
    }
  }),

  setSelectedTag: action((state, payload) => {
    console.log('Setting a tag');
    state.selectedTags = payload;
  }),

  removeTagFlashCard: action((state, payload) => {
    const flashCardTagIndex = state.flashCards[payload.key].tags.indexOf(
      payload.index,
    );
    state.flashCards[payload.key].tags.splice(flashCardTagIndex, 1);
    const tagIndex = state.tags[payload.key].indexOf(payload.index);
    state.tags[payload.key].splice(tagIndex, 1);
    if (state.tags[payload.key].length === 0) {
      delete state.tags[payload.key];
    }
  }),

  setNextDailyTraining: action((state) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(currentDate.getDate() + 1);

    state.nextTrainingDate = currentDate;

    localStorage.setItem('nextDailyTraining', currentDate.getTime().toString());
  }),

  loadNextDailyTraining: action((state, payload) => {
    state.nextTrainingDate = payload;
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
      const randomFlashCard = activeFlashCards[randomIndex].flashCard;

      sessionTrainingData.push({
        flashCard: randomFlashCard,
        flashCardIndex: activeFlashCards[randomIndex].flashCardIndex,
        numberOfTimesWritten: 0,
        numberOfTimesWrittenFast: 0,
        numberOfTimesWrittenWrong: 0,
        lastTenTimesSpeed: [],
        completed: false,
      });

      activeFlashCards.splice(randomIndex, 1);
    }
    state.sessionTrainingData = sessionTrainingData;
  }),

  setInfiniteSessionTrainingData: action((state, payload) => {
    const activeFlashCards = payload;
    const sessionTrainingData: sessionTrainingData[] = [];

    while (activeFlashCards.length != 0) {
      const randomIndex = Math.floor(Math.random() * activeFlashCards.length);
      const randomFlashCard = activeFlashCards[randomIndex].flashCard;

      sessionTrainingData.push({
        flashCard: randomFlashCard,
        flashCardIndex: activeFlashCards[randomIndex].flashCardIndex,
        numberOfTimesWritten: 0,
        numberOfTimesWrittenFast: 0,
        numberOfTimesWrittenWrong: 0,
        lastTenTimesSpeed: [],
        completed: null,
      });

      activeFlashCards.splice(randomIndex, 1);
    }
    state.sessionTrainingData = sessionTrainingData;
  }),

  mergeSessionTrainingData: action((state) => {
    state.sessionTrainingData.forEach((card) => {
      state.flashCards[card.flashCardIndex].timesTyped +=
        card.numberOfTimesWritten;
      state.flashCards[card.flashCardIndex].timesErrored +=
        card.numberOfTimesWrittenWrong;
    });
    state.sessionTrainingData = [];
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
      state.sessionTrainingData[index].completed != null &&
      (state.sessionTrainingData[index].numberOfTimesWritten >= 6 ||
        state.sessionTrainingData[index].numberOfTimesWrittenFast >= 10)
    ) {
      state.sessionTrainingData[index].completed = true;
      const flashCardIndex = state.sessionTrainingData[index].flashCardIndex;
      const newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      newDate.setDate(
        newDate.getDate() +
          state.flashCards[flashCardIndex].ebbinghausValue +
          1,
      );
      state.flashCards[flashCardIndex].ebbinghausValue++;
      state.flashCards[flashCardIndex].nextReinforcement = newDate.getTime();
    }
  }),

  fetchUserData: thunk(async (actions) => {
    const flashCardString = localStorage.getItem('flashCards');
    if (flashCardString != null) {
      const flashCards: flashCard[] = await JSON.parse(flashCardString);
      if (flashCards != null) {
        flashCards.forEach((card, index) => {
          actions.addFlashCard(card);
          card.tags.forEach((tag) => {
            actions.addTagFlashCard({ key: tag, index: index });
          });
        });
      }
    }
    const nextDailyTrainingString = localStorage.getItem('nextDailyTraining');
    if (nextDailyTrainingString != null) {
      const nextDailyTraining = new Date(parseInt(nextDailyTrainingString));
      console.log('Loaded date: ' + nextDailyTraining);
      actions.loadNextDailyTraining(nextDailyTraining);
    }
    actions.setLoadedFromStorage();
  }),
};

export default flashCardStoreActions;
