import React, { ReactElement } from 'react';
import {_chordMaps} from '../controls/maps'
import {MainControls} from '../controls/mainControls'
import {addHeadersToDataTable} from '../components/addHeaders'



export function resetDataTable(){
    const dataTable = document.getElementById("dataTable") as HTMLTableElement;
    dataTable.innerHTML = "";
    const _chordMaps = [];
    addHeadersToDataTable();
    MainControls._chordMapIdCounter = 0;
  }

  export function Clear(): ReactElement {
    return (
      <React.Fragment>
      <button
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      onClick={() => resetDataTable()}
      >Clear Table </button>
      </React.Fragment>
    );
  }