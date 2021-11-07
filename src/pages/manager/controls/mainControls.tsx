import { _keyMapDefaults, _actionMap, _keyMap, _chordMaps } from "./maps";


  export class MainControls{
     public static serialPort: any;
     public static portReader: any;
     public static lineReader: any;
     public static lineReaderDone: any;
     public static abortController1 = new AbortController();
     public static abortController2 = new AbortController();
     public static decoder = new TextDecoderStream();
     public static _chordmapId: any  = "Default";
     public static _chordmapCountOnDevice: any  = 50;
     public static _firmwareVersion: any  = "0";
     public static  _chordMapIdCounter = 0
     public static count = 0;

  
     
     public static CONFIG_ID_ENABLE_SERIAL_LOG =       "01";
     public static CONFIG_ID_ENABLE_SERIAL_RAW =       "02";
     public static CONFIG_ID_ENABLE_SERIAL_CHORD =     "03";
     public static CONFIG_ID_ENABLE_SERIAL_KEYBOARD =  "04";
     public static CONFIG_ID_ENABLE_SERIAL_MOUSE  =    "05";
     public static CONFIG_ID_ENABLE_SERIAL_DEBUG =     "06";
     public static CONFIG_ID_ENABLE_SERIAL_HEADER =    "07";
     public static CONFIG_ID_ENABLE_HID_KEYBOARD =     "0A";
     public static CONFIG_ID_PRESS_THRESHOLD =         "0B";
     public static CONFIG_ID_RELEASE_THRESHOLD =       "0C";
     public static CONFIG_ID_ENABLE_HID_MOUSE =        "14";
     public static CONFIG_ID_SCROLL_DELAY =            "15";
     public static CONFIG_ID_ENABLE_SPURRING =         "1E";
     public static CONFIG_ID_SPUR_KILLER_TOGGLE =      "1F";
     public static CONFIG_ID_SPUR_KILLER =             "20";
     public static CONFIG_ID_ENABLE_CHORDING =         "28";
     public static CONFIG_ID_CHAR_KILLER_TOGGLE =      "29";
     public static CONFIG_ID_CHAR_COUNTER_KILLER =     "2A";
     
  }

  export async function selectBase(){
    
    await sendCommandString("SELECT BASE");
    await readGetOneAndToss(); //toss the result of 2000
  }

  export async function sendCommandString(commandString: string){
    console.log(commandString);
    if(MainControls.serialPort){
      const encoder = new TextEncoder();
      const writer = MainControls.serialPort.writable.getWriter();
      await writer.write(encoder.encode(commandString+"\r\n"));
      writer.releaseLock();
      console.log("writing "+commandString+"\r\n");
    }else{
      console.log('serial port is not open yet');
    }
  }
  
  export async function readGetOneAndToss(){
    const { value, done } = await MainControls.lineReader.read().catch( console.error );
    //throw away the value
    if(value){
      console.log('toss value of: '+value);
    }else{
      console.log('value is null');
    }
  }


  export async function selectConfig(){
    await sendCommandString("SELECT CONFIG");
    await readGetOneAndToss(); //toss the result of 17
  }

  export async function readGetChordmapCount(){
    const { value, done } = await MainControls.lineReader.read();
    if(value){
      MainControls._chordmapCountOnDevice = parseInt(value);
      console.log(MainControls._chordmapCountOnDevice);
    }
  }
  export async function enableSerialChordOutput(val){
    console.log("enableSerialChordOutput("+val.toString()+")");
    await selectConfig();
    if(val==true){
      await sendCommandString("SET "+MainControls.CONFIG_ID_ENABLE_SERIAL_CHORD+" 01");
      await sendCommandString("SET "+MainControls.CONFIG_ID_ENABLE_HID_KEYBOARD+" 00");
      await sendCommandString("SET "+MainControls.CONFIG_ID_ENABLE_HID_MOUSE+" 00");
    }else{
      await sendCommandString("SET "+MainControls.CONFIG_ID_ENABLE_SERIAL_CHORD+" 00");
      await sendCommandString("SET "+MainControls.CONFIG_ID_ENABLE_HID_KEYBOARD+" 01");
      await sendCommandString("SET "+MainControls.CONFIG_ID_ENABLE_HID_MOUSE+" 01");
    }
    await selectBase();
  }
  export async function cancelReader(){
    if(MainControls.serialPort){
      if(MainControls.lineReader){
        // if(lineReader.locked){
          await MainControls.lineReader.cancel().then(()=>{console.log('cleared line reader')});
          // await serialPort.readable.releaseLock();
          console.log(MainControls.abortController1);
          await MainControls.abortController1.abort();
          console.log(MainControls.serialPort.readable);
          await MainControls.lineReaderDone.catch(() => {/* Ingore the error */}); //this frees up the serialPort.readable after the abortControl1.abort() signal
          // await serialPort.readable.cancel();
        // }
      }
    }
  }

  function convertHexadecimalPhraseToAsciiString(hexString){
    let asciiString = "";
    console.log("convertHexadecimalPhraseToAsciiString()");
  
    //assume 2x size
    //get every 2 characters
    //TODO covert to byte array and account for non-ascii inputs like mouse moves
    for (let i = 0; i < hexString.length; i += 2){
      asciiString += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
      //console.log("0x"+hexString.substr(i, 2));
      //asciiString += String.fromCharCode("0x"+hexString.substr(i, 2));
    }
    console.log(asciiString);
    return asciiString;
  }

  async function readGetSomeChordmaps(expectedLineCount=100){
    console.log('readGetSome('+expectedLineCount+')');
    let i = 0;
    while (true) {
      const { value } = await MainControls.lineReader.read();
      i++;
      if (value) {
        const arrValue = [...value];
        //ascii_to_hexa(arrValue);
        const strValue = String(arrValue.join(''));
        console.log(strValue);
   
        const hexChordString = strValue.substr(0, 16);
        const hexAsciiString = strValue.substr(17, strValue.length);
        const strValues = ["","","",""];
        strValues[0] = convertHexadecimalChordToHumanString(hexChordString);
        strValues[1] = convertHexadecimalPhraseToAsciiString(hexAsciiString);
        strValues[2] = hexChordString;
        strValues[3] = hexAsciiString;
        console.log(strValues);
   
        //appendToList(strValues);
        // _chordMaps.push(["0x"+hexChordString,strValues[1]]);
        _chordMaps.push([convertHexadecimalChordToHumanString(hexChordString),strValues[1]]); //this ultimately isn't used
        
   
        appendToRow(strValues);
      }
      if(i>=expectedLineCount){
        break;
      }
    }
  }

  export async function readGetHexChord(){
    let hexChordString = "";
    if(MainControls.serialPort){
      
      // let decoder = new TextDecoderStream();
      // let inputDone = port.readable.pipeTo(decoder.writable);//throws error here
      // console.log(inputDone);
      // let inputStream = decoder.readable.pipeThrough(
      //   new TransformStream(new LineBreakTransformer())
      // );
      // reader = inputStream.getReader();
      await readGetOneAndToss(); //this is added for the latest firmware with customers, where decimal version
  
      const { value, done } = await MainControls.lineReader.read();
      if(done){
        console.log('reader is done');
        // break;
      }else{
        console.log(['value',value]);
        // await reader.cancel().then(()=>{console.log(['value',value]);console.log('then cancelled reader');});
        // await inputDone.catch(() => {});
        // reader.releaseLock();
    
        
        if(value){
          const arrValue = [...value];
          const strValue = String(arrValue.join(''));
          console.log(strValue);
          hexChordString = strValue.substr(0, 16);
          await readGetOneAndToss(); //the "processing chord:" decimal output
        }
      }
      
    }
    return hexChordString;
  }


  export function convertHexadecimalChordToHumanString(hexString){
    let humanString = "";
    //let num = parseInt(hexString, 16);
    //humanString = String(num);
    console.log(hexString);
    if(hexString.length<=0){
      hexString = "00";
    }
    const bigNum = BigInt("0x"+hexString);
    
  
    if(MainControls._chordmapId=="CHARACHORDER"){ //charachorder original uses different key map structure
      const decString = String(bigNum).split(''); //no left zeros; that's ok
      console.log(decString);
      for(let i=0;i<decString.length;i++){
        if(decString[i]!="0"){
          if(humanString.length>0){
            humanString += " + "
          }
          console.log({
            'i':i,
            'decString[i]':decString[i],
            'decString.length':decString.length,
            'decString':decString,
            '10exp':(decString.length-i-1),
            'decChordComp':decString[i]*(10**(decString.length-i-1)),
            // 'decChordCompBigInt':BigInt(decString[i])*BigInt((BigInt(10)**(decString.length-i-1))),
            'noteId':chord_to_noteId(decString[i]*(10**(decString.length-i-1)))
          });
          let noteId;
          let actionId;
          if(decString[i]%2==1){ //if it is odd, then it is simple
            noteId = chord_to_noteId(decString[i]*10**(decString.length-i-1));
            actionId = _keyMapDefaults[0][noteId];
            if(actionId == 0){
              actionId = 0x0200+noteId;
            }
            humanString+=_actionMap[actionId];
          }else{ //value is even, odd plus a 1
            noteId = chord_to_noteId((decString[i]-1)*10**(decString.length-i-1));
            //Charachorder = 0
            actionId = _keyMapDefaults[0][noteId];
            if(actionId == 0){
              actionId = 0x0200+noteId;
            }
            humanString+=_actionMap[actionId];
            
            humanString += " + ";
  
            noteId = chord_to_noteId(1*10**(decString.length-i-1));
            actionId = _keyMapDefaults[0][noteId];
            if(actionId == 0){
              actionId = 0x0200+noteId;
            }
            humanString+=_actionMap[actionId];
          }
        }
      }
    }else{
      const binString = bigNum.toString(2); //no left zeros; that's ok
      console.log(binString);
      for(let i=0;i<binString.length;i++){
        if(binString[i]=="1"){
          if(humanString.length>0){
            humanString += " + "
          }
          humanString+=_keyMap[64-binString.length+i];
        //console.log(i);
        //humanString+=_keyMap[(64-binString.length+i)];
        }
      }
    }
    
  
  
    console.log(humanString);
    return humanString;
  }

  export function chord_to_noteId(chord){
    const part1 = 5*Math.floor(Math.log10(chord));
    const part2 = (Math.floor(chord/(10**Math.floor(Math.log10(chord)))+1)/2);
    const part3 = Math.log10(chord)
  
    const full = Math.floor(5*Math.floor(Math.log10(chord)) + (Math.floor(chord/(10**Math.floor(Math.log10(chord)))+1)/2))
    console.log([chord,part1,part2,part3,full]);
    return full;
  }

  export async function setupLineReader(){
    if(MainControls.serialPort){
      console.log('setupLineRader()');
      MainControls.decoder = new TextDecoderStream();
      MainControls.abortController1 = new AbortController(); //reset abortControler1
      MainControls.abortController2 = new AbortController(); //reset abortControler2
      //preventAbort:true,
      MainControls.lineReaderDone = MainControls.serialPort.readable.pipeTo(MainControls.decoder.writable, {preventAbort:true,signal:MainControls.abortController1.signal});//throws error here
      const inputStream = MainControls.decoder.readable.pipeThrough(
        new TransformStream(new LineBreakTransformer(), {signal:MainControls.abortController2.signal})
      );
      MainControls.lineReader = await inputStream.getReader();
      console.log('setup line reader');
      document.getElementById("statusDiv").innerHTML = "status: opened serial port and listening";
    }else{
      console.log('serial port is not open yet');
    }
  }
  class LineBreakTransformer {
    chunks: any;

    constructor() {
      this.chunks = '';
    }
  
    transform(chunk: any, controller: any) {
      this.chunks += chunk;
      const lines = this.chunks.split('\r\n');
      this.chunks = lines.pop();
      lines.forEach((line:any) => controller.enqueue(line));
    }
  
    flush(controller: any) {
      controller.enqueue(this.chunks);
    }
  }
  export function appendToList(str){
    const ul = document.getElementById("list");
    const li = document.createElement("li");

    li.appendChild(document.createTextNode(str[0]+" "+str[1]));
    ul.appendChild(li);
  }

  export function ascii_to_hexa(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Number(arr[i].charCodeAt(0)).toString(16);
    }
   }

  export function convertHumanStringToHexadecimalPhrase(humanString){
    let hexString = "";
    for (let i = 0; i<humanString.length; i ++) 
    {
      const hex = Number(humanString.charCodeAt(i)).toString(16);
      hexString+=hex;
    }
    hexString = hexString.toUpperCase();
    console.log(hexString);
    return hexString;
  }

  export function convertHumanStringToHexadecimalChord(humanString : any){
  

    let hexString = "";
    let bigNum = BigInt(0);
    //parse the pieces with _+_
    const humanStringParts = humanString.split(' + '); //assumes plus isn't being used; bc default is = for the +/= key
    console.log(humanStringParts);
    humanStringParts.forEach(function(part : any){
      const actionId = _actionMap.indexOf(part);
      console.log(actionId);
      if(MainControls._chordmapId=="CHARACHORDER"){ //charachorder original uses different key map structure
        let keyId;
        if(actionId<0x0200){
          keyId = (_keyMapDefaults[0]).indexOf(actionId);
        }else{
          keyId = actionId-0x0200; //using the physical key position
        }
        
        console.log(keyId);
        bigNum+=BigInt(noteId_to_chord(keyId));
        console.log(bigNum);
      }else{
        //use other keymap
      }
    });
    hexString = bigNum.toString(16).toUpperCase();
    hexString = "0".repeat(16-hexString.length)+hexString; //add leading zeros up to 16 characters
    console.log(hexString);
  
    return hexString;
  }

  export function noteId_to_chord(note:any){
    return (BigInt((2*((note-1)%5))+1)) * (BigInt(10)**BigInt((Math.floor((note-1)/5))));
  }

  export async function readGetOneChordmap(){
    console.log('readGetOneChordmap()');
    const { value } = await MainControls.lineReader.read();
    if (value) {
      const arrValue = [...value];
      //ascii_to_hexa(arrValue);
      const strValue = String(arrValue.join(''));
      console.log(strValue);
      let hexChordString = "";
      hexChordString = strValue.substr(0, 16);
      let hexAsciiString = "";
      hexAsciiString = strValue.substr(17, strValue.length);
      const strValues = ["","","",""];
      strValues[0] = convertHexadecimalChordToHumanString(hexChordString);
      strValues[1] = convertHexadecimalPhraseToAsciiString(hexAsciiString);
      strValues[2] = hexChordString;
      strValues[3] = hexAsciiString;
      console.log(strValues);
  
      //appendToList(strValues);
      // _chordMaps.push(["0x"+hexChordString,strValues[1]]);
      _chordMaps.push([convertHexadecimalChordToHumanString(hexChordString),strValues[1]]); //this ultimately isn't used
  
      appendToRow(strValues);
    }
  }


  export function appendToRow(data, isFromFile=false){
    const dataTable = document.getElementById("dataTable") as HTMLTableElement;
    const row = dataTable.insertRow(-1); //insert row at end of table
  
    const cells :any = [];
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
   // cells[9].innerHTML = data[2];
   // cells[10].innerHTML = data[3];
  
    const btnEdit = document.createElement('input');
    const chordTextOrig = document.createElement('div');
    const phraseTextOrig = document.createElement('div');
    const chordTextNew = document.createElement('div');
    const phraseTextInput = document.createElement('input');
    const btnDelete = document.createElement('input');
    const btnRevert = document.createElement('input');
    const btnCommit = document.createElement('input');
    
  
    const virtualId = MainControls._chordMapIdCounter;
    cells[0].innerHTML = virtualId; //local id number
    cells[0].setAttribute('style','border: 1px solid #D3D3D3;')

    MainControls._chordMapIdCounter++;
  
    btnEdit.id = virtualId.toString()+"-edit";
    btnEdit.type = "button";
    btnEdit.className = "buttonEdit";
    btnEdit.value = "edit chord";
    btnEdit.setAttribute('style', 'background-color: #4CAF50;border: 1px solid white; color: white;padding: 1px 15px;text-align: center;text-decoration: none;display: inline-block; font-size: 16px;');

    cells[1].appendChild(btnEdit);
    cells[1].setAttribute('style','border: 1px solid #D3D3D3;')

    btnEdit.onclick = async function(){
      const btn = document.getElementById(virtualId.toString()+"-edit") as HTMLInputElement;

      if(btn.value == "edit chord"){
        btn.value = "listening";  
        await enableSerialChordOutput(true); //TODO include code to enable raw inputs and detect chord or else timeout
        
        const hexChord = await readGetHexChord(); //TODO enable a timeout to stop listening to read serial
        console.log(convertHexadecimalChordToHumanString(hexChord)); //TODO take this hexchord and do something with it
        if(hexChord!=null){
            
          const element: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLInputElement; //.innerHTML = "status: opened serial port";
          element.innerHTML = convertHexadecimalChordToHumanString(hexChord);
          const elementT: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement; //.innerHTML = "status: opened serial port";
          elementT.disabled = false;

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
    cells[2].setAttribute('style','border: 1px solid #D3D3D3;')

    phraseTextOrig.id = virtualId.toString()+"-phraseorig";
    phraseTextOrig.innerHTML = data[1];
    cells[3].appendChild(phraseTextOrig);
    cells[3].setAttribute('style','border: 1px solid #D3D3D3;')

    chordTextNew.id = virtualId.toString()+"-chordnew";
    chordTextNew.innerHTML = "";
    cells[4].appendChild(chordTextNew);
    cells[4].setAttribute('style','border: 1px solid #D3D3D3; ')

    phraseTextInput.id = virtualId.toString()+"-phraseinput";
    phraseTextInput.setAttribute("type", "text");
    phraseTextInput.setAttribute("style", "color:black");

    
    phraseTextInput.value = "";
    cells[5].setAttribute('style', 'color: white; border: 1px solid white;border-right: 1px solid #D3D3D3;');
    cells[5].appendChild(phraseTextInput);
    cells[5].setAttribute('style','border: 1px solid #D3D3D3;')

    phraseTextInput.onchange = function(){
      const element: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement; //.innerHTML = "status: opened serial port";
      element.disabled = false;
    }
  
    btnDelete.id = virtualId.toString()+"-delete";
    btnDelete.type = "button";
    btnDelete.className = "buttonDelete";
    btnDelete.value = "delete";
    btnDelete.setAttribute('style', 'background-color: #f44336; border: 1px solid white;color: white;padding: 1px 15px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;')

    cells[6].appendChild(btnDelete);
    cells[6].setAttribute('style','border: 1px solid #D3D3D3;')

    btnDelete.onclick = function(){
      const element: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLInputElement; //.innerHTML = "status: opened serial port";
      element.innerHTML = "DELETE";
      const elementDelete: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement; //.innerHTML = "status: opened serial port";
      elementDelete.disabled = true;
      const elementCommit: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement; //.innerHTML = "status: opened serial port";
      elementCommit.disabled = false;
    }
  
    btnRevert.id = virtualId.toString()+"-revert";
    btnRevert.type = "button";
    btnRevert.className = "buttonRevert";
    btnRevert.value = "revert";
    btnRevert.setAttribute('style', 'background-color: green; border: 1px solid white; color: white; padding: 1px 15px; text-align: center; display: inline-block; font-size: 16px;')
    cells[7].appendChild(btnRevert);
    cells[7].setAttribute('style','border: 1px solid #D3D3D3;')

    btnRevert.onclick = function(){
      const element: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLInputElement;
      element.innerHTML = "";
      const elementPhase: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;
      elementPhase.value = "";
      const elementDelete: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;
      elementDelete.disabled = false;
      const elementCommit: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement;
      elementCommit.disabled = true;
    }
  
    btnCommit.id = virtualId.toString()+"-commit";
    btnCommit.type = "button";
    btnCommit.className = "buttonCommit";
    btnCommit.value = "commit";
    btnCommit.disabled = true;
    btnCommit.setAttribute('style', 'border: 1px solid white;color: white;padding: 1px 15px;text-align: center;display: inline-block;font-size: 16px;hover: background: #00ff00;');
    cells[8].appendChild(btnCommit);

    btnCommit.onclick = async function(){
      const check: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;
      if(check.disabled){
        //delete the chord from the device, and then also delete from this list
        document.getElementById(virtualId.toString()+"-")
        await sendCommandString("DEL "+data[2]);
        await readGetOneAndToss();
        //then remove the row from the table
        const i = this.parentNode.parentNode.rowIndex;
        console.log('deleting row '+i.toString());
        dataTable.deleteRow(i);
      }else{
        const chordNew: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLInputElement; //.innerHTML = "status: opened serial port";
        if(chordNew.innerHTML.length>0){
          console.log("Check Length "+ chordNew.innerHTML.length);
          //if chord was changed, then we need to delete the chord from the device first
          const phraseinput: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement; //.innerHTML = "status: opened serial port";
          if(phraseinput.value.length>0){
            //if phrase was changed, then just set the new chordmap with the new chord and the new phrase
            const hexChord = convertHumanStringToHexadecimalChord(chordNew.innerHTML);
            const hexPhrase = convertHumanStringToHexadecimalPhrase(phraseinput.value);
            console.log("Chord "+hexChord);
            console.log("Phrase "+hexPhrase);
            await selectBase(); //make sure we're in the BASE dictionary
            await sendCommandString("SET "+hexChord+" "+hexPhrase);
            //then delete the old chordmap          const phraseinput: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLElement; //.innerHTML = "status: opened serial port";
            const chordorig: HTMLInputElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLInputElement; //.innerHTML = "status: opened serial port";
            const phraseorig: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseorig") as HTMLInputElement; //.innerHTML = "status: opened serial port";

           
            const hexChordOrigToDelete = convertHumanStringToHexadecimalChord(chordorig.innerHTML);
            await sendCommandString("DEL "+hexChordOrigToDelete);
            await readGetOneAndToss();
            const phraseinput2: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement; //.innerHTML = "status: opened serial port";

            
            phraseorig.innerHTML = phraseinput2.value;
          }else{
            //if phrase was not changed, then just add/set new chordmap with the new chord and the original phrase
            const element: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;; //.innerHTML = "status: opened serial port";
            const elementPhase: HTMLElement = document.getElementById(virtualId.toString()+"-phraseorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
            const hexChord = convertHumanStringToHexadecimalChord(element.innerHTML);
            const hexPhrase = convertHumanStringToHexadecimalPhrase(elementPhase.innerHTML);
            await selectBase(); //make sure we're in the BASE dictionary
            await sendCommandString("SET "+hexChord+" "+hexPhrase);
            //then delete the old chordmap
            const chordorig: HTMLElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
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


            const hexChord = convertHumanStringToHexadecimalChord(chordorig.innerHTML);
            const hexPhrase = convertHumanStringToHexadecimalPhrase(phraseinput5.value);
            await selectBase(); //make sure we're in the BASE dictionary
            await sendCommandString("SET "+hexChord+" "+hexPhrase);
            //then move the new phrase into the original phrase text location in the table, and clear the new phrase input
            const chordorig3: HTMLElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
            const phraseinput3: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
            const chordnew: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;; //.innerHTML = "status: opened serial port";
            const delete3: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
            const commit3: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement;; //.innerHTML = "status: opened serial port";

            chordorig3.innerHTML = chordnew.innerHTML;
            phraseinput3.value = "";
            chordnew.innerHTML = "";
            delete3.disabled = false;
            commit3.disabled = true;
          }else{
            //somehow there isn't anything to commit bc there is no change detected
          }
        }
      }
    }
    if(isFromFile){
      phraseTextInput.value = data[1];
      btnCommit.disabled = false;
    }
  }
  function pressCommitButton(virtualId){
    let commitButton = document.getElementById(virtualId.toString()+"-commit");
    if(commitButton.disabled==false){
      commitButton.click();
    }
  }

  export function commitAll(){
    console.log("commitAll()");
    const dataTable = document.getElementById("dataTable");
    //iterate through table from bottom to top to see if there's a commit enabled
    //TODO check if we need to skip the header row
    for (let i = dataTable.rows.length-1; i>=1; i--) {
      //iterate through rows
      const row = dataTable.rows[i];
      // console.log(row);
      // console.log(row.cells);
      // console.log(row.cells[0]);
      // console.log(row.cells[0].innerHTML);
      const virtualId = parseInt(row.cells[0].innerHTML);

      console.log('table row '+i+' has virtualId of '+virtualId);
      // document.getElementById(virtualId.toString()+"-commit")
      setTimeout(pressCommitButton,i*100,virtualId);
      //rows would be accessed using the "row" variable assigned in the for loop
   }
  }
 

 export async function readGetNone(){
   console.log(' ');
  }
  