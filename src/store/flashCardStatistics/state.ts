import { createStore, createTypedHooks, persist } from 'easy-peasy';
import type { Action } from 'easy-peasy';
import type {
  FlashcardStatistics,
  createFlashcardStatistics,
} from '../../models/flashCardStatistics';

// Define the state interface for flashcard statistics
export interface FlashcardStatisticsStoreState {
  totalSavedFlashCardStatistics: {
    statistics: FlashcardStatistics[]; // Make sure to define the 'statistics' property
  };
  // Add other relevant state properties here
}

// Define the initial state
const initialFlashcardStatistics: FlashcardStatisticsStoreState = {
  totalSavedFlashCardStatistics: {
    statistics: [],
  },

  // Initialize other relevant state properties here
};

export interface FlashcardStatisticsActions {
  clearStatsForOneFlashcard: Action<FlashcardStatisticsStoreState, string>;
  setTotalSavedFlashCardStatistics: Action<
    FlashcardStatisticsStoreState,
    FlashcardStatistics[]
  >;
  clearAllFlashcardStats: Action<FlashcardStatisticsStoreState>;
}

// Define the model for flashcard statistics
const flashcardStatisticsModel = {
  totalSavedFlashCardStatistics: persist(
    initialFlashcardStatistics.totalSavedFlashCardStatistics,
  ) as unknown as FlashcardStatisticsStoreState, // Add the correct type
  // Define actions for flashcard statistics here
  // For example, you can use the actions from the previous response
};

// Create and export the flashcard statistics store
const flashcardStatisticsStore = createStore(flashcardStatisticsModel);

// Create typed hooks for accessing the flashcard statistics store
const typedHooks = createTypedHooks<FlashcardStatisticsStoreState>();

export const useFlashcardStatisticsState = typedHooks.useStoreState;
export const useFlashcardStatisticsActions = typedHooks.useStoreActions;

export default flashcardStatisticsStore;
