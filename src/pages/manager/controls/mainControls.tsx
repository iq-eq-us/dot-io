import { _keyMapDefaults, _actionMap, _keyMap, _chordMaps, _chordLayout, actionMap, oldAsciiKeyReplacementDictionary } from "./maps";
import hex2Bin from 'hex-to-bin';
import { replace } from "lodash";
import { commitAllWithStart } from "../components/commitAll";



  export class MainControls{
     public static serialPort: any;
     public static portReader: any;
     public static lineReader: any;
     public static lineReaderDone: any;
     public static abortController1 = new AbortController();
     public static abortController2 = new AbortController();
    // public static decoder = new TextDecoderStream();
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

  function compare(a : any, b : any) {
    if (a === b) {
       return 0;
    }

    const a_components = a.split(".");
    const b_components = b.split(".");

    const len = Math.min(a_components.length, b_components.length);

    // loop while the components are equal
    for (let i = 0; i < len; i++) {
        // A bigger than B
        if (parseInt(a_components[i]) > parseInt(b_components[i])) {
            return 1;
        }

        // B bigger than A
        if (parseInt(a_components[i]) < parseInt(b_components[i])) {
            return -1;
        }
    }

    // If one's a prefix of the other, the longer one is greater.
    if (a_components.length > b_components.length) {
        return 1;
    }

    if (a_components.length < b_components.length) {
        return -1;
    }

    // Otherwise they are the same.
    return 0;
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

  export async function readGetOneAndTossCommitAll(virtualId){
    const myTimeout = await setTimeout(pressCommitButton,10000,virtualId);//Fiddle with this
    //console.log('readGetOneAndTossCommitAll()');
    //console.log('Starting timer')

    const { value, done } = await MainControls.lineReader.read().catch( console.error );
    //throw away the value
    if(value){
      console.log('toss value of: '+value);
    }else{
      console.log('value is null');
    }
    clearTimeout(myTimeout);
  }

  export async function readGetOneAndReturnOne(){
    const { value, done } = await MainControls.lineReader.read().catch( console.error );
    //throw away the value
    if(value){
      return value;
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
  export async function enableSerialChordOutput(val: boolean){
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

  export function convertHexadecimalPhraseToAsciiString(hexString: string){
    let asciiString = "";
    console.log("convertHexadecimalPhraseToAsciiString()");
    //let actionId = actionMap.indexOf(part); //returns the position of the first occurrence of a value in a string.; returns -1 if not found

    //let humanStringPart = actionMap[actionId]; //returns the ASCII string output from the actionMap 
    //assume 2x size
    //get every 2 characters
    //TODO covert to byte array and account for non-ascii inputs like mouse moves
    for (let i = 0; i < hexString.length; i += 2){
      asciiString += actionMap[parseInt(hexString.substr(i, 2), 16)];
      //console.log("0x"+hexString.substr(i, 2));
      //asciiString += String.fromCharCode("0x"+hexString.substr(i, 2));
    }
    console.log(asciiString);
    return asciiString;
  }

  async function readGetSomeChordmaps(expectedLineCount=100){
    console.log('readGetSome('+expectedLineCount+')');
    let i = 0
    const checker = true;
    while (checker) {
      const { value } = await MainControls.lineReader.read();
      i++;
      if (value) {
        const arrValue = [...value];
        //ascii_to_hexa(arrValue);
        const strValue = String(arrValue.join(''));
        console.log(strValue);
   
        const hexChordString = strValue[2]; // Should return 32 characters at all times
        const hexAsciiString = strValue.substr(17, strValue.length);
        const strValues = ["","","",""];
        strValues[0] = convertHexadecimalChordToHumanChord(hexChordString);
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
      if(MainControls._chordmapId=="CHARACHORDER" && (compare(MainControls._firmwareVersion, "0.9.0") ==-1)){
        await readGetOneAndToss(); //this is added for the latest firmware with customers, where decimal version
        console.log("i did indeed enter here")
      }
     
      //console.log(MainControls._firmwareVersion);
      //console.log(parseInt(MainControls._firmwareVersion))
      //console.log('Compare for version method :' + compare(MainControls._firmwareVersion, "0.9.0"));
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


  export function convertHexadecimalChordToHumanString(hexString: string | any[]){
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
      console.log(MainControls._chordmapId);
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
          let noteId: number;
          let actionId: number;
          if(decString[i]%2==1){ //if it is odd, then it is simple
            noteId = chord_to_noteId(decString[i]*10**(decString.length-i-1));
            actionId = _keyMapDefaults[0][noteId];
            if(actionId == 0){
              actionId = 0x0200+noteId;
            }
            humanString+=actionMap[actionId];
          }else{ //value is even, odd plus a 1
            noteId = chord_to_noteId((decString[i]-1)*10**(decString.length-i-1));
            //Charachorder = 0
            actionId = _keyMapDefaults[0][noteId];
            if(actionId == 0){
              actionId = 0x0200+noteId;
            }
            humanString+=actionMap[actionId];
            
            humanString += " + ";
  
            noteId = chord_to_noteId(1*10**(decString.length-i-1));
            actionId = _keyMapDefaults[0][noteId];
            if(actionId == 0){
              actionId = 0x0200+noteId;
            }
            humanString+=actionMap[actionId];
          }
        }
        //This checks if the Chord has the sequence e + e inside if it does this changes it to the correct e + r diagonal press representation 
   // if(humanString.indexOf('e + e')!=-1 || humanString.indexOf('e + e') != 0) {
     // humanString = humanString.replace("e + e", "r + e");
         // }
        //This checks if the Chord has the sequence m + k inside if it does this changes it to the correct m + c diagonal press representation 

          if(humanString.indexOf('m + k')!=-1 || humanString.indexOf('m + k') != 0) {
            humanString = humanString.replace("m + k", "m + c");
                }
      }
    }else if(MainControls._chordmapId == 'CHARACHORDERLITE'){
      console.log('ChordLite '+ bigNum);
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
        if(_keyMap[64-binString.length+i] == 'GTM' || _keyMap[64-binString.length+i] == '0x0061'){
          console.log('The two values ' + _keyMap[64-binString.length+i] );

        }
        }
      }
    }
    else{
      console.log('ChordLite '+ bigNum);
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
        if(_keyMap[64-binString.length+i] == 'GTM' || _keyMap[64-binString.length+i] == '0x0061'){
          console.log('The two values ' + _keyMapDefaults[64-binString.length+i] );

        }
        }
      }
    }
  
    console.log(humanString);
    return humanString;
  }


  function checkBin(n){return/^[01]{1,64}$/.test(n)}
  function checkDec(n){return/^[0-9]{1,64}$/.test(n)}
  function checkHex(n){return/^[0-9A-Fa-f]{1,64}$/.test(n)}
  function pad(s,z){s=""+s;return s.length<z?pad("0"+s,z):s}
  function unpad(s){s=""+s;return s.replace(/^0+/,'')}
  function backpad(s,z){s=""+s;return s.length<z?backpad(s+"0",z):s}
  
  //Decimal operations
  function Dec2Bin(n){if(!checkDec(n)||n<0)return 0;return n.toString(2)}
  function Dec2Hex(n){if(!checkDec(n)||n<0)return 0;return n.toString(16)}
  
  //Binary Operations
  function Bin2Dec(n ){
    if(!checkBin(n))
    return 0;
    return parseInt(n,2).toString(10)
  }
  function Bin2Hex(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(16)}
  
  //Hexadecimal Operations
  //function Hex2Bin(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(2)} do not use
  function Hex2Dec(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(10)}
  
  export function convertHexadecimalChordToHumanChordForAllChordsTeir(hexChord){
    //console.log("convertHexadecimalChordToHumanChord()");
    //console.log(hexChord);
    const humanChord = [];
    const binChord = pad(hex2Bin(hexChord),128);
    console.log(hexChord);
    console.log(binChord);
    const chainIndex = binChord.substring(0,8); //unused right now; this is used for phrases that have more than 192 bytes

    for(let i=0; i<12; i++){
        const binAction = binChord.substring(8+i*10,8+(i+1)*10); //take 10 bits at a time
        const actionCode = Bin2Dec(binAction); //convert 10-bit binary to an action id
        if(actionCode!=0){

            const humanStringPart = actionMap[actionCode as number]; //returns the ASCII string output from the actionMap 
            //humanStringPart = oldAsciiKeyReplacementDictionary[humanStringPart];
            //console.log('Old Ascii '+ humanStringPart)
            humanChord.push(humanStringPart); //Replace when new action codes arrive
            //console.log('Human string part in the loop '+ humanChord)

        }else{
            break; //we can exit the for loop early
        }


    }
    console.log('final humanChord '+ humanChord)
    //console.log(humanChord);
    return humanChord;
}
  
      export function convertHexadecimalChordToHumanChord(hexChord){
        //console.log("convertHexadecimalChordToHumanChord()");
        //console.log(hexChord);
        let humanChord = "";
        const binChord = pad(hex2Bin(hexChord),128);
        console.log(hexChord);
        console.log(binChord);
        const chainIndex = binChord.substring(0,8); //unused right now; this is used for phrases that have more than 192 bytes
    
        for(let i=0; i<12; i++){
            const binAction = binChord.substring(8+i*10,8+(i+1)*10); //take 10 bits at a time
            const actionCode = Bin2Dec(binAction); //convert 10-bit binary to an action id
            if(actionCode!=0){

                if(humanChord.length>0){
                    humanChord += " + "; //add this + between action ids; put here so we don't have to remove it at end of for-loop
                }
  
                const humanStringPart = actionMap[actionCode as number]; //returns the ASCII string output from the actionMap 
                //humanStringPart = oldAsciiKeyReplacementDictionary[humanStringPart];
                //console.log('Old Ascii '+ humanStringPart)
                humanChord += humanStringPart; //Replace when new action codes arrive
                //console.log('Human string part in the loop '+ humanChord)

            }else{
                break; //we can exit the for loop early
            }


        }
        console.log('final humanChord '+ humanChord)
        //console.log(humanChord);
        return humanChord;
    }

  export function chord_to_noteId(chord: number){
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
      const decoder = new TextDecoderStream();
      MainControls.abortController1 = new AbortController(); //reset abortControler1
      MainControls.abortController2 = new AbortController(); //reset abortControler2
      //preventAbort:true,
      MainControls.lineReaderDone = MainControls.serialPort.readable.pipeTo(decoder.writable, {preventAbort:true,signal:MainControls.abortController1.signal});//throws error here
      const inputStream = decoder.readable.pipeThrough(
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
  export function appendToList(str:any){
    const ul = document.getElementById("list");
    const li = document.createElement("li");

    li.appendChild(document.createTextNode(str[0]+" "+str[1]));
    ul.appendChild(li);
  }

  export function ascii_to_hexa(arr:any) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Number(arr[i].charCodeAt(0)).toString(16);
    }
   }

  export function convertHumanStringToHexadecimalPhrase(humanString:string) : string{
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
/*eslint-disable */
  function replaceOldAsciiKeys(inputKey){
    inputKey =  inputKey.split(" + ");
    let finishedInputKey = '';
    //console.log('Why am I stopping')
    for(let i =0; i< inputKey.length; i++){
     if(oldAsciiKeyReplacementDictionary.hasOwnProperty(inputKey[i])){// eslint-disable-line no-use-before-define
     // console.log('output fuck')

      finishedInputKey += oldAsciiKeyReplacementDictionary[inputKey[i]];// eslint-disable-line no-use-before-define
    } else{
      finishedInputKey += inputKey[i];
    }
    if(inputKey.length-1>0 && i != inputKey.length-1){
      finishedInputKey += " + "
      //console.log('Why am I not adding the plus')
    }
  }
    return finishedInputKey;  
  }
/*eslint-enable */

  export function convertHumanStringToHexadecimalChord(humanString: string) : string{
  
    console.log(humanString);
    let hexString = "";
    let bigNum = BigInt(0);
    //parse the pieces with _+_
    const humanStringParts = humanString.split(' + '); //assumes plus isn't being used; bc default is = for the +/= key
    console.log("these are the parts "+humanStringParts);
    humanStringParts.forEach(async (part:any)=>{
      //console.log('this is the part in the convert '+part + ' '+ replaceOldAsciiKeys(part));
      part = replaceOldAsciiKeys(part)
      console.log('This is the part '+ part)
      const actionId = _actionMap.indexOf(part);
      
      console.log('ActionID: '+actionId);
      if(MainControls._chordmapId=="CHARACHORDER"){ //charachorder original uses different key map structure
        let keyId: number;
        if(actionId<0x0200){
          keyId = (_keyMapDefaults[0]).indexOf(actionId);
          console.log(keyId);
        }else{
          keyId = actionId-0x0200; //using the physical key position
        }
        
        console.log(keyId);
        bigNum+=BigInt(noteId_to_chord(keyId));
        console.log(bigNum);
      }else if(MainControls._chordmapId == 'CHARACHORDERLITE'){
        let keyId: number;
        if(actionId<0x0200){
          console.log('I am here');
          keyId = (_keyMapDefaults[1]).indexOf(_actionMap[actionId]);
          console.log(keyId);
        }else{
          keyId = actionId-0x0200; //using the physical key position
        }
        
        console.log(keyId);
        bigNum+=BigInt(2n ** BigInt(keyId));
        console.log(bigNum);
      }else{
        //use other keymap
      }
    });
    console.log(bigNum);

    hexString = bigNum.toString(16).toUpperCase();
    hexString = "0".repeat(16-hexString.length)+hexString; //add leading zeros up to 16 characters
    console.log(hexString);
  
    return hexString;
  }

  export function noteId_to_chord(note:any) : bigint{
    return (BigInt((2*((note-1)%5))+1)) * (BigInt(10)**BigInt((Math.floor((note-1)/5))));
  }

  export async function readGetOneChordmap(){
    console.log('readGetOneChordmap()');
    const { value } = await MainControls.lineReader.read();
    const spliter = value.split(' ');
    console.log(spliter)
    if (value) {
      const arrValue = [...spliter];
      //ascii_to_hexa(arrValue);
      const strValue = arrValue;
      let hexChordString = "";
      hexChordString = strValue[3]; //Should be 32 chacters at all times
      let hexAsciiString = "";
      hexAsciiString = strValue[4];
      const strValues = ["","","",""];
      console.log('StrValue '+convertHexadecimalChordToHumanChord(hexChordString));
      strValues[0] = convertHexadecimalChordToHumanChord(hexChordString);
      strValues[1] = convertHexadecimalPhraseToAsciiString(hexAsciiString);
      strValues[2] = hexChordString;
      strValues[3] = hexAsciiString;
  
      //appendToList(strValues);
      // _chordMaps.push(["0x"+hexChordString,strValues[1]]);
      _chordMaps.push([convertHexadecimalChordToHumanChord(hexChordString),strValues[1]]); //this ultimately isn't used
  
      appendToRow(strValues);
    }
  }

  export async function commitChordLayout(){
    console.log('readGetOneChordMapLayout()');
    const { value } = await MainControls.lineReader.read();
    console.log('Chord layout array '+ value);

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
      const myArray = value.split(' ');

      strValues[0] = myArray[1];
      strValues[1] = myArray[2];
      strValues[2] = myArray[3];
      strValues[3] = myArray[4];
      strValues[4] = myArray[5];
      strValues[5] = myArray[6];



      console.log('HEHEHEHEHEHHEEH '+ myArray)
  
      //appendToList(strValues);
      // _chordMaps.push(["0x"+hexChordString,strValues[1]]);
      _chordLayout.push(value); //this ultimately isn't used
  
      appendLayoutToRow(strValues);
    }
  }

  export async function readGetOneChordLayout(){
    console.log('readGetOneChordMapLayout()');
    const { value } = await MainControls.lineReader.read();
    console.log('Chord layout array '+ value);

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
      const myArray = value.split(' ');

      strValues[0] = myArray[1];
      strValues[1] = myArray[2];
      strValues[2] = myArray[3];
      strValues[3] = myArray[4];
      strValues[4] = myArray[5];
      strValues[5] = myArray[6];



      console.log('HEHEHEHEHEHHEEH '+ myArray)
  
      //appendToList(strValues);
      // _chordMaps.push(["0x"+hexChordString,strValues[1]]);
      _chordLayout.push(value); //this ultimately isn't used
  
      appendLayoutToRow(strValues);
    }
  }
  
  export function appendLayoutToRow(data: string[], isFromFile=false) : any{
    if(data[4] != '2' ){
      
    const dataTable = document.getElementById("layoutDataTable") as HTMLTableElement;
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
  
    const btnEdit = document.createElement('div');
    const chordTextOrig = document.createElement('div');
    const phraseTextOrig = document.createElement('div');
    const chordTextNew = document.createElement('div');
    const phraseTextInput = document.createElement('div');
    const btnDelete = document.createElement('input');
    const btnRevert = document.createElement('input');
    const btnCommit = document.createElement('input');
    
  
    const virtualId = MainControls._chordMapIdCounter;
    console.log("ChordMap Counter: "+virtualId);
    cells[0].innerHTML = virtualId; //local id number
    cells[0].setAttribute('style','border: 1px solid #D3D3D3;');
    MainControls._chordMapIdCounter++;
  
    //btnEdit.id = virtualId.toString()+"-edit";
    //btnEdit.className = "buttonEdit";
    //btnEdit.setAttribute('style', 'background-color: #4CAF50;border: 1px solid white; color: white;padding: 1px 15px;text-align: center;text-decoration: none;display: inline-block; font-size: 16px;');

    //cells[1].appendChild(btnEdit);
    //cells[1].setAttribute('style','border: 1px solid #D3D3D3;')


  
    chordTextOrig.id = virtualId.toString()+"-chordorig";
    chordTextOrig.innerHTML = data[1];
    cells[2].appendChild(chordTextOrig);
    cells[2].setAttribute('style','border: 1px solid #D3D3D3;')

    phraseTextOrig.id = virtualId.toString()+"-phraseorig";
    phraseTextOrig.innerHTML = data[2];
    cells[3].appendChild(phraseTextOrig);
    cells[3].setAttribute('style','border: 1px solid #D3D3D3;')

    chordTextNew.id = virtualId.toString()+"-chordnew";
    chordTextNew.innerHTML = data[3];
    cells[4].appendChild(chordTextNew);
    cells[4].setAttribute('style','border: 1px solid #D3D3D3; ')

   // phraseTextInput.id = virtualId.toString()+"-phraseinput";
   // phraseTextInput.innerHTML = '';
   // cells[4].appendChild(phraseTextInput);
   // cells[4].setAttribute('style','border: 1px solid #D3D3D3; ')

  
    
    //phraseTextInput.value = "";
    //cells[5].setAttribute('style', 'color: white; border: 1px solid white;border-right: 1px solid #D3D3D3;');
    //cells[5].appendChild(phraseTextInput);
    //cells[5].setAttribute('style','border: 1px solid #D3D3D3;')

    phraseTextInput.onchange = function(){
      const element: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement; //.innerHTML = "status: opened serial port";
      element.disabled = false;
    }

        
      
    
    if(isFromFile){
      phraseTextInput.value = data[1];
    }
  }
  }

  export function appendToRow(data: string[], isFromFile=false) : any{
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
    console.log("ChordMap Counter: "+virtualId);
    cells[0].innerHTML = virtualId; //local id number
    cells[0].setAttribute('style','border: 1px solid #D3D3D3;');
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
        console.log("Listening Hex Chord "+convertHexadecimalChordToHumanString(hexChord)); //TODO take this hexchord and do something with it
        
        if(hexChord!=null){
            console.log(hexChord + " Original Hex Value")
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
    chordTextOrig.innerHTML = replaceOldAsciiKeys(data[0]);
    console.log('Output of current chord '+ data)
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
      const element: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;
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

    btnCommit.onclick = async function(distinguisher){
      const check: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;
      const checkELementOriginalChord = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;
      if(check.disabled){
        //delete the chord from the device, and then also delete from this list
        //const element: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit")
        document.getElementById(virtualId.toString()+"-")
        await sendCommandString("CML C4 "+data[2]);
        await readGetOneAndToss();
        //then remove the row from the table
        const i = this.parentNode.parentNode.rowIndex;
        console.log('deleting row '+virtualId);
        dataTable.deleteRow(i);
      }else{
        const chordNew: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLInputElement; //.innerHTML = "status: opened serial port";
        if(chordNew.innerHTML.length>0){
          //if chord was changed, then we need to delete the chord from the device first
          const phraseinput: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement; //.innerHTML = "status: opened serial port";
          if(phraseinput.value.length>0){
            //if phrase was changed, then just set the new chordmap with the new chord and the new phrase
            const chordNewIn: HTMLInputElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLInputElement; //.innerHTML = "status: opened serial port";
            const phraseInputIn: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement; //.innerHTML = "status: opened serial port";
            const hexChord = await convertHumanChordToHexadecimalChord(chordNewIn.innerHTML);
            const hexPhrase = await convertHumanPhraseToHexadecimalPhrase(phraseInputIn.value);

            //await selectBase(); //make sure we're in the BASE dictionary
            await sendCommandString("CML C3 "+hexChord+" "+hexPhrase);
            console.log('ChordNew In'+ chordNewIn.innerHTML);
            console.log('ChordNew In'+ phraseInputIn.value);


            //then delete the old chordmap          const phraseinput: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLElement; //.innerHTML = "status: opened serial port";
            const chordorig: HTMLInputElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLInputElement; //.innerHTML = "status: opened serial port";
           
            const hexChordOrigToDelete = await convertHumanChordToHexadecimalChord(chordorig.innerHTML);
            await sendCommandString("CML C4 "+hexChordOrigToDelete);
            await readGetOneAndToss();

            const phraseorig: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseorig") as HTMLInputElement; //.innerHTML = "status: opened serial port";

            const phraseinput2: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement; //.innerHTML = "status: opened serial port";
            phraseorig.innerHTML = phraseinput2.value;
          }else{
            //if phrase was not changed, then just add/set new chordmap with the new chord and the original phrase
            const element: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;; //.innerHTML = "status: opened serial port";
            const elementPhase: HTMLElement = document.getElementById(virtualId.toString()+"-phraseorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
            const hexChord = await convertHumanChordToHexadecimalChord(element.innerHTML);
            const hexPhrase = await convertHumanPhraseToHexadecimalPhrase(elementPhase.innerHTML);

            //await selectBase(); //make sure we're in the BASE dictionary
            await sendCommandString("CML C3 "+hexChord+" "+hexPhrase);

            const s = elementPhase.innerHTML.split(",");
           // await sendCommandString('');
            
            await sendCommandString('VAR '+'B4 '+'A'+element.innerHTML+" "+ s[0] + ' '+ s[1]);
            await readGetOneAndToss();
            //then delete the old chordmap
            const chordorig: HTMLElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
            const hexChordOrigToDelete = await convertHumanChordToHexadecimalChord(chordorig.innerHTML);
            await sendCommandString("CML C4 "+hexChordOrigToDelete);
            // document.getElementById(virtualId.toString()+"-phraseorig").innerHTML = document.getElementById(virtualId.toString()+"-phraseinput").value;
          }
          const phraseinput3: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
          const chordorig: HTMLElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
          const chordnew: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;; //.innerHTML = "status: opened serial port";
          const delete2: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
          const commit2: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement;; //.innerHTML = "status: opened serial port";

          phraseinput3.value = "";
          chordorig.innerHTML = chordnew.innerHTML;
          chordnew.innerHTML = "";
          delete2.disabled = false;
          commit2.disabled = true;
        }else{
          const check2: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";

          if(check2.value.length>0){
            //if just the phrase was changed, then update the chordmap with the original chord and new phrase
            const chordorig: HTMLElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLElement; //.innerHTML = "status: opened serial port"; 
            const phraseinput5: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
            const hexChord = await convertHumanChordToHexadecimalChord(chordorig.innerHTML);
            const hexPhrase = await convertHumanPhraseToHexadecimalPhrase(phraseinput5.value);
            
            //await selectBase(); //make sure we're in the BASE dictionary
            await sendCommandString("CML C3 "+hexChord+" "+hexPhrase);

            //then move the new phrase into the original phrase text location in the table, and clear the new phrase input
            const phraseorig3: HTMLElement = document.getElementById(virtualId.toString()+"-phraseorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
            const phraseinput3: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
            const chordnew: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;; //.innerHTML = "status: opened serial port";
            const delete3: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
            const commit3: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement;; //.innerHTML = "status: opened serial port";

            phraseorig3.innerHTML = phraseinput3.innerHTML;
            phraseinput3.value = "";
            chordnew.innerHTML = "";
            delete3.disabled = false;
            commit3.disabled = true;
          }
        }
      }
    }
    if(isFromFile){
      phraseTextInput.value = data[1];
      btnCommit.disabled = false;
    }

  }




export const asyncCallWithTimeout = async (asyncPromise, timeLimit, virtualId) => {
  let timeoutHandle;
  const commitButton = document.getElementById(virtualId.toString()+"-commit");
  const timeoutPromise = new Promise((_resolve, reject) => {
      timeoutHandle = setTimeout(
          () => _resolve(commitButton?.click()),
          timeLimit
      );
  });

  return Promise.race([asyncPromise, timeoutPromise]).then(result => {
      clearTimeout(timeoutHandle);
      return result;
  })
}
  
  export async function clickCommit(virtualId){
    
    const check: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;
       // const commitButton = document.getElementById(virtualId.toString()+"-commit");

    //const myTimeout = setTimeout(() => ,virtualId*20000,virtualId);//Fiddle with this
    if(check.disabled){
      //delete the chord from the device, and then also delete from this list
      document.getElementById(virtualId.toString()+"-")
      await sendCommandString("CML C4 "+data[2]);
      await readGetOneAndToss();
      //then remove the row from the table
      const i = this.parentNode.parentNode.rowIndex;
      console.log('deleting row '+i.toString());
      dataTable.deleteRow(i);
    }else{
      const chordNew: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLInputElement; //.innerHTML = "status: opened serial port";
      if(chordNew.innerHTML.length>0){
        //if chord was changed, then we need to delete the chord from the device first
        const phraseinput: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement; //.innerHTML = "status: opened serial port";
        if(phraseinput.value.length>0){
          //if phrase was changed, then just set the new chordmap with the new chord and the new phrase
          const chordNewIn: HTMLInputElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLInputElement; //.innerHTML = "status: opened serial port";
          const phraseInputIn: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement; //.innerHTML = "status: opened serial port";
          const hexChord = await convertHumanChordToHexadecimalChord(chordNewIn.innerHTML);
          const hexPhrase = await convertHumanPhraseToHexadecimalPhrase(phraseInputIn.value);

          //await selectBase(); //make sure we're in the BASE dictionary
          await sendCommandString("CML C3 "+hexChord+" "+hexPhrase);
          //await readGetOneAndToss();

          //console.log('ChordNew In'+ chordNewIn.innerHTML);
          //console.log('ChordNew In'+ phraseInputIn.value);


          //then delete the old chordmap          const phraseinput: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLElement; //.innerHTML = "status: opened serial port";
          const chordorig: HTMLInputElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLInputElement; //.innerHTML = "status: opened serial port";
         
          const hexChordOrigToDelete = await convertHumanChordToHexadecimalChord(chordorig.innerHTML);
          await sendCommandString("CML C4 "+hexChordOrigToDelete);
          //await readGetOneAndToss();

          const phraseorig: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseorig") as HTMLInputElement; //.innerHTML = "status: opened serial port";

          const phraseinput2: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement; //.innerHTML = "status: opened serial port";
          phraseorig.innerHTML = phraseinput2.value;
        }else{
          //if phrase was not changed, then just add/set new chordmap with the new chord and the original phrase
          const element: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;; //.innerHTML = "status: opened serial port";
          const elementPhase: HTMLElement = document.getElementById(virtualId.toString()+"-phraseorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
          const hexChord = await convertHumanChordToHexadecimalChord(element.innerHTML);
          const hexPhrase = await convertHumanPhraseToHexadecimalPhrase(elementPhase.innerHTML);

          //await selectBase(); //make sure we're in the BASE dictionary
          await sendCommandString("CML C3 "+hexChord+" "+hexPhrase);
          //await readGetOneAndToss();

          const s = elementPhase.innerHTML.split(",");
         // await sendCommandString('');
          
          await sendCommandString('VAR '+'B4 '+'A'+element.innerHTML+" "+ s[0] + ' '+ s[1]);
          //await readGetOneAndToss();
          //then delete the old chordmap
          const chordorig: HTMLElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
          const hexChordOrigToDelete = await convertHumanChordToHexadecimalChord(chordorig.innerHTML);
          await sendCommandString("CML C4 "+hexChordOrigToDelete);
          // document.getElementById(virtualId.toString()+"-phraseorig").innerHTML = document.getElementById(virtualId.toString()+"-phraseinput").value;
        }
        const phraseinput3: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
        const chordorig: HTMLElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
        const chordnew: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;; //.innerHTML = "status: opened serial port";
        const delete2: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
        const commit2: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement;; //.innerHTML = "status: opened serial port";

        phraseinput3.value = "";
        chordorig.innerHTML = chordnew.innerHTML;
        chordnew.innerHTML = "";
        delete2.disabled = false;
        commit2.disabled = true;
      }else{
        const check2: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";

        if(check2.value.length>0){
          //if just the phrase was changed, then update the chordmap with the original chord and new phrase
          const chordorig: HTMLElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLElement; //.innerHTML = "status: opened serial port"; 
          const phraseinput5: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
          const hexChord = await convertHumanChordToHexadecimalChord(chordorig.innerHTML);
          const hexPhrase = await convertHumanPhraseToHexadecimalPhrase(phraseinput5.value);
          
          //await selectBase(); //make sure we're in the BASE dictionary
          console.log('Chord Original '+ chordorig);
          await sendCommandString("CML C3 "+hexChord+" "+hexPhrase);
          //await readGetOneAndToss();

          //then move the new phrase into the original phrase text location in the table, and clear the new phrase input
          const phraseorig3: HTMLElement = document.getElementById(virtualId.toString()+"-phraseorig") as HTMLElement;; //.innerHTML = "status: opened serial port";
          const phraseinput3: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
          const chordnew: HTMLElement = document.getElementById(virtualId.toString()+"-chordnew") as HTMLElement;; //.innerHTML = "status: opened serial port";
          const delete3: HTMLInputElement = document.getElementById(virtualId.toString()+"-delete") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
          const commit3: HTMLInputElement = document.getElementById(virtualId.toString()+"-commit") as HTMLInputElement;; //.innerHTML = "status: opened serial port";

          phraseorig3.innerHTML = phraseinput3.innerHTML;
          phraseinput3.value = "";
          chordnew.innerHTML = "";
          delete3.disabled = false;
          commit3.disabled = true;
        }
      }
    }
    //await clearTimeout(myTimeout)
    await readGetOneAndToss();
  }


  export function pressCommitButton(virtualId: { toString: () => string; }){
    const commitButton = document.getElementById(virtualId.toString()+"-commit");
    //onst myTimeout = await setTimeout(pressCommitButton,virtualId*10000,virtualId);//Fiddle with this
    //myTimeout.
    clickCommit(virtualId);
    //clearTimeout(myTimeout);

  }

  export async function commitTo(virtualId){
    const commitButton = document.getElementById(virtualId.toString()+"-commit");
    if(commitButton.disabled==false){
      commitButton.click();
    }
    const chordorig: HTMLElement = document.getElementById(virtualId.toString()+"-chordorig") as HTMLElement; //.innerHTML = "status: opened serial port"; 
    const phraseinput5: HTMLInputElement = document.getElementById(virtualId.toString()+"-phraseinput") as HTMLInputElement;; //.innerHTML = "status: opened serial port";
    const hexChord =  await convertHumanChordToHexadecimalChord(chordorig.innerHTML);
    const hexPhrase = await convertHumanPhraseToHexadecimalPhrase(phraseinput5.value);
    await sendCommandString("CML C3 "+hexChord+" "+hexPhrase);
    await readGetOneAndToss();
    console.log('Done sending command');
  }

  function convertHumanChordToHexadecimalChord(humanChord){
    console.log("convertHumanChordToHexadecimalChord()");
    console.log(humanChord);
    let hexChord = "";
    
    const humanChordParts = humanChord.split(' + '); //somewhat assumes plus isn't being used; bc default is = for the +/= key
    const decChordParts=[]
    humanChordParts.forEach( (part)=>{
      const actionCode = actionMap.indexOf(part);

        //const actionCode = part.charCodeAt(0); //TODO pull from actionCodesMap instead of ASCII
        actionCode == -1 ? console.log('ActionCode does not exisit') : decChordParts.push(actionCode);
    });

    decChordParts.sort(function(a, b){return b - a}); // This sorts the parts of the chod in decensing order


    const chainIndex = 0; //to be developed later
    let binChord = pad(Dec2Bin(chainIndex),8); //convert the chain index to binary and zero fill up to 8-bits
    for(let i=0; i<decChordParts.length; i++){
        if(i<12){ //only support up to 12 keys
            binChord += pad(Dec2Bin(decChordParts[i]),10); //convert the action id to binary and zero fill up to 10-bits
        }
    }
    binChord = backpad(binChord,128); //zero backfill up to 128 bits
    console.log(binChord);

    for(let i=0; i<16; i++){ //this also limits the output to 12 keys (plus the first 8-bits reserved for the chain index)
        hexChord += pad(Bin2Hex(binChord.substring(i*8,(i+1)*8)),2);
    }
    hexChord = hexChord.toUpperCase(); //convert to all uppercase characters for hexadecimal representation
    console.log('This is the hexChord '+hexChord);
    return hexChord;
}

  function convertHumanPhraseToHexadecimalPhrase(humanPhrase){
    console.log("convertHumanPhraseToHexadecimalPhrase()");
    console.log(humanPhrase);
    let hexPhrase = "";
    
    //TODO split by ' + ' and detect if it is ascii or not
    for (let i=0; i<humanPhrase.length; i ++) 
    {
        const actionCode = humanPhrase.charCodeAt(i); //TODO look up in actionCodeMap
        const hexPhrasePart = pad(Dec2Hex(actionCode),2); //convert the actionCode to a hex string and pad with zeros
        hexPhrase+=hexPhrasePart; //append to final hexadecimal string
    }
    hexPhrase = hexPhrase.toUpperCase(); //conver to uppercase
    console.log('This is the hex human phrase '+hexPhrase);
    return hexPhrase;
}

 export async function readGetNone(){
   console.log(' ');
  }
  