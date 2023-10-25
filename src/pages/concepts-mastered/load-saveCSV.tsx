import downloadCSV from './downloadCSV';

function LoadAndSaveCSV() {
  const flashcards = [
    {
      question: 'Question 1:  testing',
      answer: 'answer 1 ',
      tags: 'tag 1',
      url: 'hi ',
      image: 'false',
    },
    {
      question: 'Question 2: test 2',
      answer: 'answer 2 ',
      tags: 'tag 2 ',
      url: 'bye ',
      image: 'false',
    },
    {
      question: 'Question 3: test 3 ',
      answer: 'answer 3 ',
      tags: 'tag 3 ',
      url: 'url1 ',
      image: 'false',
    },
  ];

  const csvString = [
    ['question', 'answer', 'tags', 'url', 'image'],
    ...flashcards.map((flashcard) => [
      flashcard.question,
      flashcard.answer,
      flashcard.tags,
      flashcard.url,
      flashcard.image,
    ]),
  ]
    .map((e) => e.join(','))
    .join('\n');

  //console.log(csvString);
  downloadCSV(csvString.toString(), 'flashcards.csv');
}
export default LoadAndSaveCSV;
// "Question,Answer,Tags",
// "Flashcard 001,Flashcard 001,",
// "Flashcard 002,Flashcard 002,",
// "Flashcard 003,Flashcard 003,",
