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

  addTagFlashCard: action((state, payload) => {
    if (!(payload.key in state.tags)) {
      state.tags[payload.key] = [];
    }
    if (payload.index != undefined) {
      state.flashCards[payload.index].tags.push(payload.key);
      state.tags[payload.key].push(payload.index);
    }
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

    localStorage.setItem('nextDailyTraining', JSON.stringify(currentDate));
  }),

  //Actions to generate training data
  setSessionTrainingData: action((state) => {
    const activeFlashCards = state.activeFlashCards;
    console.log(activeFlashCards);

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
        numberOfTimesWrittenWrong: 0,
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
      for (let i = 0; i < state.flashCards.length; i++) {
        if (JSON.stringify(state.flashCards[i]) === poppedFlashCard) {
          const newDate = new Date();
          newDate.setHours(0, 0, 0, 0);
          newDate.setDate(
            newDate.getDate() + state.flashCards[i].ebbinghausValue + 1,
          );
          state.flashCards[i].ebbinghausValue++;
          state.flashCards[i].nextReinforcement = newDate.getTime();
          break;
        }
      }
    }
  }),

  fetchUserData: thunk(async (actions) => {
    const flashCards: flashCard[] = await JSON.parse(
      localStorage.getItem('flashCards'),
    );
    console.log(flashCards);
    if (flashCards != null) {
      flashCards.forEach((card, index) => {
        actions.addFlashCard(card);
        card.tags.forEach((tag) => {
          actions.addTagFlashCard({ key: tag, index: index });
        });
      });
    }
    actions.setLoadedFromStorage();
  }),
};

export default flashCardStoreActions;
