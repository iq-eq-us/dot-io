import type { flashCard } from 'src/models/flashCardsModel';

const calculateTotalTagPercentage = (
  flashCards: flashCard[],
  indicies: number[],
) => {
  let totalLevel = 0;
  indicies.forEach((index) => {
    totalLevel += flashCards[index].ebbinghausValue;
  });
  return totalLevel / 20 / indicies.length;
};

export default calculateTotalTagPercentage;
