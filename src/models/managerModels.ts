export interface Chords {
    chords: ChordStructure[];
  }
  export interface ChordLayout {
    chordLayout: ChordLayoutStructure[];
  }
export interface ChordStructure {
  currentChord: string;
  currentPhrase: string;
  editedChord?: string;
  editedPhrase?: string;
  previousChord?: string;
  previousPhrase?: string;
  originalHexChord: string;
  originalHexPhrase: string;
  
}

export interface ChordLayoutStructure {
  keyMap: string,	
  keyMapPosition: string,	
  keyMapValue: string,
  
}

export const createChord = (
    inCurrentChord : string,
    inCurrentPhrase : string,
    inOrginalHexChord : string,
    inOrginalHexPhrase: string,
  ): ChordStructure => {
    return {
        currentChord: inCurrentChord,
        currentPhrase: inCurrentPhrase,
        editedChord: '',
        editedPhrase: '',
        previousChord: '',
        previousPhrase: '',
        originalHexChord: inOrginalHexChord,
        originalHexPhrase: inOrginalHexPhrase,
    };
  };

  export const createChordLayout = (
    inKeyMap : string,
    inKeyMapPosition : string,
    inKeyMapValue : string,
  ): ChordLayoutStructure => {
    return {
      keyMap: inKeyMap,	
      keyMapPosition: inKeyMapPosition,	
      keyMapValue: inKeyMapValue,
    };
  };