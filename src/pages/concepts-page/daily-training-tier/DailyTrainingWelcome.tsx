import React, { useState } from 'react';
import { useStoreState } from '../../../store/store';
import { Slider } from './Slider';
import {
  Fill,
  TrisplitScreen,
  LabeledAction,
  ActionButton,
  ExplanationHeader,
} from './DailyTrainingWelcome.styled';

interface DailyTrainingWelcomeProps {
  setActiveTraining: (setNumberSelected: number) => void;
  setCurrentTier: (tier: number) => void;
}

export const DailyTrainingWelcome = ({
  setActiveTraining,
  setCurrentTier,
}: DailyTrainingWelcomeProps) => {
  const flashCards = useStoreState((state) => state.flashCards);
  const activeFlashCards = useStoreState((state) => state.activeFlashCards);

  const [numberSelected, setNumberSelected] = useState(1);

  const idleFlashCards = flashCards.length - activeFlashCards.length;
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
      {isActiveFlashCards ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ExplanationHeader>
            How many flashcards would you like to train today?
          </ExplanationHeader>
          <Slider
            max={activeFlashCards.length}
            currentNumber={numberSelected}
            setCurrentNumber={setNumberSelected}
          />
          <ExplanationHeader>
            Currently set to {numberSelected} out of {activeFlashCards.length}
          </ExplanationHeader>
          <LabeledAction>
            <ActionButton onClick={() => setActiveTraining(numberSelected)}>
              Start Training
            </ActionButton>
          </LabeledAction>
        </div>
      ) : (
        <LabeledAction>
          <h2>No active flash cards:</h2>
          <ActionButton onClick={() => setCurrentTier(2)}>
            Go to Manager
          </ActionButton>
        </LabeledAction>
      )}
    </Fill>
  );
};
