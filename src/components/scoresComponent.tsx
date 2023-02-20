import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';
import { wpmMethodCalculatorForStoredChords } from '../../src/helpers/aggregation';

export function ScoresComponent(): ReactElement {
  const maxWPM = useStoreState((store) => store.fastestRecordedWordsPerMinute);

  const storedChordsFromDevice = useStoreState((store) => store.storedChordsFromDevice);

  let sumOfChordsMastered = 0;
  storedChordsFromDevice?.statistics?.forEach((d) => {
    sumOfChordsMastered += d.chordsMastered[d?.chordsMastered.length-1] == null || d?.chordsMastered.length == 0 || (d.chordsMastered.length ==1 && d.chordsMastered[0] == 0)? 0 : wpmMethodCalculatorForStoredChords(d?.chordsMastered);

  });

    const HideWhenScreenGetSmallEnough = styled.div `
    @media screen and (max-width: 1000px) {
      display: none;
    }
    `;

    return (
      <React.Fragment>
          <HideWhenScreenGetSmallEnough>
          <div className="h-2 text-white font-mono" style={{fontSize:"11px" }}>
      {
      //<div className="text-center">Hunt &#38; Pecker</div>
      }
      <table>
      <tr>
    <td>-</td>
    <td>tWPM</td>
    <td/>
    <td>-</td>
    <td>sWPM</td>

  </tr>
  <tr>
    <td>{(sumOfChordsMastered/100)?.toFixed(2)}</td>
    <td>ChM</td>
    <td/>
    <td>-</td>
    <td>StM</td>


  </tr>
  <tr>
    <td>{parseInt(Math.max.apply(Math, Object.values(maxWPM))?.toFixed())}</td>
    <td>CPM</td>
    <td/>
    <td>-</td>
    <td>CM</td>


  </tr>

      </table>
      </div>
      </HideWhenScreenGetSmallEnough>
      </React.Fragment>
    );
  }

