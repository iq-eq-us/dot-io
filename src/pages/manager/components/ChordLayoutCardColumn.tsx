import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import { ChordLayoutCard } from './ChordLayoutCard';

export function ChordLayoutColumn(): ReactElement {
  const downloadedChordLayout = useStoreState(
    (store) => store.downloadedChordLayout.chordLayout,
  );

  return (
    <CardLayoutColumn>
      {downloadedChordLayout.map((props, index) => (
        <ChordLayoutCard key={Math.random()} {...props} index={index} />
      ))}
    </CardLayoutColumn>
  );
}

const CardLayoutColumn = styled.div.attrs({
  className: `flex flex-wrap flex-row items-center center justify-center`,
})``;
