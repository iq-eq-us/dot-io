import type { KeyHighlightPosition } from '../models/keyHighlightPositions';
import { chordLibrary } from '../data/chordLibrary';
import { keyPositions } from '../data/keyPositions';
import type { TrainingScenario } from '../models/trainingScenario';
import {pickerV1, pickerLite} from '../models/keyboardDropDownFolder/keyboardDropDown';
import type { ChordStatisticsFromDevice } from '../../src/models/trainingStatistics';


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

function parseChord(text : string){
  const chordStats = storedLibrary?.statistics?.find(
    (c: ChordStatisticsFromDevice) => c.id === text,
  ) as ChordStatisticsFromDevice;
    //console.log('inLoop');
      const chord= [];
     // const tempChord = storedLibrary[i][0];
      for(let p =0; p < chordStats?.chord?.length; p++){
        //console.log(tempChord[p]);
        chord.push(chordLibrary?.all?.[chordStats?.chord[p]])
      }
      return chord;
  
  }

const getHighlightPositionForString = (text: string, scenario: TrainingScenario | undefined) => {
  let chord = chordLibrary?.all?.[text];
  if (scenario =='CHORDING' && pickerV1){
    chord = parseChord(text);
  } else if (scenario == 'CHORDING' && pickerLite){
    chord = parseChord(text);
  }  else if (scenario == 'ALLCHORDS'){
    chord = parseChord(text);  
  }else if(scenario == 'LEXICOGRAPHIC' && pickerV1){
    chord = parseChord(text);
  } else if(scenario == 'LEXICOGRAPHIC' && pickerLite){
    chord = parseChord(text);
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
