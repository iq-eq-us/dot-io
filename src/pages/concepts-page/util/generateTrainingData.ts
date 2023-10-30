import type {
  generatedData,
  sessionTrainingData,
} from 'src/models/flashCardsModel';

const numberItemsToGenerate = 20;

const generateTrainingData = (sessionTrainingData: sessionTrainingData[]) => {
  const generatedData: generatedData[] = [];

  console.log('Session Training Set: ', sessionTrainingData);

  let lastIndex = -1;
  for (let i = 0; i < numberItemsToGenerate; i++) {
    console.log(sessionTrainingData);
    let currentIndex = Math.floor(Math.random() * sessionTrainingData.length);
    while (lastIndex === currentIndex && sessionTrainingData.length != 1) {
      currentIndex = Math.floor(Math.random() * sessionTrainingData.length);
    }
    generatedData.push({
      flashCard:
        sessionTrainingData[
          Math.floor(Math.random() * sessionTrainingData.length)
        ].flashCard,
      sessionTrainingIndex: currentIndex,
    });
    lastIndex = currentIndex;
  }

  return generatedData;
};

export default generateTrainingData;
