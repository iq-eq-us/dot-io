import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
//import { ChordMapCard } from './ChordMapCard';

export function FlashcardMapCardColumn(): ReactElement {
  const downloadedChords = useStoreState(
    (store) => store.downloadedChords.chords,
  );

  return <CardColumn></CardColumn>;
}

const CardColumn = styled.div.attrs({
  className: `flex flex-wrap flex-row items-center center justify-center`,
})``;
/* {downloadedChords.map((allProps, index) => (
        //<ChordMapCard key={Math.random()} {...allProps} index={index} 
      ))}*/
