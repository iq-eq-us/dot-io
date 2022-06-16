import type { KeyHighlightPositionLite } from '../models/keyHighlightPositionsCharachorderLite';
import { chordLibrary } from '../data/chordLibrary';
import { keyPositions } from '../data/keyPositionsCharachorderLite';
import type { TrainingScenario } from '../models/trainingScenario';
import {pickerV1, pickerLite} from '../models/keyboardDropDownFolder/keyboardDropDown';

export type CharacterEntryModeLite = 'CHARACTER' | 'CHORD';

const SPACE_KEY_LOCATION = keyPositions?.['194-83'];

export const ConvertStringToKeyHighlightPositionsLite = (
  scenario: TrainingScenario | undefined,
  text: string,
  highlightMode: CharacterEntryModeLite,
  characterIndex: number,
): KeyHighlightPositionLite[] => {
  if (highlightMode === 'CHORD') {
    return getHighlightPositionForString(text, scenario);
  } else {
    if (characterIndex === -1) return [SPACE_KEY_LOCATION];
    return getHighlightPositionForString(text[characterIndex], scenario);
  }
};

const getHighlightPositionForString = (text: string, scenario: TrainingScenario | undefined) => {
  let chord = chordLibrary?.all?.[text];
  if (scenario =='CHORDING' && pickerV1){
      chord = chordLibrary.chords[text];
  } else if (scenario == 'CHORDING' && pickerLite){
    chord = chordLibrary.chordsLite[text];
  }
  if (chord) {
    const keyHighlightPositionsBeforeTransformation = chord.map(
      (nonTransformedKeyPosition) => keyPositions?.[nonTransformedKeyPosition],
    );
    return keyHighlightPositionsBeforeTransformation;
  }
  return [];
};
