import React, { ReactElement } from 'react';
import { _chordMaps } from '../controls/maps';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { createChord } from '../../../models/managerModels';

import {
  convertHumanStringToHexadecimalChord,
  convertHumanStringToHexadecimalPhrase,
  appendToRow,
  convertHexadecimalChordToHumanString,
} from '../controls/mainControls';
import { resetDataTable } from '../../manager/components/resetDataTable';

const checkElement = async (selector) => {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector);
};


  export function ImportChords(): ReactElement {
    const clearDownloadedChords = useStoreActions((store) => store.clearDownloadedChords);
    const setDownloadedChords = useStoreActions((store) => store.setDownloadedChords);
    const downloadedChords = useStoreState((store) => store.downloadedChords.chords);



    function importChordMapLibrary(e : any){
      clearDownloadedChords();
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(file,'UTF-8');
    
        fileReader.onload = readerEvent =>{
          const content = readerEvent.target.result;
          const lines = content.split('\n');
          lines.forEach(async(line)=> {
            const strAllValues = line.split(',');
            const humanChord = strAllValues.shift();
            const humanPhrase = strAllValues.join(','); //handles if there's a comma in the phrase
            const hexChordString = convertHumanStringToHexadecimalChord(humanChord);
            //console.log('Hex chord string '+ hexChordString)
            const hexPhraseString = convertHumanStringToHexadecimalPhrase(humanPhrase);
    
    
            const strValues = ["","","",""];
            strValues[0] = humanChord;
            strValues[1] = humanPhrase;
            strValues[2] = hexChordString;
            strValues[3] = hexPhraseString;    
            _chordMaps.push([convertHexadecimalChordToHumanString(hexChordString),strValues[1]]); //this ultimately isn't used
    
            //appendToRow(strValues,true);
          
            const tempCreated = createChord(strValues[0], strValues[1], strValues[3], strValues[4]);
            setDownloadedChords(tempCreated);
        
          });
        }
        //console.log(_chordMaps);
        //open file dialog box with only csv allowed
        //parse

      }
  
      function click(){
        document.getElementById('file-input').click();
        const elementChords: HTMLInputElement = document.getElementById("file-input") as HTMLInputElement; //.innerHTML = "status: opened serial port";
        elementChords.addEventListener('input', importChordMapLibrary);
 }
    return (


      <React.Fragment>

          <input id="file-input" type="file" name="name" style = {{display:'none'}} accept=".csv"/>

<button
      id="importChordMapLibrary"
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      onClick={() => {click()}}
      >Import Library</button>



      </React.Fragment>
    );
  }
