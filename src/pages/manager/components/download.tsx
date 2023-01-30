import React, { ReactElement } from 'react';
import {
    MainControls,
     sendCommandString, 
     selectBase,
     readGetOneChordmap,
     convertHexadecimalChordToHumanChord,
     convertHexadecimalPhraseToAsciiString,

    } from '../controls/mainControls'
    import {resetDataTable} from '../../manager/components/resetDataTable'

export async function getGetAll(){
  resetDataTable();
    //await selectBase(); //select BASE
    await sendCommandString("CML C0")
    const { value } = await MainControls.lineReader.read();
    const chordCountSplit = value.split(" ")
    const chordCountParsedValue = parseInt(chordCountSplit[chordCountSplit.length-1])

    for(let i=0;i<chordCountParsedValue;i++){
      console.log(MainControls._chordmapCountOnDevice);
      //wait sendCommandString("GETSOME "+(i+0).toString()+" "+(i+1).toString());
      await sendCommandString("CML C1 "+ i)
      //await sendCommandString('VAR '+'B3 '+'A '+element.innerHTML+" "+ s[0] + ' '+ s[1]);

        //console.log("MapID");
    //console.log(MainControls._chordmapId);
      await readGetOneChordmap();
    }
  
  }

  export async function downloadChordsForAllChordsModule(){
      //resetDataTable();
      //await selectBase(); //select BASE
      await sendCommandString("CML C0")
      const { value } = await MainControls.lineReader.read();
      const chordCountSplit = value.split(" ")
      const chordCountParsedValue = parseInt(chordCountSplit[chordCountSplit.length-1])
      const strValues = [];      
      const element: HTMLElement = document.getElementById("downloadCompletionPercentage") as HTMLInputElement;; //.innerHTML = "status: opened serial port";

      for(let i=0;i<chordCountParsedValue;i++){
        console.log(MainControls._chordmapCountOnDevice);
        //wait sendCommandString("GETSOME "+(i+0).toString()+" "+(i+1).toString());
        await sendCommandString("CML C1 "+ i)
        //await sendCommandString('VAR '+'B3 '+'A '+element.innerHTML+" "+ s[0] + ' '+ s[1]);
  
          //console.log("MapID");
      //console.log(MainControls._chordmapId);
       // await readGetOneChordmap();


        const { value } = await MainControls.lineReader.read();
        const spliter = value.split(' ');
        const tempCurrentChord=[];
        console.log(spliter)
        if (value) {
          const arrValue = [...spliter];
          //ascii_to_hexa(arrValue);
          const strValue = arrValue;
          let hexChordString = "";
          hexChordString = strValue[3]; //Should be 32 chacters at all times
          let hexAsciiString = "";
          hexAsciiString = strValue[4];
          //console.log('StrValue '+convertHexadecimalChordToHumanChord(hexChordString));
          tempCurrentChord[0] = convertHexadecimalChordToHumanChord(hexChordString);
          tempCurrentChord[1] = convertHexadecimalPhraseToAsciiString(hexAsciiString);
      }
      strValues.push(tempCurrentChord);
      element.innerHTML = "Chord Download Progress: "+ (((i/chordCountParsedValue)*100).toFixed(0))+'%';

    }

    localStorage.setItem("chordsReadFromDevice", JSON.stringify(strValues)); //Store downloaded chords in local storage
    return true

    }

  export function Download(): ReactElement {
    return (
      <React.Fragment>
      <div id="statusDiv" style={{display:'none'}} >Status: </div>

      <button
      className="text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-absolute"
      color="pink"
      onClick={() => getGetAll()}
      >Populate Table</button>
      </React.Fragment>
    );
  }