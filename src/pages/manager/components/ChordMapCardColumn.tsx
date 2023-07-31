import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import { ChordMapCard } from './ChordMapCard';

export function ChordMapColumn(): ReactElement {
  const downloadedChords = useStoreState(
    (store) => store.downloadedChords.chords,
  );

  return (
    <CardColumn>
      {downloadedChords.map((allProps, index) => (
        <ChordMapCard key={Math.random()} {...allProps} index={index} />
      ))}
    </CardColumn>
  );
}

const CardColumn = styled.div.attrs({
  className: `flex flex-wrap flex-row items-center center justify-center`,
})``;
