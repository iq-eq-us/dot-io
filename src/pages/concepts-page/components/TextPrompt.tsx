import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import ChordTextInput from './ChordTextInput';

export function TextPrompt() {
  const [mounted, setMounted] = useState(false);
  const [trainingData, setTrainingData] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocused] = useState(false);

  const exampleFlashCard = [
    {
      image: false,
      question: 'hi',
      answer: 'hello',
      url: '',
      tags: [],
      ebbinghausValue: 0,
      lastReinforcement: '10/19/2023',
    },
    {
      image: true,
      question: '',
      answer: 'hello',
      url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Dapple&psig=AOvVaw3_NAslVKoLj3uDyTX3vWLV&ust=1697909481702000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPjt2u6ThYIDFQAAAAAdAAAAABAE',
      tags: [],
      ebbinghausValue: 0,
      lastReinforcement: '10/19/2023',
    },
  ];

  useEffect(() => {
    // Use as condition in future - || trainingData.length - userInput.length <  5
    if (!mounted) {
      setTrainingData(exampleFlashCard);
      setMounted(true);
    } else {
      setFocused(true);
    }
  }, [mounted, userInput]);

  function focusTextBox() {
    setFocused(true);
    document.getElementById('txt_Name')?.focus();
  }

  function checkInput(input: string) {
    if (input === 'Backspace' && inputValue.length > 0) {
      setInputValue(inputValue.slice(0, -1));
    } else if (input === 'Enter' && inputValue.length > 0) {
      // Checks to see if input is correct
      if (inputValue === trainingData[userInput.length]) {
        // TODO - Do something that implies the input is correct
        setUserInput([...userInput, inputValue]);
        setInputValue('');
      } else {
        // TODO - Do something that implies the input is incorrect
      }
    } else {
      setInputValue(inputValue + input);
    }
  }

  return (
    <TextPromptContainer>
      {focused ? (
        <div>
          <TextPromptContainer onClick={() => focusTextBox()}>
            hello
          </TextPromptContainer>
          <ChordTextInput onKeyDown={checkInput} value={inputValue} />
        </div>
      ) : (
        <div onClick={() => focusTextBox()}>not focused</div>
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
