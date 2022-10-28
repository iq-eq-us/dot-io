import React, { ReactElement } from 'react';
import { getHighestWPM } from '../../src/pages/manager/components/chordGraphs';
import { getAverageWPM } from '../../src/pages/manager/components/chordGraphs';
import styled from 'styled-components';



export function ScoresComponent(): ReactElement {
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
    <td>aWPM</td>

  </tr>
  <tr>
    <td>-</td>
    <td>ChM</td>
    <td/>
    <td>-</td>
    <td>StM</td>


  </tr>
  <tr>
    <td>{getHighestWPM() *5}</td>
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

