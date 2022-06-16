import React, { ReactElement } from 'react';
import {
    MainControls,
     sendCommandString, 
     readGetOneAndToss, 
     enableSerialChordOutput,
     cancelReader,
     readGetHexChord,
     convertHexadecimalChordToHumanString,
     chord_to_noteId,
     noteId_to_chord,
     selectBase,
     setupLineReader,
     convertHumanStringToHexadecimalPhrase,
     convertHumanStringToHexadecimalChord
    } from '../controls/mainControls'




export function addHeadersToDataTable(){
    console.log("addHeadersToDataTable()");
    const dataTable: HTMLTableElement = document.getElementById("dataTable") as  HTMLTableElement;
    dataTable.setAttribute('style', 'margin-left: auto; margin-right: auto;');
    const header: HTMLTableSectionElement = dataTable.createTHead() as  HTMLTableSectionElement;
    const row: HTMLTableRowElement = dataTable.insertRow(0) as HTMLTableRowElement; //insert row at top
    const cells = [];
    cells.push(row.insertCell(-1) as HTMLTableCellElement); //0 virtual id
    cells[0].innerHTML = "Virtual Id" ;
    cells.push(row.insertCell(-1)); //1 chord edit button
    cells[0].setAttribute('style','border: 1px solid white; padding:10px;')
    cells[1].innerHTML = "Edit Chord";
    cells[1].setAttribute('style','border: 1px solid white; padding:10px;')
    cells.push(row.insertCell(-1)); //2 chord string (locked)
    cells[2].innerHTML = "Current Chord";
    cells[2].setAttribute('style','border: 1px solid white; padding:10px;')
    cells.push(row.insertCell(-1)); //3 phrase (locked)
    cells[3].innerHTML = "Current Phrase";
    cells[3].setAttribute('style','border: 1px solid white; padding:10px;')
    cells.push(row.insertCell(-1)); //4 chord string new (locked)
    cells[4].innerHTML = "New Chord";
    cells[4].setAttribute('style','border: 1px solid white; padding:10px; text-align: center;')
    cells.push(row.insertCell(-1)); //5 phrase new (open)
    cells[5].innerHTML = "New Phrase";
    cells[5].setAttribute('style','border: 1px solid white; padding:10px;')
    cells.push(row.insertCell(-1)); //6 delete - flags chord for deletion
    cells[6].innerHTML = "Delete";
    cells[6].setAttribute('style','border: 1px solid white; padding:10px;')
    cells.push(row.insertCell(-1)); //7 revert
    cells[7].innerHTML = "Revert";
    cells[7].setAttribute('style','border: 1px solid white; padding:10px;')
    cells.push(row.insertCell(-1)); //8 commit
    cells[8].innerHTML = "Commit";
    cells[8].setAttribute('style','border: 1px solid white; padding:10px;')
    cells.push(row.insertCell(-1)); //9 orig hex chord
    //cells[9].innerHTML = "Chord Hexadecimal (debug)";
    //cells[9].setAttribute('style','border: 1px solid white;padding:10px;')
    //cells.push(row.insertCell(-1)); //10 orig hex phrase
    //cells[10].innerHTML = "Phrase Hexadecimal (debug)";
    //cells[10].setAttribute('style','border: 1px solid white; padding:10px;')
    
  }
  


  export function AddHeaders(): ReactElement {
    React.useEffect(() => {
      addHeadersToDataTable()
    }, []);
    return (
      <React.Fragment>
     
      <div id="terminal" margin-left="center" margin-right="center">
          <ul id="list"/>
          <table id="dataTable"/>
        </div>
      </React.Fragment>
    );
  }