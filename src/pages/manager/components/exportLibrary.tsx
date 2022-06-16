import React, { ReactElement } from 'react';
import {sendCommandString, readGetChordmapCount, MainControls} from '../controls/mainControls';
import {_chordMaps} from '../controls/maps';


function exportChordMapLibrary(){
    const dataTable = document.getElementById("dataTable");
    //iterate through table from bottom to top to capture all the chords and phrases
    _chordMaps.splice(0,_chordMaps.length);
    for (let i = 1; i<dataTable.rows.length; i++) { //start a 1 to skip the header
      console.log("DataRows length "+dataTable.rows.length)
      const row = dataTable.rows[i];
      _chordMaps.push([row.cells[2].childNodes[0].innerHTML,row.cells[3].childNodes[0].innerHTML]);
      //_chordMaps = [];
    }
  
    console.log(_chordMaps);
    let csvRows = [];
    
    //TODO, pull from table
    for(const chordMap of _chordMaps){
      console.log(_chordMaps.length);
      console.log(chordMap.length);

      csvRows.push(chordMap.join(','))
    }
    const csvData = csvRows.join('\n');
  
    const blob = new Blob([csvData], {type:'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden','');
    a.setAttribute('href',url)
    a.setAttribute('download','CharaChorderChordMaps.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    csvRows = [];

  }

  export function Export(): ReactElement {
    return (
      <React.Fragment>

      <button
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      color="pink"
      onClick={() => exportChordMapLibrary()}
      >Export Library </button>
      </React.Fragment>
    );
  }