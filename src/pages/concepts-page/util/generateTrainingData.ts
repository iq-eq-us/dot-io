import type {
  generatedData,
  sessionTrainingData,
} from 'src/models/flashCardsModel';

const numberItemsToGenerate = 20;

const generateTrainingData = (sessionTrainingData: sessionTrainingData[]) => {
  const filteredSessionTrainingData: number[] = [];
  sessionTrainingData.forEach((card, index) => {
    if (card.completed === false || card.completed === null) {
      filteredSessionTrainingData.push(index);
    }
  });
  console.log(sessionTrainingData);
  const generatedData: generatedData[] = [];

  for (let i = 0; i < numberItemsToGenerate; i++) {
    const currentIndex = Math.floor(
      Math.random() * filteredSessionTrainingData.length,
    );
    const flashCardIndex = filteredSessionTrainingData[currentIndex];

    generatedData.push({
      flashCard: sessionTrainingData[flashCardIndex].flashCard,
      sessionTrainingIndex: flashCardIndex,
    });
  }

  return generatedData;
};

export default generateTrainingData;
