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
