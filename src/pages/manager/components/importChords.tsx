import React, { ReactElement } from 'react';
import {actionMap, keyMapDefaults, _chordMaps} from '../controls/maps'
import {
  MainControls,
  sendCommandString, 
  readGetOneAndToss, 
  selectBase, 
  selectConfig,
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
      let content = readerEvent.target.result;
      console.log(content);
      //add here asdf
      let lines = content.split('\n');
      lines.forEach(async(line)=> {
        let strAllValues = line.split(',');
        let humanChord = strAllValues.shift();
        let humanPhrase = strAllValues.join(','); //handles if there's a comma in the phrase
        let hexChordString = convertHumanStringToHexadecimalChord(humanChord);
        let hexPhraseString = convertHumanStringToHexadecimalPhrase(humanPhrase);
        
        
        let strValues = ["","","",""];
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
  