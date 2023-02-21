import type { KeyHighlightPositionLite } from '../models/keyHighlightPositionsCharachorderLite';
import { chordLibrary } from '../data/chordLibrary';
import { keyPositions, keyPositionsByLetter } from '../data/keyPositionsCharachorderLite';
import type { TrainingScenario } from '../models/trainingScenario';
import {pickerV1, pickerLite} from '../models/keyboardDropDownFolder/keyboardDropDown';
import type { ChordStatisticsFromDevice } from '../../src/models/trainingStatistics';
import type { TrainingLevels } from '../../src/models/trainingLevels';

export type CharacterEntryModeLite = 'CHARACTER' | 'CHORD';

const storedLibrary = JSON?.parse(localStorage?.getItem('chordsReadFromDevice'));
//const allChord = JSON?.parse(localStorage?.getItem('chordsReadFromDevice'));
const SPACE_KEY_LOCATION = keyPositions?.['194-83'];

export const ConvertStringToKeyHighlightPositionsLite = (
  scenario: TrainingScenario | undefined,
  text: string,
  highlightMode: CharacterEntryModeLite,
  characterIndex: number,
  trainingLevel: TrainingLevels,

): KeyHighlightPositionLite[] => {

  if (highlightMode === 'CHORD') {
    return getHighlightPositionForString(text, scenario, trainingLevel);
  } else if(trainingLevel == 'CHM'){
    return getHighlightPositionForString(text, scenario, trainingLevel);
  } else {
    if (characterIndex === -1) return [SPACE_KEY_LOCATION];
    return getHighlightPositionForString(text[characterIndex], scenario, trainingLevel);
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

const getHighlightPositionForString = (text: string, scenario: TrainingScenario | undefined, trainingLevel: TrainingLevels) => {
    //console.log('Is this all chords' + scenario)

  let chord = chordLibrary?.all?.[text];
  if(trainingLevel == 'CHM') {
    if(scenario == 'LEXICAL' && pickerV1) {
      chord = chordLibrary.chords[text];

    } else if(scenario == 'LEXICAL' && pickerLite) {
      chord = chordLibrary.chordsLite[text];
    } else if (scenario =='LEXICOGRAPHIC' && pickerV1){
      chord = chordLibrary.chords[text];
    } else if (scenario == 'LEXICOGRAPHIC' && pickerLite){
      chord = chordLibrary.chordsLite[text];
    } else {
    chord = parseChord(text); 
    } 
  } else if (scenario =='CHORDING' && pickerV1){
    chord = parseChord(text);
  } else if (scenario == 'CHORDING' && pickerLite){
    chord = parseChord(text);
  } else if (scenario == 'ALLCHORDS'){
    //const filteredList = storedLibrary.filter( (e: any) => (e.find(text)));
    chord = parseChord(text);  
    //console.log('Is this all chords' + newFunc(text))
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
