import React from 'react';
import { useStoreActions, useStoreState } from '../../../store/store';
import {
  Fill,
  TrisplitScreen,
  LabeledAction,
  ActionButton,
} from './DailyTrainingWelcome.styled';

interface DailyTrainingWelcomeProps {
  setActiveTraining: () => void;
  setCurrentTier: (tier: number) => void;
}

export const DailyTrainingWelcome = ({
  setActiveTraining,
  setCurrentTier,
}: DailyTrainingWelcomeProps) => {
  const flashCards = useStoreState((state) => state.flashCards);
  const activeFlashCards = useStoreState((state) => state.activeFlashCards);
  const nextTrainingDate = useStoreState((state) => state.nextTrainingDate);

  const idleFlashCards = flashCards.length - activeFlashCards.length;

  const isTrainingAvailable = nextTrainingDate.getTime() < Date.now();
  const isActiveFlashCards = activeFlashCards.length != 0;

  flashCards.forEach((card) => {
    console.log('Card:', card);
  });

  return (
    <Fill>
      <TrisplitScreen>
        <div>
          <h2>Total FlashCards:</h2>
          <h2>{flashCards.length}</h2>
        </div>
        <div>
          <h2>Active FlashCards:</h2>
          <h2>{activeFlashCards.length}</h2>
        </div>
        <div>
          <h2>Idle FlashCards:</h2>
          <h2>{idleFlashCards}</h2>
        </div>
      </TrisplitScreen>
      {isTrainingAvailable ? (
        <div>
          {isActiveFlashCards ? (
            <LabeledAction>
              <h2>Daily training available:</h2>
              <ActionButton onClick={() => setActiveTraining()}>
                Start Training
              </ActionButton>
            </LabeledAction>
          ) : (
            <LabeledAction>
              <h2>No active flash cards:</h2>
              <ActionButton onClick={() => setCurrentTier(2)}>
                Go to Manager
              </ActionButton>
            </LabeledAction>
          )}
        </div>
      ) : (
        <LabeledAction>
          <h2>Next Available Training is: {nextTrainingDate.toDateString()}</h2>
          <ActionButton onClick={() => setCurrentTier(1)}>
            Train in custom
          </ActionButton>
        </LabeledAction>
      )}
    </Fill>
  );
};
