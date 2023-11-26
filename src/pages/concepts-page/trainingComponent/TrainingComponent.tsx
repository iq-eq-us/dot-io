import React, { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from '../../../store/store';
import { ChordTextInput } from './ChordTextInput';
import { RenderQuestion } from './RenderQuestion';
import {
  TrainingContainer,
  TrainingPromptBox,
} from './TrainingComponent.styled';
import generateTrainingData from '../util/generateTrainingData';

interface TrainingComponentProps {
  setActiveTraining: () => void;
}

export function TrainingComponent({
  setActiveTraining,
}: TrainingComponentProps) {
  const sessionTrainingData = useStoreState(
    (state) => state.sessionTrainingData,
  );

  const addTimeSessionTrainingData = useStoreActions(
    (state) => state.addTimeSessionTrainingData,
  );

  const [trainingData, setTrainingData] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [itemsInSession, setItemsInSession] = useState(
    sessionTrainingData.length,
  );

  const currentTrainingValue = trainingData[userInput.length];

  useEffect(() => {
    const filteredSessionData = sessionTrainingData.filter(
      (item) => item.completed == false || item.completed == null,
    );
    console.log(trainingData);
    if (filteredSessionData.length != 0) {
      if (itemsInSession != filteredSessionData.length) {
        setTrainingData([
          ...trainingData.slice(0, userInput.length),
          ...generateTrainingData(sessionTrainingData),
        ]);
        setItemsInSession(filteredSessionData.length);
      }
      if (trainingData.length - userInput.length < 5) {
        setTrainingData([
          ...trainingData,
          ...generateTrainingData(filteredSessionData),
        ]);
      }
      setFocused(true);
    } else {
      setActiveTraining();
    }
  }, [userInput, itemsInSession]);

  function focusTextBox() {
    document.getElementById('txt_Name')?.focus();
    setFocused(true);
    setStartTime(Date.now());
  }

  function unfocusTextBox() {
    setStartTime(null);
    setFocused(false);
  }

  const regex = new RegExp('^[a-zA-Z ]{1}$');

  function checkInput(input: string) {
    if (startTime === null) {
      setStartTime(Date.now());
    } else if (input === 'Backspace' && inputValue.length > 0) {
      setInputValue(inputValue.slice(0, -1));
    } else if (input === 'Enter' && inputValue.length > 0) {
      // Checks to see if input is correct
      if (inputValue === currentTrainingValue.flashCard.answer) {
        setUserInput([...userInput, inputValue]);
        setInputValue('');

        addTime(Date.now() - startTime);
      } else {
        addTime(Date.now() - startTime + 1000);
      }
    } else if (regex.test(input)) {
      setInputValue(inputValue + input);
    }
  }

  function addTime(time: number) {
    addTimeSessionTrainingData([
      currentTrainingValue.sessionTrainingIndex,
      time,
    ]);
    setStartTime(Date.now());
  }

  return (
    <TrainingContainer>
      {focused ? (
        <div>
          <TrainingPromptBox
            onClick={() => focusTextBox()}
            style={{ height: '200px ' }}
          >
            <RenderQuestion flashCard={currentTrainingValue.flashCard} />
          </TrainingPromptBox>
          <ChordTextInput
            onKeyDown={checkInput}
            onBlur={unfocusTextBox}
            value={inputValue}
          />
        </div>
      ) : (
        <>
          <div onClick={() => focusTextBox()}>Click To Focus</div>
        </>
      )}
    </TrainingContainer>
  );
}
