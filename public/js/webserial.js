//512 'actions'
//phrase is an 'action sequence'


let _keys_to_humanreadableoutput_dict = {
  '0x0061':'a',
  '0x0062':'b',
  '0x0063':'c',
  '0x0064':'d',
  '0x0030':'0',
  '0x0031':'1',
  '0x0032':'2',
  '0x013D':'Mouse Left Button Press and Release',
  '0x0149':'Mouse Move Down',
  '0x0151':'Double Click',
  '0x0180':'LeftControl', // E0 in HID Keyboard Table
  '0x0181':'LeftShift',
  '0x0182':'LeftAlt',
  '0x0183':'LeftGUI',
  '0x0189':'F1',
  '0x018A':'F2',
  '0x018B':'F3',

64-bit integer as hexadecimal, string of hexadecimal pairs that represent ascii+ value

"a + f + t",
27,30,43
00000000000000000000000000100100000000000010000000000000000000
38,655,229,952
0x00000000900080000



}


let _keyMap = [
  'GTM', //0
  'LCtrl', //1
  'LAlt', //2
  'LSpace', //3
  'Present', //4
  'Plural', //5
  'RSpace', //6
  'Dup', //7
  'Win', //8
  'Left', //9
  'Down', //10
  'Right', //11
  'LShift', //12
  'z', //13
  'x', //14
  'c', //15
  'v', //16
  'b', //17
  'n', //18
  'm', //19
  ',', //20
  '.', //21
  '/', //22
  'RShift', //23
  'Up', //24
  'Del', //25
  'Spur', //26
  '0x0061', //27
  's', //28
  'd', //29
  'f', //30
  'g', //31
  'h', //32
  'j', //33
  'k', //34
  'l', //35
  ';', //36
  '\'', //37
  'Tab', //38
  'q', //39
  'w', //40
  'e', //41
  'r', //42
  't', //43
  'y', //44
  'u', //45
  'i', //46
  'o', //47
  'p', //48
  '[', //49
  '\\', //50
  '1', //51
  '2', //52
  '3', //53
  '4', //54
  '5', //55
  '6', //56
  '7', //57
  '8', //58
  '9', //59
  '0', //60
  '-', //61
  '=', //62
  'Back'  //63
];
_keyMap = _keyMap.reverse();


let _chordMaps = []

if ("serial" in navigator) {
  // The Web Serial API is supported.
  console.log("Web Serial API is supported.")
}else{
  // The Web Serial API is not supported.
  console.log("Web Serial API is not supported.")
}


navigator.serial.addEventListener('connect', e => {
  // Add |e.port| to the UI or automatically connect.
  console.log('port connected');
});

navigator.serial.addEventListener('disconnect', e => {
  // Remove |e.port| from the UI. If the device was open the
  // disconnection can also be observed as a stream error.
  console.log('port disconnected');
});

port = null;
reader = null;

async function startSerialConnection() {
  console.log("startSerialConnection()");
  try {
    // Prompt user to select any serial port.
    port = await navigator.serial.requestPort();
    console.log("requestPort");
    // Wait for the serial port to open.
    openSerialPort(port);

  } catch(error) {
    console.log(error);
  }

}

async function openSerialPort(){
  console.log("openSerialPort()");
  await port.open({ baudRate: 115200 });
  console.log("connected to serial port");
  console.log(port.getInfo());
  console.log(port);
}

async function bootLoader(){
  //Sends the bootloader command to the charachorder via the serial API
  sendCommandString("BOOTLOADER");

}

async function sendCommandString(commandString){
  console.log(port);
  if(port){
    if(port.readable.locked){
      console.log(port.readable);
      port.readable.locked = false;
      console.log(reader);
      //reader.releaseLock(); //assume we've already captured it
    }
    const encoder = new TextEncoder();
    const writer = port.writable.getWriter();
    await writer.write(encoder.encode(commandString+"\r\n"));
    writer.releaseLock();

    console.log("writing "+commandString+"\r\n");

    let decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable.pipeThrough(
      new TransformStream(new LineBreakTransformer())
    );

    reader = inputStream.getReader();
    readLoop();
  }else{
    console.log('serial port is not open yet');
  }
}

function getCount(){
  sendCommandString("COUNT");
}

function getGetAll(){
  sendCommandString("GETALL");
}


//javascript handles up to 53-bit bs it uses float64 to operate with integers


