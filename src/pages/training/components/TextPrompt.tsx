import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';


const r = Math.random;

export function TextPrompt(): ReactElement {
  const indexOfTargetChord = useStoreState(
    (store) => store.currentSubindexInTrainingText,
  );
  const firstLineOfTargetText = useStoreState(
    (store) => store.targetTextLineOne,
  );
  const secondLineOfTargetText = useStoreState(
    (store) => store.targetTextLineTwo,
  );
  const isError = useStoreState(
    (store) => store.errorOccurredWhileAttemptingToTypeTargetChord,
  );
  const targetCharacterIndex = useStoreState((store) => store.targetCharacterIndex);
  const characterEntryMode = useStoreState((store) => store.characterEntryMode);


  return (

    
    <TextPromptContainer>
      <ChordRow >
        {(firstLineOfTargetText || [])?.map((chord, i) => {
          if (characterEntryMode === "CHORD" || i !== indexOfTargetChord)
            return <Chord
              key={r()}
              active={i === indexOfTargetChord}
              error={isError && i === indexOfTargetChord}
            >
              {chord}
            </Chord>
          else
            return <CharacterEntryChord word={chord} index={targetCharacterIndex} />
        })}
      </ChordRow>

      <ChordRow>
        {(secondLineOfTargetText || [])?.map((chord) => (
          <Chord key={r()}>{chord}</Chord>
        ))}
      </ChordRow>
    </TextPromptContainer>
  );
}

export default function CharacterEntryChord({ word, index }: { word: string, index: number | undefined }): ReactElement {
  if (index === undefined || index === null)
    return <span className="text-green-500" key={Math.random()}>{word}</span>

  const wordSplit = word.split("");
  return (
    <div style={{ display: 'flex', flexDirection: 'row', color: "red" }}>
      {wordSplit.slice(0, index).map((char) =>
        <span className="text-green-500" key={Math.random()}>{char}</span>
      )}
      <span className="text-blue-500">{wordSplit[index]}</span>
      {wordSplit.slice(index + 1).map((char) =>
        <span className="text-white" key={Math.random()}>{char}</span>
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
    text-md font-bold mt-12 flex flex-col items-center w-full justify-center text-white
    sm:text-xl md:text-2xl xl:mt-12
  `,
})``;
