import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/store';
import ChordTextInput from './ChordTextInput';
import RenderQuestion from './RenderQuestion';
import generateTrainingData from '../util/generateTrainingData';

interface TextPromptProps {
  setActiveTraining: (active: boolean) => void;
}

export function TextPrompt({ setActiveTraining }: TextPromptProps) {
  const sessionTrainingData = useStoreState(
    (state) => state.sessionTrainingData,
  );

  const addTimeSessionTrainingData = useStoreActions(
    (state) => state.addTimeSessionTrainingData,
  );

  console.log(sessionTrainingData);

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
    if (sessionTrainingData.length != 0) {
      if (itemsInSession != sessionTrainingData.length) {
        setTrainingData([
          ...trainingData.slice(0, userInput.length),
          ...generateTrainingData(sessionTrainingData),
        ]);
        setItemsInSession(sessionTrainingData.length);
      }
      if (trainingData.length - userInput.length < 5) {
        setTrainingData([
          ...trainingData,
          ...generateTrainingData(sessionTrainingData),
        ]);
      }
      setFocused(true);
    } else {
      setActiveTraining(false);
    }
  }, [userInput, itemsInSession]);

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
          <TextPromptBox
            onClick={() => focusTextBox()}
            style={{ height: '200px ' }}
          >
            <RenderQuestion flashCard={currentTrainingValue.flashCard} />
          </TextPromptBox>
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

const TextPromptBox = styled.div.attrs({
  className: `
    flex text-md font-bold flex flex-col items-center w-full	justify-center text-gray-400
    sm:text-xl md:text-2xl bg-[#FFF] rounded-3xl p-4 h-50 m-auto font-mono
  `,
})``;
