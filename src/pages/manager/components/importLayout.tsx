import React, { ReactElement } from 'react';
import {_chordLayout} from '../controls/maps'
import {
  MainControls,
  appendLayoutToRow,
  sendCommandString,
  readGetOneAndToss
} from '../controls/mainControls'
import {resetLayoutDataTable} from '../../manager/components/resetDataTable'


const checkElement = async selector => {
  while ( document.querySelector(selector) === null) {
    await new Promise( resolve =>  requestAnimationFrame(resolve) )
  }
  return document.querySelector(selector); 
};



let thisArray = [];


async function importLayoutLibrary(e : any){
  thisArray = [];
  resetLayoutDataTable();
    console.log(e);
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file,'UTF-8');  
    const strValues = ["","","",""];
    fileReader.onload = async readerEvent =>{
      const content = readerEvent.target.result;
      console.log(content);
      //add here asdf
      const lines = content.split('\n');
      await lines.forEach(async(line)=> {
        const strAllValues = line.split(',');
            
        
        //console.log('dur '+ strAllValues)
        //const myArray = value.split(' ');

        

        //strValues[0] = strAllValues[1];
        strValues[1] = strAllValues[0];
        strValues[2] = strAllValues[1];
        strValues[3] = strAllValues[2];
        strValues[4] = strAllValues[3];
  
    
        //_chordLayout.push([convertHexadecimalChordToHumanString(hexChordString),strValues[1]]); //this ultimately isn't used
    
       await appendLayoutToRow(strValues, true);
        thisArray.push("VAR B4 "+strAllValues[0] +" "+strAllValues[1] +" "+strAllValues[2]);

        //console.log('This is the one '+ "VAR B4 "+strAllValues[0] +" "+strAllValues[1] +" "+strAllValues[2]+" "+strAllValues[3])
      });

    }

    
  }
  export async function storeAllChanges(){
    //console.log(thisArray.replace(/(\r\n|\n|\r)/gm, ""))
    for(let i=0; i<thisArray.length; i++){
      await sendCommandString(thisArray[i].replace(/(\r\n|\n|\r)/gm, ""));
    }
    await sendCommandString("VAR B0");

  }

  function click(){

      const element: HTMLElement = document.getElementById("file-input") as HTMLInputElement; //.innerHTML = "status: opened serial port";
      element.addEventListener('input', importLayoutLibrary);
       console.log('Clicked')
}

  export function ImportChordLayout(): ReactElement {
    return (
      <React.Fragment>
    
          <input id="file-input" type="file" name="name" style = {{display:'none'}}/>

<button
      id="importLayoutLibrary"
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      onClick={() => {document.getElementById('file-input').click(); click()}}
      >Import Layout</button>
          

      
      </React.Fragment>
    );
  }
  