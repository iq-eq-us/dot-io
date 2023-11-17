import type { flashCard } from 'src/models/flashCardsModel';

const uploadCSV = async (filename: File): Promise<flashCard[]> => {
  const blobtoData = (blob: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsText(blob);
      delete reader.onloadend;
    });
  };

  const flashCards = await blobtoData(filename).then((data) => {
    const lines = (<string>data).split('\n');
    const flashCards: flashCard[] = [];
    for (const line of lines.slice(1, -1)) {
      const flashCard = line.split(',');
      if (
        flashCard[0] === 'text' ||
        flashCard[0] === 'translation' ||
        flashCard[0] === 'image'
      ) {
        flashCards.push({
          type: flashCard[0],
          question: flashCard[1],
          answer: flashCard[2],
          imageSrc: flashCard[3],
          tags: flashCard[4].split('|'),
          ebbinghausValue: parseInt(flashCard[5]),
          nextReinforcement: parseInt(flashCard[6]),
          timesTyped: parseInt(flashCard[7]),
          timesErrored: parseInt(flashCard[8]),
        });
      }
    }
    return flashCards;
  });

  return Promise.resolve(flashCards);
};

export default uploadCSV;
