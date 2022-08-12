import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../../store/store';


const r = Math.random;


export function TextPrompt(): ReactElement {
  const indexOfTargetChord = useStoreState(
    (store : any) => store.currentSubindexInTrainingText,
  );
  const firstLineOfTargetText = useStoreState(
    (store : any) => store.targetTextLineOne,
  );
  const secondLineOfTargetText = useStoreState(
    (store : any) => store.targetTextLineTwo,
  );
  const isError = useStoreState(
    (store : any) => store.errorOccurredWhileAttemptingToTypeTargetChord,
  );
  const isEnabled = useStoreState((store : any) => store.isUsingChordingEnabledDevice);
  const targetCharacterIndex = useStoreState((store : any) => store.targetCharacterIndex);
  const characterEntryMode = useStoreState((store : any) => store.characterEntryMode);
  const setChordingEnabled = useStoreActions((store : any) => store.setIsUsingChordingEnabledDevice);

  const [bestKeyTime, setBestKeyTime] = useState([]);
  const [letterPressed, setLetterPressed] = useState([]);
  const [keyDownTime, setKeyDownTime] = useState(performance.now());
  const [currentWord, setCurrentWord] = useState(undefined);



  const getCheckAlgo = (chordValue)  => {
    
    window.performance = window.performance || {};
    performance.now = 
    performance.now       ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    Date.now * 1.0; /*none found - fallback to browser default */


  const body = document.getElementById('txt_Name');
  let isKeyDown = false;
  if(sessionStorage.getItem('chordingEnabledDevice') == undefined || sessionStorage.getItem('chordingEnabledDevice') == 'false'){

  if(currentWord != chordValue && currentWord != undefined) {
    let numberOfBestTimesUnderTen = 0;
      if(letterPressed.includes('Backspace') && bestKeyTime.length>2){
          for(let i =0; i<bestKeyTime.length-1; i++){
            if(bestKeyTime[i] < 10) {
              numberOfBestTimesUnderTen++;
            }
          }
      }
      if(numberOfBestTimesUnderTen >= 2){
        setChordingEnabled(true);
      }
      setBestKeyTime([]);
      setLetterPressed([]);
   
  }

  currentWord != chordValue ? setCurrentWord(chordValue) : '';//This may need to run to set the value of the chord we're testing


  body.onkeydown = function (e) {
    if ( !e.metaKey ) {
        e.stopPropagation();
    }

    if (!isKeyDown) {
      isKeyDown = true;
      console.log(keyDownTime);
      setKeyDownTime(performance.now());

    }
    console.log(keyDownTime);
  };

  body.onkeyup = function (e) {
    if ( !e.metaKey ) {
      e.stopPropagation();
    }
    isKeyDown = false;
    const upTime = performance.now();
    const heldTime = Math.ceil(upTime - keyDownTime);
    console.log(keyDownTime);
    console.log(keyDownTime);
    console.log('Held time '+ heldTime);
    console.log('Uptime '+ upTime);
    const tempBestTime = Math.min(10000, heldTime);
    bestKeyTime.push(tempBestTime);
    letterPressed.push(e.key);
    //let scanRate = Math.min(1000 / (bestKeyTime), 1000);
    //console.log(keyDownTime.length);
    console.log('Just e '+e.type)
    console.log('Just e 2 '+e.key)

    setBestKeyTime(bestKeyTime => [...bestKeyTime]);
    setLetterPressed(letterPressed => [...letterPressed]);
    console.log('This is the Best Time '+bestKeyTime);
    console.log('This is the associated letter pressed '+ letterPressed);


  };

  }//End of the first if statement 
  }

  return (

    <TextPromptContainer>
      <ChordRow >
        {(firstLineOfTargetText || [])?.map((chord : any, i : any) => {
          if (characterEntryMode === "CHORD" || i !== indexOfTargetChord){

            return <Chord
              key={r()}
              active={i === indexOfTargetChord}
              error={isError && i === indexOfTargetChord}
            >
            {chord}

            </Chord>
            }
          else{
            return <CharacterEntryChord word={chord} index={targetCharacterIndex} />
          }
        })}
      </ChordRow>

      <ChordRow>
        {(secondLineOfTargetText || [])?.map((chord : any) => (
          <Chord key={r()}>{chord}</Chord>
        ))
        }
      </ChordRow>
    </TextPromptContainer>
  );
}

export default function CharacterEntryChord({ word, index }: { word: string, index: number | undefined }): ReactElement {
  if (index === undefined || index === null)
    return <span className="text-green-500" key={Math.random()}>{word}</span>

  const wordSplit = word.split("");
  return (
    <div style={{ display: 'flex', flexDirection: 'row', color: "gray" }}>
      {wordSplit.slice(0, index).map((char) =>
        <span className="text-green-500" key={Math.random()}>{char}</span>
      )}
      <span className="text-blue-500 animate-pulse">{wordSplit[index]}</span>
      {wordSplit.slice(index + 1).map((char) =>
        <span className="text-grey" key={Math.random()}>{char}</span>
      )}
    </div>
    
  )
}


interface ChordProps {
  active?: boolean;
  error?: boolean;
}

const Chord = styled.span.attrs<ChordProps>((props) => ({
  className: `${props.active ? 'text-blue-500 underline' : ''} ${props.error ? 'text-red-500' : ''
    }`,
})) <ChordProps>``;

const ChordRow = styled.div.attrs({
  className: `flex flex-row gap-[1vw] justify-center w-full`,
})``;

const TextPromptContainer = styled.div.attrs({
  className: `
    flex text-md font-bold mt-12 flex flex-col items-center w-11/12 justify-center text-gray-400
    sm:text-xl md:text-2xl xl:mt-29 bg-[#FFF] rounded-3xl p-10 h-40	m-auto
  `,
})``;
