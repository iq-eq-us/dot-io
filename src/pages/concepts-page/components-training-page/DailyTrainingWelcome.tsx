import React from 'react';
import { useStoreState } from '../../../store/store';
import styled from 'styled-components';

interface DailyTrainingWelcomeProps {
  setActiveTraining: (active: boolean) => void;
  setCurrentTier: (tier: number) => void;
}

const DailyTrainingWelcome = ({
  setActiveTraining,
  setCurrentTier,
}: DailyTrainingWelcomeProps) => {
  const flashCards = useStoreState((state) => state.flashCards);
  const activeFlashCards = useStoreState((state) => state.activeFlashCards);
  const nextTrainingDate = useStoreState((state) => state.nextTrainingDate);

  const idleFlashCards = flashCards.length - activeFlashCards.length;

  const isTrainingAvailable = nextTrainingDate.getMilliseconds() < Date.now();
  const isActiveFlashCards = activeFlashCards.length != 0;

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
              <ActionButton onClick={() => setActiveTraining(true)}>
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
          <h2>Next Available Training is: {nextTrainingDate}</h2>
          <ActionButton onClick={() => setCurrentTier(1)}>
            Train in custom
          </ActionButton>
        </LabeledAction>
      )}
    </Fill>
  );
};

export default DailyTrainingWelcome;

const Fill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 100%;
`;

const TrisplitScreen = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin: 30px;
  padding: 30px;
`;

const LabeledAction = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const ActionButton = styled.button.attrs({
  className:
    'import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative',
})``;
