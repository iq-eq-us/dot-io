import React, { ReactElement } from 'react';
import {_chordMaps} from '../controls/maps'
import {

  convertHumanStringToHexadecimalChord,
  convertHumanStringToHexadecimalPhrase,
  appendToRow,
  convertHexadecimalChordToHumanString
} from '../controls/mainControls'
import {resetDataTable} from '../../manager/components/resetDataTable'


const checkElement = async selector => {
  while ( document.querySelector(selector) === null) {
    await new Promise( resolve =>  requestAnimationFrame(resolve) )
  }
  return document.querySelector(selector); 
};






function importChordMapLibrary(e : any){
  resetDataTable();
    console.log(e);
    const file = e.target.files[0];
      console.log('im here')
    const fileReader = new FileReader();
    fileReader.readAsText(file,'UTF-8');  

    fileReader.onload = readerEvent =>{
      const content = readerEvent.target.result;
      console.log(content);
      //add here asdf
      const lines = content.split('\n');
      lines.forEach(async(line)=> {
        const strAllValues = line.split(',');
        const humanChord = strAllValues.shift();
        const humanPhrase = strAllValues.join(','); //handles if there's a comma in the phrase
        const hexChordString = convertHumanStringToHexadecimalChord(humanChord);
        const hexPhraseString = convertHumanStringToHexadecimalPhrase(humanPhrase);
        
        
        const strValues = ["","","",""];
        strValues[0] = humanChord;
        strValues[1] = humanPhrase;
        strValues[2] = hexChordString;
        strValues[3] = hexPhraseString;
        console.log(strValues);
    
        _chordMaps.push([convertHexadecimalChordToHumanString(hexChordString),strValues[1]]); //this ultimately isn't used
    
        appendToRow(strValues,true);
      });
    }
    //console.log(_chordMaps);
    //open file dialog box with only csv allowed
    //parse
  }
  function click(){

      const element: HTMLElement = document.getElementById("file-input") as HTMLInputElement; //.innerHTML = "status: opened serial port";
      element.addEventListener('input', importChordMapLibrary);
       console.log('Clicked')
}

  export function ImportChords(): ReactElement {
    return (
      <React.Fragment>
    
          <input id="file-input" type="file" name="name" style = {{display:'none'}}/>

<button
      id="importChordMapLibrary"
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      onClick={() => {document.getElementById('file-input').click(); click()}}
      >Import Library</button>
          

      
      </React.Fragment>
    );
  }
  