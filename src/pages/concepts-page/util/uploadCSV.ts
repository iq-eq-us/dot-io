import type { flashCardSet } from 'src/models/flashCardsModel';

const uploadCSV = async (filename: File) => {
  // Sets the current date for the next training date
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  console.log('running');

  // Makes an empty flash card set
  let flashCardSet: flashCardSet = {
    name: filename.name.split('.')[0],
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

  flashCardSet = await blobtoData(filename).then((data) => {
    const lines = (<string>data).split('\n');
    for (const line of lines.slice(1)) {
      if (line == '') continue;
      const flashCard = line.split(',');
      let cardTags = [];
      if (flashCard[2] != '') {
        const tags: string = flashCard[2];
        cardTags = tags.split('|');
      }
      flashCardSet.flashCards.push({
        question: flashCard[0],
        answer: flashCard[1],
        tags: cardTags,
        url: flashCard[3],
        image: flashCard[4] == 'TRUE',
        ebbinghausValue: parseFloat(flashCard[5]),
        nextReinforcement: new Date(flashCard[6]),
      });
      console.log('Flashcard date: ', Date.parse(flashCard[6]));
    }
    return flashCardSet;
  });

  console.log(flashCardSet);
  return flashCardSet;
};

export default uploadCSV;
