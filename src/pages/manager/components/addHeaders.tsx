import React, { ReactElement } from 'react';
import { render } from 'react-dom';
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
  
  function appendToRow(data){
    const dataTable = document.getElementById("dataTable") as HTMLTableElement;
    let row = dataTable.insertRow(-1); //insert row at end of table
  
    let cells = []
    cells.push(row.insertCell(-1)); //0 virtual id
    cells.push(row.insertCell(-1)); //1 chord edit button
    cells.push(row.insertCell(-1)); //2 chord string (locked)
    cells.push(row.insertCell(-1)); //3 phrase (locked)
    cells.push(row.insertCell(-1)); //4 chord string new (locked)
    cells.push(row.insertCell(-1)); //5 phrase new (open)
    cells.push(row.insertCell(-1)); //6 delete - flags chord for deletion
    cells.push(row.insertCell(-1)); //7 revert
    cells.push(row.insertCell(-1)); //8 commit
    cells.push(row.insertCell(-1)); //9 orig hex chord
    cells.push(row.insertCell(-1)); //10 orig hex phrase
    //cells[9].innerHTML = data[2];
    //cells[10].innerHTML = data[3];
  
    const btnEdit = document.createElement('input');
    const chordTextOrig = document.createElement('div');
    const phraseTextOrig = document.createElement('div');
    const chordTextNew = document.createElement('div');
    const phraseTextInput = document.createElement('input');
    const btnDelete = document.createElement('input');
    const btnRevert = document.createElement('input');
    const btnCommit = document.createElement('input');
    
  
    let virtualId = MainControls._chordMapIdCounter;
    
    cells[0].innerHTML = virtualId; //local id number
    MainControls._chordMapIdCounter++;
  
    btnEdit.id = virtualId.toString()+"-edit";
    btnEdit.type = "button";
    btnEdit.className = "buttonEdit";
    btnEdit.value = "edit chord";
    cells[1].appendChild(btnEdit);
    btnEdit.onclick = async function(){
      let btn = document.getElementById(virtualId.toString()+"-edit") as HTMLInputElement;
      if(btn.value == "edit chord"){
        btn.value = "listening";  
        await enableSerialChordOutput(true); //TODO include code to enable raw inputs and detect chord or else timeout
        
        let hexChord = await readGetHexChord(); //TODO enable a timeout to stop listening to read serial
        console.log(convertHexadecimalChordToHumanString(hexChord)); //TODO take this hexchord and do something with it
        if(hexChord!=null){
          document.getElementById(virtualId.toString()+"-chordnew").innerHTML = convertHexadecimalChordToHumanString(hexChord);
          document.getElementById(virtualId.toString()+"-commit").disabled = false;
          console.log('hexChord is '+hexChord);
          // await readGetOneAndToss(); //extra processchord: serial output; this is already in the 'readGetHexChord()' method
        }
        await enableSerialChordOutput(false);//if the lineReader is cancelled, then the code flow resumes here
      }else{
        console.log('cancelling lineReader');
        console.log(await MainControls.lineReader);
        // console.log(await serialPort.getReader());
        // await lineReader.releaseLock();
        // await abortController2.abort();
        //TODO need to find the way to cancel or abort the away lineReader stream; bc this isn't working
        await cancelReader(); //forces the reader to call done
        await setupLineReader();
        // await resetReader();
        console.log('cancelled lineReader');
      }
      // setTimeout(()=>{enableSerialChordOutput(false);},100); //don't need to call this down here
      // await enableSerialChordOutput(false); //don't need to call this down here
      btn.value = "edit chord";
    }
  
    chordTextOrig.id = virtualId.toString()+"-chordorig";
    chordTextOrig.innerHTML = data[0];
    cells[2].appendChild(chordTextOrig);
    cells[2].setAttribute('style','border: 1px solid white; padding:10px;')


    phraseTextOrig.id = virtualId.toString()+"-phraseorig";
    phraseTextOrig.innerHTML = data[1];
    cells[3].appendChild(phraseTextOrig);
    cells[3].setAttribute('style','border: 1px solid white; padding:10px;')

    chordTextNew.id = virtualId.toString()+"-chordnew";
    chordTextNew.innerHTML = "";
    cells[4].appendChild(chordTextNew);
    cells[4].setAttribute('style','border: 1px solid white; padding:10px;')

    phraseTextInput.id = virtualId.toString()+"-phraseinput";
    phraseTextInput.setAttribute("type", "text");
    phraseTextInput.value = "";
    cells[5].appendChild(phraseTextInput);
    cells[5].setAttribute('style','border: 1px solid white; padding:10px;')

    phraseTextInput.onchange = function(){
      const element: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
      element.disabled = false;
    }
  
    btnDelete.id = virtualId.toString()+"-delete";
    btnDelete.type = "button";
    btnDelete.className = "buttonDelete";
    btnDelete.value = "delete";
    cells[6].appendChild(btnDelete);
    btnDelete.onclick = function(){
      const element: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
      element.innerHTML = "DELETE";

      const elementDelete: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
      elementDelete.disabled = true;

      const elementCommit: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
      elementCommit.disabled = false;

    }
  
    btnRevert.id = virtualId.toString()+"-revert";
    btnRevert.type = "button";
    btnRevert.className = "buttonRevert";
    btnRevert.value = "revert";
    
    cells[7].appendChild(btnRevert);
    btnRevert.onclick = function(){

      const element: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
      element.innerHTML = "";

      const elementPhase: HTMLElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
      elementPhase.innerHTML = "";

      const elementDelete: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
      elementDelete.disabled = false;

      const elementCommit: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
      elementCommit.disabled = true;

    }
  
    btnCommit.id = virtualId.toString()+"-commit";
    btnCommit.type = "button";
    btnCommit.className = "buttonCommit";
    btnCommit.value = "commit";
    btnCommit.disabled = true;
    cells[8].appendChild(btnCommit);
    btnCommit.onclick = async function(){

      const check: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;

      if(check.disabled){
        //delete the chord from the device, and then also delete from this list
        document.getElementById(virtualId.toString()+"-")
        await sendCommandString("DEL "+data[2]);
        await readGetOneAndToss();
        //then remove the row from the table
        let i = this.parentNode.parentNode.rowIndex;
        console.log('deleting row '+i.toString());
        dataTable.deleteRow(i);
      }else{
        const chordNew: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLInputElement; //.innerHTML = "status: opened serial port";
        if(chordNew.innerHTML.length>0){
          //if chord was changed, then we need to delete the chord from the device first
          const phraseinput: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement; //.innerHTML = "status: opened serial port";
          if(phraseinput.value.length>0){
            //if phrase was changed, then just set the new chordmap with the new chord and the new phrase
            let hexChord = convertHumanStringToHexadecimalChord(chordNew.innerHTML);
            let hexPhrase = convertHumanStringToHexadecimalPhrase(phraseinput.value);
            await selectBase(); //make sure we're in the BASE dictionary
            await sendCommandString("SET "+hexChord+" "+hexPhrase);
            //then delete the old chordmap          const phraseinput: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLElement; //.innerHTML = "status: opened serial port";
            const chordig: HTMLInputElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLInputElement; //.innerHTML = "status: opened serial port";

           
            let hexChordOrigToDelete = convertHumanStringToHexadecimalChord(chordig.innerHTML);
            await sendCommandString("DEL "+hexChordOrigToDelete);
            await readGetOneAndToss();
            const phraseorig: HTMLElement = document.getElementById(virtualId.toString()+"-phraseorig") as HTMLElement; //.innerHTML = "status: opened serial port";
            const phraseinput2: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement; //.innerHTML = "status: opened serial port";

            
            phraseorig.innerHTML = phraseinput2.value;
          }else{
            //if phrase was not changed, then just add/set new chordmap with the new chord and the original phrase
            
            const element: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;; //.innerHTML = "status: opened serial port";
      
            const elementPhase: HTMLElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLElement;; //.innerHTML = "status: opened serial port";

            const hexChord = convertHumanStringToHexadecimalChord(element.innerHTML);
            const hexPhrase = convertHumanStringToHexadecimalPhrase(elementPhase.innerHTML);
            await selectBase(); //make sure we're in the BASE dictionary
            await sendCommandString("SET "+hexChord+" "+hexPhrase);
            //then delete the old chordmap
            const chordorig: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;; //.innerHTML = "status: opened serial port";

            const hexChordOrigToDelete = convertHumanStringToHexadecimalChord(chordorig.innerHTML);
            await sendCommandString("DEL "+hexChordOrigToDelete);
            await readGetOneAndToss();
            // document.getElementById(virtualId.toString()+"-phraseorig").innerHTML = document.getElementById(virtualId.toString()+"-phraseinput").value;
          }


          const chordorig: HTMLElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
          const phraseinput3: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
          const chordnew: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;; //.innerHTML = "status: opened serial port";
          const delete2: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
          const commit2: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement;; //.innerHTML = "status: opened serial port";



          chordorig.innerHTML = chordnew.innerHTML;
          phraseinput3.value = "";
          chordnew.innerHTML = "";
          delete2.disabled = false;
          commit2.disabled = true;
        }else{
          const check2: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";

          if(check2.value.length>0){
            //if just the phrase was changed, then update the chordmap with the original chord and new phrase

            const chordorig: HTMLElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLElement;; //.innerHTML = "status: opened serial port";

            const phraseinput5: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";


            let hexChord = convertHumanStringToHexadecimalChord(chordorig.innerHTML);
            let hexPhrase = convertHumanStringToHexadecimalPhrase(phraseinput5.value);
            await selectBase(); //make sure we're in the BASE dictionary
            await sendCommandString("SET "+hexChord+" "+hexPhrase);
            //then move the new phrase into the original phrase text location in the table, and clear the new phrase input
            const chordorig2: HTMLElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
            const phraseinput3: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
            const chordnew: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;; //.innerHTML = "status: opened serial port";
            const delete2: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
            const commit2: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
  
  
  
            chordorig2.innerHTML = chordnew.innerHTML;
            phraseinput3.value = "";
            chordnew.innerHTML = "";
            delete2.disabled = false;
            commit2.disabled = true;
          }else{
            //somehow there isn't anything to commit bc there is no change detected
          }
        }
      }
    }
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