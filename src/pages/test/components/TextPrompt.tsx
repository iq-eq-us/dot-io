import React, { ReactElement, useState } from 'react';
import { FaBorderStyle } from 'react-icons/fa';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/store';
import { wpmMethodCalculator } from '../../../../src/helpers/aggregation';

const r = Math.random;

export function TextBlurredScreen() {
  const setTextPromptUnFocused = useStoreActions(
    (store) => store.setTextPromptUnFocused,
  );
  const setStartTimer = useStoreActions((store) => store.setStartTimer);

  return (
    <div
      className="wi from-green-800 bg-zinc-300 absolute w-full h-40 rounded-3xl pt-16 text-black"
      onClick={() => [
        document.getElementById('txt_Name')?.focus(),
        setTextPromptUnFocused(false),
        setStartTimer(true),
      ]}
    >
      Click to Re-Focus
    </div>
  );
}

export function TextPrompt(): ReactElement {
  const indexOfTargetChord = useStoreState(
    (store: any) => store.currentSubindexInTrainingText,
  );

  const setTextPromptUnFocused = useStoreActions(
    (store) => store.setTextPromptUnFocused,
  );

  const firstLineOfTargetText = useStoreState(
    (store: any) => store.targetTextLineOne,
  );
  const secondLineOfTargetText = useStoreState(
    (store: any) => store.targetTextLineTwo,
  );
  const isError = useStoreState(
    (store: any) => store.errorOccurredWhileAttemptingToTypeTargetChord,
  );

  const textPromptUnFocused = useStoreState(
    (store) => store.textPromptUnFocused,
  );

  const targetCharacterIndex = useStoreState(
    (store: any) => store.targetCharacterIndex,
  );
  const characterEntryMode = useStoreState(
    (store: any) => store.characterEntryMode,
  );
  const storeAllTypedText = useStoreActions(
    (store: any) => store.setAllTypedCharactersStore,
  );
  const allTypedText = useStoreState(
    (store: any) => store.allTypedCharactersStore,
  );
  const trainingTestCounter = useStoreState(
    (store: any) => store.trainingTestCounter,
  );
  const setTrainingTestCounter = useStoreActions(
    (store: any) => store.setTrainingTestCounter,
  );
  const currentTrainingScenario = useStoreState(
    (store: any) => store.currentTrainingScenario,
  );
  const setTypedTrainingText = useStoreActions(
    (store: any) => store.setTypedTrainingText,
  );
  const storedTestTextData = useStoreState(
    (store: any) => store.storedTestTextData,
  );
  const setS = useStoreState((store: any) => store.compareText);
  const setCurrentSubindexInTrainingText = useStoreActions(
    (store: any) => store.setCurrentSubindexInTrainingText,
  );
  const setEditingPreviousWord = useStoreActions(
    (store) => store.setUserIsEditingPreviousWord,
  );
  const isEditingPreviousWord = useStoreState(
    (store: any) => store.userIsEditingPreviousWord,
  );
  const setChordingEnabled = useStoreActions(
    (store: any) => store.setIsUsingChordingEnabledDevice,
  );
  const setNumberOfWordsChorded = useStoreActions(
    (store: any) => store.setNumberOfWordsChorded,
  );
  const numberOfWordsChorded = useStoreState(
    (store: any) => store.numberOfWordsChorded,
  );
  const isChordingEnabled = useStoreState(
    (store: any) => store.isUsingChordingEnabledDevice,
  );

  const [bestKeyTime, setBestKeyTime] = useState([]);
  const [letterPressed, setLetterPressed] = useState([]);
  const [keyDownTime, setKeyDownTime] = useState(performance.now());
  const [currentWord, setCurrentWord] = useState(undefined);
  const [
    targetIndexForWhatErrorTextToShow,
    setTargetIndexForWhatErrorTextToShow,
  ] = useState(0);

  const ChordingEnabledAlgorithm = (chordValue: any) => {
    window.performance = window.performance || {};
    performance.now =
      performance.now ||
      performance.mozNow ||
      performance.msNow ||
      performance.oNow ||
      performance.webkitNow ||
      Date.now * 1.0; /*none found - fallback to browser default */

    const body = document.getElementById('txt_Name');
    let isKeyDown = false;
    //if(sessionStorage.getItem('chordingEnabledDevice') == undefined || sessionStorage.getItem('chordingEnabledDevice') == 'false'){

    if (currentWord != chordValue && currentWord != undefined) {
      let numberOfBestTimesUnderTen = 0;
      if (letterPressed.includes('Backspace') && bestKeyTime.length > 2) {
        for (let i = 0; i < bestKeyTime.length - 1; i++) {
          if (bestKeyTime[i] <= 10) {
            numberOfBestTimesUnderTen++;
          }
        }
      }
      if (numberOfBestTimesUnderTen >= 2) {
        setChordingEnabled(true);
        setNumberOfWordsChorded();
        // console.log("setChordingEnabled "+ numberOfWordsChorded)
      }
      setBestKeyTime([]);
      setLetterPressed([]);
    }

    currentWord != chordValue ? setCurrentWord(chordValue) : ''; //This may need to run to set the value of the chord we're testing

    if (body != null) {
      body.onkeydown = function (e) {
        if (!e.metaKey) {
          e.stopPropagation();
        }

        if (!isKeyDown) {
          isKeyDown = true;
          //console.log(keyDownTime);
          setKeyDownTime(performance.now());
        }
        //console.log(keyDownTime);
      };

      body.onkeyup = function (e) {
        if (!e.metaKey) {
          e.stopPropagation();
        }
        isKeyDown = false;
        const upTime = performance.now();
        const heldTime = Math.ceil(upTime - keyDownTime);

        //console.log('Uptime '+ upTime);
        const tempBestTime = Math.min(10000, heldTime);
        bestKeyTime.push(tempBestTime);
        letterPressed.push(e.key);

        setBestKeyTime((bestKeyTime) => [...bestKeyTime]);
        setLetterPressed((letterPressed) => [...letterPressed]);
      };
    }

    //}//End of the first if statement
    //console.log('Baby youre enabled');
  };

  function whatTextToShow(
    targetTextLineOne: any,
    targetChordIndex: any,
    indexOfCharacterInTargetChord: any,
    arr: any,
  ) {
    // console.log(storedTestTextData)

    let displayArray = [];
    if (allTypedText.length >= 0 && storedTestTextData != undefined) {
      indexOfTargetChord - 1 == 0 &&
      targetIndexForWhatErrorTextToShow != allTypedText.length - 1
        ? setTargetIndexForWhatErrorTextToShow(allTypedText.length - 1)
        : '';
      //console.log('This is the stored test wordsasdasdj njk ajks djkm akdasd ' + setS)

      if (targetIndexForWhatErrorTextToShow > allTypedText.length) {
        setTargetIndexForWhatErrorTextToShow(0);
      }
      let spacesBetweenWords = 0;
      let characterLengthOfTheEntireLine = 0;

      if (
        targetChordIndex == 0 &&
        targetTextLineOne != undefined &&
        allTypedText.length >= 0
      ) {
        const tempArray = [];
        let tempValue = '';
        let tempBufferInTheFront = '';
        let tempBufferInTheBack = '';
        let y = 0;

        const tempVal =
          storedTestTextData[
            indexOfTargetChord + targetIndexForWhatErrorTextToShow
          ]?.length - arr.length;
        for (y; y < tempVal - targetCharacterIndex; y++) {
          tempBufferInTheBack += '.';
        }
        for (let g = 0; g < targetCharacterIndex; g++) {
          tempBufferInTheFront += '.';
        }
        tempArray.push(
          <React.Fragment>
            <span className="text-white m-0 flex">{tempBufferInTheFront}</span>
            <div className="text-gray-500">{arr}</div>
            <span className="text-white m-0 flex">{tempBufferInTheBack}</span>
          </React.Fragment>,
        );

        for (let f = 1; f < targetTextLineOne.length; f++) {
          tempValue = targetTextLineOne[f] + ' ';

          tempArray.push(<div className="text-white">{tempValue}</div>);
        }

        displayArray = tempArray;
        return [displayArray];
      }

      for (
        let i = targetIndexForWhatErrorTextToShow;
        i < allTypedText.length;
        i++
      ) {
        const compare = allTypedText[i];
        const alphabetCompare = setS[setS.length - 1];
        characterLengthOfTheEntireLine += storedTestTextData[i]?.length;

        //allTypedText

        if (
          compare.charAt(compare.length - 1) == ' ' ||
          currentTrainingScenario == 'ALPHABET'
        ) {
          if (
            compare.slice(0, -1) == storedTestTextData[i] ||
            (currentTrainingScenario && compare == storedTestTextData[i])
          ) {
            spacesBetweenWords += storedTestTextData[i]?.length;

            let placeholder = '';
            for (let k = 0; k < spacesBetweenWords; k++) {
              placeholder += '*';
            }

            displayArray.push(<div className="text-white">{placeholder}</div>);

            spacesBetweenWords = 0;
          } else {
            //Here we're checking if the typed word is greater than the stored value we are subtracting by 1 to account for the space bar
            if (allTypedText[i]?.length - 1 > storedTestTextData[i]?.length) {
              let periodsIfLengthOfTypedErrorIsLongerThanChordsLength = '';
              //Here we are looping through to get the length of the word thats being tested so that we can return '...' that are the length of the word
              for (let y = 0; y < storedTestTextData[i]?.length; y++) {
                periodsIfLengthOfTypedErrorIsLongerThanChordsLength += '.';
              }
              displayArray.push(
                <div className="text-gray">
                  {periodsIfLengthOfTypedErrorIsLongerThanChordsLength}
                </div>,
              );
            } else if (targetChordIndex != 0) {
              const tempValue =
                storedTestTextData[i]?.length - allTypedText[i]?.length;
              let tempBufferValues = '';

              for (let y = 0; y < tempValue; y++) {
                tempBufferValues += '.';
              }
              const thisNewArray = [];

              //This for loop returns after a word is complete. It checks if word the user typed is inccorect and if it is shows the incorrect words at the bottom of the word
              for (let t = 0; t < storedTestTextData[i]?.length; t++) {
                const tempCompareValue = allTypedText[i];
                const tempTargetWord = storedTestTextData[i];
                //console.log(allTypedText)
                //console.log('Compare T value '+ tempCompareValue[t]);
                //console.log('Temporary target value '+ tempTargetWord[t]);
                if (tempCompareValue != undefined) {
                  tempCompareValue[t] ==
                  (tempTargetWord[t] == undefined ? '' : tempTargetWord[t])
                    ? thisNewArray.push(
                        <span className="text-white m-0 flex">
                          {tempTargetWord[t]}
                        </span>,
                      )
                    : thisNewArray.push(
                        <span className=" m-0 flex">
                          {tempCompareValue[t]}
                        </span>,
                      );
                } else {
                  thisNewArray.push(
                    <span className="text-white m-0 flex">
                      {tempTargetWord[t]}
                    </span>,
                  );
                }
              }
              displayArray.push(
                <span className="m-0 flex">{thisNewArray}</span>,
              );
            }
          }
        }
        if (allTypedText.length - i == 1) {
          const y = allTypedText.length;
          for (
            let d = y;
            d < targetTextLineOne.length + targetIndexForWhatErrorTextToShow;
            d++
          ) {
            let sd = '';
            for (let r = 0; r < storedTestTextData[d]?.length; r++) {
              sd += '2';
            }
            sd += ' ';
            d == y ? sd == sd.slice(1) : sd;
            displayArray.push(<div className="text-white">{sd}</div>);
          }

          //This peice of code handles the experience while your typing in real time
          if (arr.length != 0) {
            const tempVal =
              storedTestTextData[
                indexOfTargetChord + targetIndexForWhatErrorTextToShow
              ].length - arr.length;
            let tempBufferValues = '';
            let frontBufferValues = '';

            for (let y = 0; y < tempVal - targetCharacterIndex; y++) {
              tempBufferValues += '.';
            }
            for (let g = 0; g < targetCharacterIndex; g++) {
              frontBufferValues += '.';
            }
            displayArray[indexOfTargetChord] = (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {frontBufferValues.indexOf('.') != -1 ? (
                  <span className="text-white m-0 flex">
                    {frontBufferValues}
                  </span>
                ) : (
                  ''
                )}
                <span className="text-gray flex m-0">{arr}</span>
                {tempBufferValues.indexOf('.') != -1 ? (
                  <span className="text-white m-0 flex">
                    {tempBufferValues}
                  </span>
                ) : (
                  ''
                )}
              </div>
            );
          }
        }
      }
    }

    //This  code here handles the logic in the case the user back spaces to edit an errored word
    const input = document.getElementById(
      'txt_Name',
    ) as unknown as HTMLInputElement;
    if (input != null) {
      input.onkeydown = (e) => {
        if (!e.metaKey) {
          e.stopPropagation();
        }
        setKeyDownTime(performance.now());
        const key = e.key;
        const sub = indexOfTargetChord - 1;
        //const key = event.key; // const {key} = event; ES6+

        if (
          (key === 'Backspace' || key === 'Delete') &&
          indexOfTargetChord + targetIndexForWhatErrorTextToShow ==
            allTypedText.length &&
          input.value.length == 0
        ) {
          if (allTypedText[indexOfTargetChord - 1] != undefined) {
            input.innerHTML = allTypedText[indexOfTargetChord - 1];
            const tt = allTypedText[allTypedText.length - 1];

            const canIPressBackspaceForAlphabet =
              allTypedText[
                indexOfTargetChord - 1 + targetIndexForWhatErrorTextToShow
              ] !=
                storedTestTextData[
                  indexOfTargetChord - 1 + targetIndexForWhatErrorTextToShow
                ] && indexOfTargetChord != 0;
            if (
              (allTypedText[
                indexOfTargetChord - 1 + targetIndexForWhatErrorTextToShow
              ].slice(0, -1) !=
                storedTestTextData[
                  indexOfTargetChord - 1 + targetIndexForWhatErrorTextToShow
                ] &&
                indexOfTargetChord != 0 &&
                currentTrainingScenario != 'ALPHABET') ||
              (currentTrainingScenario == 'ALPHABET' &&
                canIPressBackspaceForAlphabet)
            ) {
              setEditingPreviousWord(true);
              setCurrentSubindexInTrainingText(sub);
              input.value = tt;
              allTypedText.pop();
            }
          }
        }
      };

      // displayArray = firstWordOrCharacter ? <div className='text-white'>[</div>: displayArray;
    }
    //console.log('Check if the array is empty '+ arr);
    return displayArray;
  }

  function letsFix(
    word,
    indexOfCharacterInTargetChord,
    indexOfTargetChord,
    setS,
  ) {
    let arr: string[] = [];
    const conditionalValue = allTypedText.length - indexOfTargetChord;
    const input = document.getElementById(
      'txt_Name',
    ) as unknown as HTMLInputElement;

    if (
      setS[setS.length - 1] == ' ' &&
      indexOfTargetChord != allTypedText.length &&
      conditionalValue < 1
    ) {
      //console.log('This is exactly what Im stoing ' + setS)
      storeAllTypedText(setS);
      setTypedTrainingText('');
      arr = [];
      return;
    }

    //Add if the target index of the second array that houses content .length is greater than 1 we read that in
    const wordSplit =
      word != undefined &&
      indexOfTargetChord != undefined &&
      indexOfCharacterInTargetChord != undefined
        ? word[indexOfTargetChord]
        : '';
    if (wordSplit[indexOfCharacterInTargetChord] != setS && setS != undefined) {
      if (
        wordSplit[indexOfCharacterInTargetChord - 1] !=
        setS[indexOfCharacterInTargetChord]
      ) {
        for (
          let counter = indexOfCharacterInTargetChord;
          counter < setS.length;
          counter++
        ) {
          arr.push(setS[counter]);
        }
      }
    }
    const sd =
      indexOfTargetChord == 0 &&
      allTypedText[allTypedText?.length - 1]?.length == 0;
    if (firstLineOfTargetText != undefined) {
      if (
        setS[setS.length - 1] == ' ' ||
        (currentTrainingScenario == 'ALPHABET' &&
          setS[setS.length - 1] ==
            firstLineOfTargetText[indexOfTargetChord - 1]) ||
        (currentTrainingScenario == 'ALPHABET' &&
          firstLineOfTargetText.length - 1 == indexOfTargetChord &&
          setS[setS.length - 1] == firstLineOfTargetText[indexOfTargetChord]) ||
        (indexOfTargetChord == 1 && input?.value.length == 0) ||
        (indexOfTargetChord == 0 && input?.value.length == 0)
      ) {
        arr = [];
      }
    }
    return whatTextToShow(
      firstLineOfTargetText,
      indexOfTargetChord,
      indexOfCharacterInTargetChord,
      arr,
    );
  }

  function colorTargetLine(firstLineValue: any[]) {
    const newTargetLine = [];

    for (let i = 0; i < firstLineValue?.length; i++) {
      const coloredWordToPush = [];
      if (i < indexOfTargetChord) {
        for (let t = 0; t < firstLineOfTargetText[i]?.length; t++) {
          const tempCompareValue =
            allTypedText[i + targetIndexForWhatErrorTextToShow];
          const tempTargetWord = firstLineOfTargetText[i];
          // bevause the length og the gitdy line is larger than second we run into issues
          if (tempCompareValue != undefined) {
            tempCompareValue[t] ==
            (tempTargetWord[t] == undefined ? '' : tempTargetWord[t])
              ? coloredWordToPush.push(
                  <div className="text-black whitespace-pre-wrap m-0 flex">
                    <span>{tempTargetWord[t]}</span>
                  </div>,
                )
              : coloredWordToPush.push(
                  <div className="text-red-500 m-0 whitespace-pre-wrap flex">
                    <span>{tempTargetWord[t]}</span>
                  </div>,
                );
          } else {
            coloredWordToPush.push(
              <span className="text-red m-0 whitespace-pre-wrap flex">
                {tempTargetWord[t]}
              </span>,
            );
          }
        }
        newTargetLine.splice(
          i,
          1,
          <React.Fragment>
            <div className="m-0 whitespace-pre-wrap">
              <span className="flex">{coloredWordToPush}</span>
            </div>
          </React.Fragment>,
        );
      } else {
        newTargetLine.push(firstLineValue[i]);
      }
    }

    return newTargetLine;
  }
  //This function Handles the focus panel
  function isFocused() {
    const inputValue = document.getElementById('txt_Name') as HTMLInputElement;
    const isFocused = document.activeElement === inputValue;
    if (!isFocused) {
      return TextBlurredScreen();
    } else {
      setTextPromptUnFocused(false);
    }
  }

  return (
    <React.Fragment>
      <div className="text-red-500" />

      <TextPromptContainer>
        {textPromptUnFocused ? isFocused() : isFocused()}
        <ChordRow>
          {(colorTargetLine(firstLineOfTargetText) || [])?.map(
            (chord: any, i: any) => {
              if (characterEntryMode === 'CHORD' || i !== indexOfTargetChord) {
                return (
                  <Chord
                    key={r()}
                    active={i === indexOfTargetChord}
                    error={isError && i === indexOfTargetChord}
                  >
                    {chord}
                  </Chord>
                );
              } else {
                {
                  ChordingEnabledAlgorithm(chord);
                } //This call checks to see if the a chorded device was used
                /* eslint-disable */
                return (
                  <CharacterEntryChord
                    word={chord}
                    index={targetCharacterIndex}
                  />
                );
                /* eslint-disable */
              }
            },
          )}
        </ChordRow>
        <ChordRow>
          {letsFix(
            firstLineOfTargetText,
            targetCharacterIndex,
            indexOfTargetChord,
            setS,
          )}
        </ChordRow>

        <ChordRow>
          {(secondLineOfTargetText || [])?.map((chord) => (
            <Chord key={r()}>{chord}</Chord>
          ))}
        </ChordRow>
      </TextPromptContainer>
    </React.Fragment>
  );
}

