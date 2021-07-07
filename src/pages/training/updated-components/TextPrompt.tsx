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

  return (
    <TextPromptContainer>
      <ChordRow>
        {(firstLineOfTargetText || [])?.map((chord, i) => (
          <Chord
            key={r()}
            active={i === indexOfTargetChord}
            error={isError && i === indexOfTargetChord}
          >
            {chord}
          </Chord>
        ))}
      </ChordRow>

      <ChordRow>
        {(secondLineOfTargetText || [])?.map((chord) => (
          <Chord key={r()}>{chord}</Chord>
        ))}
      </ChordRow>
    </TextPromptContainer>
  );
}

interface ChordProps {
  active?: boolean;
  error?: boolean;
}

const Chord = styled.span.attrs<ChordProps>((props) => ({
  className: `${props.active ? 'text-green-500 underline' : ''} ${
    props.error ? 'text-red-500' : ''
  }`,
}))<ChordProps>``;

const ChordRow = styled.div.attrs({
  className: `flex flex-row gap-[1vw] justify-center w-full`,
})``;

const TextPromptContainer = styled.div.attrs({
  className: `
    text-md font-bold mt-12 flex flex-col items-center w-full justify-center text-white
    sm:text-xl md:text-2xl xl:mt-12
  `,
})``;
