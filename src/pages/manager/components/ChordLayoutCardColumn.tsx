import React,  { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import { ChordLayoutCard } from './ChordLayoutCard';



export function ChordLayoutColumn(): ReactElement {
  const downloadedChordLayout = useStoreState((store) => store.downloadedChordLayout.chordLayout);

  return (

    <CardLayoutColumn>
        {downloadedChordLayout.map((props) => (
        <ChordLayoutCard
        key={Math.random()}
        {...props}
        />
            ))}
    </CardLayoutColumn>
  );

}


const CardLayoutColumn = styled.div.attrs({
  className: `flex flex-wrap flex-col items-center center justify-center`,
})``;
