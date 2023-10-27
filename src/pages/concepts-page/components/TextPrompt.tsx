import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import ChordTextInput from './ChordTextInput';
import RenderQuestion from './RenderQuestion';
import generateTrainingData from '../util/generateTrainingData';
import EditFlashcard from './EditFlashcard';

export function TextPrompt() {
  const activeFlashCards = useStoreState((state) => state.activeFlashCards);

  console.log('Active Training Set:');
  console.log(activeFlashCards);

  const [trainingData, setTrainingData] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocused] = useState(false);

  const currentTrainingValue = trainingData[userInput.length];

  useEffect(() => {
    if (trainingData.length - userInput.length < 5) {
      const newTrainingData = generateTrainingData();
      setTrainingData([...trainingData, ...newTrainingData]);
    }

    setFocused(true);
  }, [userInput]);

  function focusTextBox() {
    setFocused(true);
    document.getElementById('txt_Name')?.focus();
  }

  function unfocusTextBox() {
    setFocused(false);
  }

  const regex = new RegExp('^[a-zA-Z ]{1}$');

  function checkInput(input: string) {
    if (input === 'Backspace' && inputValue.length > 0) {
      setInputValue(inputValue.slice(0, -1));
    } else if (input === 'Enter' && inputValue.length > 0) {
      // Checks to see if input is correct
      if (inputValue === currentTrainingValue.answer) {
        // TODO - Do something that implies the input is correct
        setUserInput([...userInput, inputValue]);
        console.log(userInput);
        console.log(trainingData);
        setInputValue('');
      } else {
        // TODO - Do something that implies the input is incorrect
      }
    } else if (regex.test(input)) {
      setInputValue(inputValue + input);
    }
  }

  return (
    <TextPromptContainer>
      {focused ? (
        <div>
          <TextPromptContainer onClick={() => focusTextBox()}>
            <RenderQuestion flashCard={currentTrainingValue} />
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
          <EditFlashcard />
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
