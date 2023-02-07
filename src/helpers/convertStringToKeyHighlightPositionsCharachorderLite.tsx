import type { KeyHighlightPositionLite } from '../models/keyHighlightPositionsCharachorderLite';
import { chordLibrary } from '../data/chordLibrary';
import { keyPositions, keyPositionsByLetter } from '../data/keyPositionsCharachorderLite';
import type { TrainingScenario } from '../models/trainingScenario';
import {pickerV1, pickerLite} from '../models/keyboardDropDownFolder/keyboardDropDown';
import type { ChordStatisticsFromDevice } from '../../src/models/trainingStatistics';

export type CharacterEntryModeLite = 'CHARACTER' | 'CHORD';

const storedLibrary = JSON?.parse(localStorage?.getItem('chordsReadFromDevice'));
//const allChord = JSON?.parse(localStorage?.getItem('chordsReadFromDevice'));
const SPACE_KEY_LOCATION = keyPositions?.['194-83'];

export const ConvertStringToKeyHighlightPositionsLite = (
  scenario: TrainingScenario | undefined,
  text: string,
  highlightMode: CharacterEntryModeLite,
  characterIndex: number,
): KeyHighlightPositionLite[] => {
  if (highlightMode === 'CHORD') {
    return getHighlightPositionForString(text, scenario);
  } else if(scenario == 'ALLCHORDS'){
    return getHighlightPositionForString(text, scenario);
  } else {
    if (characterIndex === -1) return [SPACE_KEY_LOCATION];
    return getHighlightPositionForString(text[characterIndex], scenario);
  }
};


function parseChord(text){
  const chordStats = storedLibrary?.statistics?.find(
    (c: ChordStatisticsFromDevice) => c.id === text,
  ) as ChordStatisticsFromDevice;
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
  } else if (scenario == 'ALLCHORDS'){
    chord = parseChord(text);  
  }
  //console.log('this is the chord '+ chord)
  if (chord) {
    const keyHighlightPositionsBeforeTransformation = chord.map(
      (nonTransformedKeyPosition) => keyPositions?.[nonTransformedKeyPosition],
    );
    return keyHighlightPositionsBeforeTransformation;
  }
  return [];
};
