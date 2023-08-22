import React, { ReactElement } from 'react';
import {
  commitTo,
  MainControls,
  pressCommitButton,
  clickCommit,
  asyncCallWithTimeout,
} from '../controls/mainControls';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  convertHumanChordToHexadecimalChord,
  convertHumanStringToHexadecimalPhrase,
  sendCommandString,
} from '../controls/mainControls';
function greet() {
  console.log('trigger timeout');
}

export function PressCommit(): ReactElement {
  const downloadedChords = useStoreState(
    (store) => store.downloadedChords.chords,
  );

  async function saveAll() {
    console.log('saveAll()');
    //iterate through table from bottom to top to see if there's a commit enabled
    //TODO check if we need to skip the header row
    const element: HTMLElement = document.getElementById(
      'commitAllProgress',
    ) as HTMLInputElement; //.innerHTML = "status: opened serial port";
    for (let i = 0; i < downloadedChords.length; i++) {
      const card = downloadedChords[i];
      const hexChord = convertHumanChordToHexadecimalChord(card.currentChord);
      const hexPhrase = convertHumanStringToHexadecimalPhrase(
        card.currentPhrase,
      );
      //await sendCommandString('CML C3 '+hexChord +' '+hexPhrase );
      //sendCommandString('CML C3 ' + newHexChord + ' ' + newHexPhrase);

      //const myTimeout = await setTimeout(pressCommitButton,i*500,i+1);//Fiddle with this
      //await asyncCallWithTimeout(clickCommit(i), 6000, i);//Fiddle with this
      //await clickCommit(i);

      //myTimeout.
      //clearTimeout(myTimeout)
      await wontTimeout(
        sendCommandString('CML C3 ' + hexChord + ' ' + hexPhrase),
        i,
      );
      await sleep();

      element.innerHTML =
        'Commit Progress: ' +
        ((i / downloadedChords.length) * 100).toFixed(0) +
        '% Please do not touch your device until completion.';

      //rows would be accessed using the "row" variable assigned in the for loop
    }
  }
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function sleep() {
    await timeout(1000);
    return greet;
  }
  const wontTimeout = async (func, virtualId) => {
    try {
      const { data } = await asyncCallWithTimeout(func, 10000, virtualId);
      console.log(data);
    } catch (err) {
      await asyncCallWithTimeout(func, 10000, virtualId);
    }
  };

  return (
    <React.Fragment>
      <button
        className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
        color="pink"
        onClick={async () => saveAll()}
      >
        Save All{' '}
      </button>
    </React.Fragment>
  );
}
