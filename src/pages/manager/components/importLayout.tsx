import React, { ReactElement } from 'react';
import {_chordLayout} from '../controls/maps'
import {
  MainControls,
  appendLayoutToRow,
  sendCommandString,
  readGetOneAndToss
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
        
        console.log('the response for IDS '+ MainControls._chordmapId + ' ' + MainControls._firmwareVersion)
        
        const strValues = ["","","",""];
        //console.log('dur '+ strAllValues)
        //const myArray = value.split(' ');

        

        //strValues[0] = strAllValues[1];
        strValues[1] = strAllValues[0];
        strValues[2] = strAllValues[1];
        strValues[3] = strAllValues[2];
        strValues[4] = strAllValues[3];
  
    
       // _chordMaps.push([convertHexadecimalChordToHumanString(hexChordString),strValues[1]]); //this ultimately isn't used
    
        appendLayoutToRow(strValues, true);
        console.log('This is the one '+ "VAR B4 "+strAllValues[0] +" "+strAllValues[1] +" "+strAllValues[2]+" "+strAllValues[3])
        await sendCommandString("VAR B4 "+strAllValues[1] +" "+strAllValues[2]+" "+strAllValues[3]);
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

  export function ImportChordLayout(): ReactElement {
    return (
      <React.Fragment>
    
          <input id="file-input" type="file" name="name" style = {{display:'none'}}/>

<button
      id="importChordMapLibrary"
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      onClick={() => {document.getElementById('file-input').click(); click()}}
      >Import Layout</button>
          

      
      </React.Fragment>
    );
  }
  