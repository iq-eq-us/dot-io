import React, { ReactElement } from 'react';



export function addHeadersToLayoutDataTable(){
    console.log("addHeadersToDataTable()");
    const dataTable: HTMLTableElement = document.getElementById("layoutDataTable") as  HTMLTableElement;
    dataTable.setAttribute('style', 'margin-left: auto; margin-right: auto;');
    const header: HTMLTableSectionElement = dataTable.createTHead() as  HTMLTableSectionElement;
    const row: HTMLTableRowElement = dataTable.insertRow(0) as HTMLTableRowElement; //insert row at top
    const cells = [];
    cells.push(row.insertCell(-1) as HTMLTableCellElement); //0 virtual id
    cells[0].innerHTML = "Count" ;
    cells.push(row.insertCell(-1)); //1 chord edit button
    cells[0].setAttribute('style','border: 1px solid white; padding:10px;')

    cells.push(row.insertCell(-1)); //2 chord string (locked)
    cells[2].innerHTML = "KeyMap";
    cells[2].setAttribute('style','border: 1px solid white; padding:10px;')
    cells.push(row.insertCell(-1)); //3 phrase (locked)
    cells[3].innerHTML = "KeyMap Position";
    cells[3].setAttribute('style','border: 1px solid white; padding:10px;')
    cells.push(row.insertCell(-1)); //4 chord string new (locked)
    cells[4].innerHTML = "KeyMap Value";
    cells[4].setAttribute('style','border: 1px solid white; padding:10px; text-align: center;')
    cells.push(row.insertCell(-1)); //5 phrase new (open)
    //cells[5].innerHTML = " ";
    //cells[5].setAttribute('style','border: 1px solid white; padding:10px;')
    //cells[9].innerHTML = "Chord Hexadecimal (debug)";
    //cells[9].setAttribute('style','border: 1px solid white;padding:10px;')
    //cells.push(row.insertCell(-1)); //10 orig hex phrase
    //cells[10].innerHTML = "Phrase Hexadecimal (debug)";
    //cells[10].setAttribute('style','border: 1px solid white; padding:10px;')
    
  }
  


  export function AddLayoutHeaders(): ReactElement {
    React.useEffect(() => {
      addHeadersToLayoutDataTable()
    }, []);
    return (
      <React.Fragment>
     
      <div id="terminal" className="ml-center mr-center">
          <ul id="list"/>
          <table id="layoutDataTable"/>
        </div>
      </React.Fragment>
    );
  }