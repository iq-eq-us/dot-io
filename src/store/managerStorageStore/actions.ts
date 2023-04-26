import { action, thunk } from 'easy-peasy';
import type {
  ManagerStoreActions,
} from '../../models/managerStorage';
import type { ManagerStore } from '../../models/managerStorage';
import { sendCommandString, readGetOneAndReturnOne } from '../../pages/manager/controls/mainControls';
import { convertHumanChordToHexadecimalChord, convertHumanStringToHexadecimalPhrase } from '../../pages/manager/controls/mainControls';

/**
 * This section contains all the state for the Manager storage.
 * It also handles merging existing chords into the stored chords to make exproting and importing seemless.
 */


const managerStorageStoreActions: ManagerStoreActions = {
  setDownloadedChords: action((state, payload) => {
    state.downloadedChords.chords.push(payload);
  }),
  deleteDownloadedChordsData: action((state, payload) => {
    const tempV = deleteChordInManager(state, payload);
    state.downloadedChords.chords = tempV;
  }),
  saveDownloadedChordsData: action((state, payload) => {
    saveEditedChordInManager(state, payload);
  }),
  setDownloadedChordLayout: action((state, payload) => {
    state.downloadedChordLayout.chordLayout.push(payload);
  }),
  setImportedChords: action((state, payload) => {
    console.log(payload)
    state.downloadedChords.chords = payload;
  }),
  clearDownloadedChords: action((state) => {
    state.downloadedChords.chords = [];
  }),
 clearDownloadedChordLayout: action((state) => {
    state.downloadedChordLayout.chordLayout = [];
  }),
  setSerialApiRequests: action((state, payload) => {
    state.serialApiRequests.push(payload);

  }),
  setSerialApiResponses: action((state, payload) => {
    state.serialApiResponses.push(payload);
  }),
  updateSerialAPiDataThunk:thunk(async(state, payload) => {
    sendCommandString(payload);
    state.setSerialApiRequests(payload);
    const returnedResponse = await readGetOneAndReturnOne();
    state.setSerialApiRequests(returnedResponse);
  }),

};
export interface ChordStructure {
  currentChord: string;
  currentPhrase: string;
  editedChord?: string;
  editedPhrase?: string;
  previousChord?: string;
  previousPhrase?: string;
  index: number;
}

export interface Chords {
  chords: ChordStructure[];
}

function deleteChordInManager(store ,payload) {
  const currentChord = payload[0];
  const currentPhrase = payload[1];
  const deleteChordHex = payload[2];


  store.downloadedChords.chords.splice(store.downloadedChords.chords.findIndex(v => v.currentChord === currentChord && v.currentPhrase === currentPhrase), 1);

  //console.log(store.downloadedChords.chords.findIndex(v => v.currentChord === currentChord && v.currentPhrase === currentPhrase));
  sendCommandString('CML C4 ' + deleteChordHex);
return store.downloadedChords.chords;
}


function saveEditedChordInManager(store,payload) {
  const currentChord = payload[0];
  const currentPhrase = payload[1];
  let newPhrase = payload[2];
  let newChord = payload[3];
  let newHexPhrase;
  let newHexChord;


  const ChordStruct = store.downloadedChords.chords.find(
    (c: ChordStructure) => c.currentChord === currentChord && c.currentPhrase === currentPhrase,
  ) as ChordStructure;

  
  if(newPhrase == '' || newPhrase.length == 0){
  
    newPhrase = currentPhrase;
    newHexPhrase = convertHumanStringToHexadecimalPhrase(currentPhrase);
  } else{
  newHexPhrase = convertHumanStringToHexadecimalPhrase(newPhrase);

  }

  if(newChord == '' || newChord.length == 0){
    newChord = currentChord;
    newHexChord = convertHumanChordToHexadecimalChord(currentChord);
  } else {
  newHexChord = convertHumanChordToHexadecimalChord(newChord);
  }

  ChordStruct.currentPhrase = newPhrase;
  ChordStruct.currentChord = newChord;
  ChordStruct.previousChord = ChordStruct.currentChord;
  ChordStruct.previousPhrase = ChordStruct.currentPhrase;



  sendCommandString('CML C3 ' + newHexChord + ' ' + newHexPhrase);
    store.downloadedChords = {
      chords: store.downloadedChords.chords.map(
        (e: ChordStructure) => (e.currentChord === currentChord && e.currentPhrase === currentPhrase ? ChordStruct : e),
      ),
    };

}

export default managerStorageStoreActions;
