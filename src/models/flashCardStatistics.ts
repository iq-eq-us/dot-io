export interface FlashcardStatistics {
  id: string; // Unique identifier for the flashcard
  question: string; // The flashcard question
  numberOfErrors: number; // Number of errors made with this flashcard
  numberOfOccurrences: number; // Number of times the flashcard has been encountered
}

export const createFlashcardStatistics = (
  id: string,
  question: string,
  initialErrors = 0,
  initialOccurrences = 0,
): FlashcardStatistics => {
  return {
    id,
    question,
    numberOfErrors: initialErrors,
    numberOfOccurrences: initialOccurrences,
  };
};

export const flashcardStats: FlashcardStatistics[] = [
  {
    id: '1',
    question: 'hello',
    numberOfErrors: 1,
    numberOfOccurrences: 2,
    // Other properties...
  },

  {
    id: '2',
    question: 'chicken?',
    numberOfErrors: 2,
    numberOfOccurrences: 2,
    // Other properties...
  },

  {
    id: '3',
    question: 'null?',
    numberOfErrors: 2,
    numberOfOccurrences: 2,
    // Other properties...
  },
  // Other FlashcardStatistics objects...
];
