import React, { ReactElement } from 'react';
import {
  commitTo,
  MainControls,
    pressCommitButton,
    clickCommit,
    asyncCallWithTimeout

} from '../controls/mainControls'


export async function commitAll(){
    console.log("commitAll()");
    const dataTable = document.getElementById("dataTable");
    //iterate through table from bottom to top to see if there's a commit enabled
    //TODO check if we need to skip the header row
    const element: HTMLElement = document.getElementById("commitAllProgress") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
    const dataValue = dataTable.rows.length-1
    for (let i =0; i< dataTable.rows.length-1;  i++) {
      //iterate through rows
      const row = dataTable.rows[i];
      // console.log(row);
      // console.log(row.cells);
      // console.log(row.cells[0]);
      // console.log(row.cells[0].innerHTML);
      const virtualId = parseInt(row.cells[0].innerHTML);

      console.log('table row '+i+' has virtualId of '+virtualId);
      //document.getElementById(virtualId.toString()+"-commit");
      //const myTimeout = await setTimeout(pressCommitButton,i*500,i+1);//Fiddle with this
      await asyncCallWithTimeout(clickCommit(i), 10000, i);//Fiddle with this
       //myTimeout.
       //clearTimeout(myTimeout)
      
       element.innerHTML = "Commit Progress: "+ (((i/dataValue)*100).toFixed(0))+'% Please do not touch your device until completion.';
      
      //rows would be accessed using the "row" variable assigned in the for loop
   }
  }


  
  export function PressCommit(): ReactElement {
    return (
      <React.Fragment>
      <button
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      color="pink"
      onClick={async () => commitAll()}
      >Commit All </button>
      </React.Fragment>
    );
  }