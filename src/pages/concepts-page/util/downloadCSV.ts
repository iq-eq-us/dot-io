import type { flashCard } from 'src/models/flashCardsModel';

const downloadCSV = (cardSet: flashCard[]) => {
  // Makes a csv string from the flash card set

  const csvString = [
    [
      'type',
      'question',
      'answer',
      'imageSrc',
      'tags',
      'ebbinghausValue',
      'nextReinforcement',
      'timesTyped',
      'timesErrored',
    ],
    ...cardSet.map((flashcard) => {
      let tags = flashcard.tags.join('|');
      if (tags.length === 0) {
        tags = '';
      }
      return [
        flashcard.type,
        flashcard.question,
        flashcard.answer,
        flashcard.imageSrc,
        tags,
        flashcard.ebbinghausValue,
        flashcard.nextReinforcement,
        flashcard.timesTyped,
        flashcard.timesErrored,
      ];
    }),
  ]
    .map((e) => e.join(','))
    .join('\n');

  // Downloads the csv file
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString),
  );
  element.setAttribute('download', 'flashCards.csv');
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();

  // Clean up the element
  document.body.removeChild(element);
};

export default downloadCSV;
