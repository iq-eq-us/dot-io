import type { KeyHighlightPosition } from '../models/keyHighlightPositions';
import { chordLibrary } from '../data/chordLibrary';
import { keyPositions } from '../data/keyPositions';
import type { TrainingScenario } from '../models/trainingScenario';
import {pickerV1, pickerLite} from '../models/keyboardDropDownFolder/keyboardDropDown';


const storedLibrary = JSON?.parse(localStorage?.getItem('chordsReadFromDevice'));


export type CharacterEntryMode = 'CHARACTER' | 'CHORD';

const SPACE_KEY_LOCATION = keyPositions?.['194-83'];

export const ConvertStringToKeyHighlightPositions = (
  scenario: TrainingScenario | undefined,
  text: string,
  highlightMode: CharacterEntryMode,
  characterIndex: number,
): KeyHighlightPosition[] => {
  if (highlightMode === 'CHORD') {
    return getHighlightPositionForString(text, scenario);
  }  else if(scenario == 'ALLCHORDS'){
    return getHighlightPositionForString(text, scenario);
  }else {
    if (characterIndex === -1) return [SPACE_KEY_LOCATION];
    return getHighlightPositionForString(text[characterIndex], scenario);
  }
};

function newFunc(text){
  for(let i =0; storedLibrary?.length; i++){
    console.log('inLoop');
    if(text == storedLibrary[i][1]){
      const chord= [];
      const tempChord = storedLibrary[i][0];
      for(let p =0; p < tempChord?.length; p++){
        console.log(tempChord[p]);
        chord.push(chordLibrary?.all?.[tempChord[p]])
      }
      return chord;
    }
  }
  }

const getHighlightPositionForString = (text: string, scenario: TrainingScenario | undefined) => {
  //console.log('Is this all chords' + scenario)
  let chord = chordLibrary?.all?.[text];
  if (scenario =='CHORDING' && pickerV1){
      chord = chordLibrary.chords[text];
  } else if (scenario == 'CHORDING' && pickerLite){
    chord = chordLibrary.chordsLite[text];
  }  else if (scenario == 'ALLCHORDS'){
    chord = newFunc(text);  
  }else if(scenario == 'LEXICOGRAPHIC' && pickerV1){
    chord = chordLibrary.chords[text];
  } else if(scenario == 'LEXICOGRAPHIC' && pickerLite){
    chord = chordLibrary.chordsLite[text];
  } else if(scenario == 'LEXICALSENTENCES' && pickerV1){
      chord = chordLibrary.lexicalSentences[text];
  }else {
    chord = chordLibrary?.all?.[text];
  }
  
  if (chord) {
    const keyHighlightPositionsBeforeTransformation = chord.map(
      (nonTransformedKeyPosition) => keyPositions?.[nonTransformedKeyPosition],
    );
    return keyHighlightPositionsBeforeTransformation;
  }
  return [];
};
