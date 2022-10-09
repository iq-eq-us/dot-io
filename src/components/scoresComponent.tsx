import React, { ReactElement } from 'react';
import { getHighestWPM } from '../../src/pages/manager/components/chordGraphs';
import { getAverageWPM } from '../../src/pages/manager/components/chordGraphs';




export function ScoresComponent(): ReactElement {
    return (
      <React.Fragment>
          <div className="h-2 text-white font-mono" style={{fontSize:"11px"}}>
      <div className="text-center">Hunt &#38; Pecker</div>
      <table>
      <tr>
    <td>{getHighestWPM()}</td>
    <td>tWPM</td>
    <td/>
    <td>{getAverageWPM()}</td>
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
    <td>-</td>
    <td>CPM</td>
    <td/>
    <td>-</td>
    <td>CM</td>


  </tr>

      </table>
      </div>
      </React.Fragment>
    );
  }