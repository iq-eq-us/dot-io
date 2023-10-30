import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/store';
import ChordTextInput from './ChordTextInput';
import RenderQuestion from './RenderQuestion';
import generateTrainingData from '../util/generateTrainingData';
import EditFlashcard from './EditFlashcard';

export function TextPrompt() {
  const sessionTrainingData = useStoreState(
    (state) => state.sessionTrainingData,
  );
  const setSessionTrainingData = useStoreActions(
    (state) => state.setSessionTrainingData,
  );
  const activeFlashCards = useStoreState((state) => state.activeFlashCards);
  const addTimeSessionTrainingData = useStoreActions(
    (state) => state.addTimeSessionTrainingData,
  );

  const [trainingData, setTrainingData] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [availableSessionData, setAvailableSessionData] = useState(false);

  const currentTrainingValue = trainingData[userInput.length];
  console.log(sessionTrainingData);
  console.log('Active FlashCards: ', activeFlashCards);

  useEffect(() => {
    if (activeFlashCards.length != 0 && availableSessionData) {
      if (trainingData.length - userInput.length < 5) {
        const newTrainingData = generateTrainingData(sessionTrainingData);
        setTrainingData([...trainingData, ...newTrainingData]);
      }
      setFocused(true);
    } else if (activeFlashCards.length != 0 && !availableSessionData) {
      setSessionTrainingData();
      setAvailableSessionData(true);
      setFocused(false);
    }
  }, [userInput, availableSessionData]);

  function focusTextBox() {
    setFocused(true);
    setStartTime(Date.now());
    document.getElementById('txt_Name')?.focus();
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
        console.log(userInput);
        console.log(trainingData);
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
    <TextPromptContainer>
      {focused ? (
        <div>
          <TextPromptContainer onClick={() => focusTextBox()}>
            <RenderQuestion flashCard={currentTrainingValue.flashCard} />
          </TextPromptContainer>
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
    </TextPromptContainer>
  );
}

const TextPromptContainer = styled.div.attrs({
  className: `
    text-md font-bold mt-12 flex flex-col items-center w-full justify-center text-white
    sm:text-xl md:text-2xl xl:mt-12 content:center 
  `,
})``;

const TextPromptSpacingContainer = styled.div.attrs({
  className: `position-center  left-0 right-0 bottom-0 w-full h-full z-10`,
})``;