function BitwiseAndLarge(val1, val2) {
    var shift = 0, result = 0;
    var mask = ~((~0) << 30); // Gives us a bit mask like 01111..1 (30 ones)
    var divisor = 1 << 30; // To work with the bit mask, we need to clear bits at a time
    while( (val1 != 0) && (val2 != 0) ) {
        var rs = (mask & val1) & (mask & val2);
        val1 = Math.floor(val1 / divisor); // val1 >>> 30
        val2 = Math.floor(val2 / divisor); // val2 >>> 30
        for(var i = shift++; i--;) {
            rs *= divisor; // rs << 30
        }
        result += rs;
    }
    return result;
}





function downloadChordMapLibrary(){
  console.log(_chordMaps);
  const csvRows = [];
  for(const chordMap of _chordMaps){
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
}

$('document').ready(function(){
  document.getElementById('file-input').addEventListener('input', uploadChordMapLibrary);
});


function uploadChordMapLibrary(e){
  console.log(e);
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.readAsText(file,'UTF-8');

  reader.onload = readerEvent =>{
    var content = readerEvent.target.result;
    console.log(content);
  }
  //console.log(_chordMaps);
  //open file dialog box with only csv allowed
  //parse

}



function convertHexadecimalChordToHumanString(hexString){
  let humanString = "";
  //let num = parseInt(hexString, 16);
  //humanString = String(num);
  let bigNum = BigInt("0x"+hexString);
  let binString = bigNum.toString(2); //no left zeros; that's ok
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

  console.log(humanString);
  return humanString;
}

function convertHexadecimalPhraseToAsciiString(hexString){
  let asciiString = "";
  console.log("convertHexadecimalPhraseToAsciiString()");

  //assume 2x size
  //get every 2 characters
  //TODO covert to byte array and account for non-ascii inputs like mouse moves
  for (var i = 0; i < hexString.length; i += 2){
    asciiString += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
    //console.log("0x"+hexString.substr(i, 2));
    //asciiString += String.fromCharCode("0x"+hexString.substr(i, 2));
  }
  console.log(asciiString);
  return asciiString;
}


async function readLoop() {
 let i = 0;
 while (true) {
   const { value, done } = await reader.read();
   if (value) {
     let arrValue = [...value];
     //ascii_to_hexa(arrValue);
     strValue = String(arrValue.join(''));
     console.log(strValue);

     hexChordString = strValue.substr(0, 16);
     hexAsciiString = strValue.substr(17, strValue.length);
     strValues = ["",""];
     strValues[0] = convertHexadecimalChordToHumanString(hexChordString);
     strValues[1] = convertHexadecimalPhraseToAsciiString(hexAsciiString);
     console.log(strValues);

     //appendToList(strValues);
     _chordMaps.push(["0x"+hexChordString,strValues[1]]);

     appendToRow(strValues);
     if (done) {
       console.log("[readLoop] DONE", done);
       reader.releaseLock();
       break;
     }
   }
 }
}

let _chordMapIdCounter = 0


function addChordMap(){
  appendToRow(["0000000000000000","< blank>"]);
}

function appendToRow(data){
  var dataTable = document.getElementById("dataTable");
  var row = dataTable.insertRow(-1); //insert row at end of table

  var cells = []
  cells.push(row.insertCell(-1));
  cells.push(row.insertCell(-1));
  cells.push(row.insertCell(-1));
  cells.push(row.insertCell(-1));
  cells.push(row.insertCell(-1));

  cells[0].innerHTML = _chordMapIdCounter;
  _chordMapIdCounter++;
  cells[1].innerHTML = data[0];
  cells[2].innerHTML = data[1];

  var btnEdit = document.createElement('input');
  btnEdit.type = "button";
  btnEdit.className = "button1";
  btnEdit.value = "edit";
  cells[3].appendChild(btnEdit);

  var btnDelete = document.createElement('input');
  btnDelete.type = "button";
  btnDelete.className = "button2";
  btnDelete.value = "delete";
  cells[4].appendChild(btnDelete);
}

function appendToList(str){
  var ul = document.getElementById("list");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(str[0]+" "+str[1]));
  ul.appendChild(li);
}


class LineBreakTransformer {
  constructor() {
    this.chunks = '';
  }

  transform(chunk, controller) {
    this.chunks += chunk;
    const lines = this.chunks.split('\r\n');
    this.chunks = lines.pop();
    lines.forEach(line => controller.enqueue(line));
  }

  flush(controller) {
    controller.enqueue(this.chunks);
  }
}


function ascii_to_hexa(arr) {
 for (let i = 0; i < arr.length; i++) {
   arr[i] = Number(arr[i].charCodeAt(0)).toString(16);
 }
}