export default function CharacterEntryChord({
  word,
  index,
}: {
  word: string;
  index: number | undefined;
}): ReactElement {
  if (index === undefined || index === null)
    return (
      <span className="text-black whitespace-pre-wrap" key={Math.random()}>
        {word}
      </span>
    );

  const wordSplit = word.split('');

  return (
    <div
      style={{ whiteSpace: 'pre-wrap', flexDirection: 'row', color: 'gray' }}
    >
      {wordSplit.slice(0, index).map((char) => (
        <span className="text-black whitespace-pre-wrap" key={Math.random()}>
          {char}
        </span>
      ))}
      <span className="text-white bg-black whitespace-pre-wrap">
        {wordSplit[index]}
      </span>
      {wordSplit.slice(index + 1).map((char) => (
        <span className="text-grey" key={Math.random()}>
          {char}
        </span>
      ))}
    </div>
  );
}

interface ChordProps {
  active?: boolean;
  error?: boolean;
}

const Chord = styled.span.attrs<ChordProps>((props) => ({
  className: `${props.active ? 'text-blue-500 underline' : ''} ${
    props.error ? 'text-red-500' : ''
  }`,
}))<ChordProps>``;

const ChordRow = styled.div.attrs({
  className: `flex flex-row gap-[1vw] whitespace-nowrap justify-center w-full`,
})``;

const TextPromptContainer = styled.div.attrs({
  className: `
    flex text-md font-bold flex flex-col items-center w-full	 justify-center text-gray-400
    sm:text-xl md:text-2xl bg-[#FFF] rounded-3xl p-10 h-40	m-auto font-mono
  `,
})``;
