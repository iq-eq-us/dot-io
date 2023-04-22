import React, { ReactElement, useState } from 'react';
import { getCumulativeAverageChordTypeTime } from '../../../helpers/aggregation';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import { useStoreActions, useStoreState } from '../../../store/store';

import {
    CardEditButton,
     CardSaveButton,
     CardCancelButton, 
     CardContainer, 
     ChordTextBox, 
     PhraseTextBox, 
     CardDeleteButton,
     InputIdentifiers,
    } from './ChordMapCardColumn.styled'

import usePopover from '../../../hooks/usePopover';
import { values } from 'lodash';


export interface CardProps {
  currentChord: string;
  currentPhrase: string;
  editedChord?: string;
  editedPhrase?: string;
  previousChord?: string;
  previousPhrase?: string;
  index: number;
  }

export function ChordMapCard(
  props: any,
  index: number
): ReactElement {
    const [lockInputs, setInputs] = useState<boolean>(true);
    const [phraseTextInput, setPhraseTextInput] = useState<string>('');
    const [chordTextInput, setChordTextInput] = useState<string>('');
    const [previousText, setPreviousText] = useState<string>('');


    const deleteDownloadedChordsData = useStoreActions((store) => store.deleteDownloadedChordsData);
    const saveDownloadedChordsData = useStoreActions((store) => store.saveDownloadedChordsData);


    const chord : string = props.currentChord;
    const phrase : string  = props.currentPhrase; 
    const originalHexChord = props.originalHexChord;
    const originalHexPhrase = props.originalHexPhrase;

    const payloadArray = [];
    payloadArray.push(chord);
    payloadArray.push(phrase);
    payloadArray.push(originalHexChord);

  const onClick = () => {
  setInputs(!lockInputs);
  setChordTextInput('');
  }

  const onClickSaveButton = () =>{
    const inArray = [];
    inArray.push(chord);
    inArray.push(phrase);
    inArray.push(phraseTextInput);
    inArray.push(chordTextInput);
    inArray.push(originalHexChord);
    inArray.push(originalHexPhrase);

    saveDownloadedChordsData(inArray);
    setInputs(!lockInputs);

  }
  
  const onClickDeleteButton = () => {
  deleteDownloadedChordsData(payloadArray); 
  }



  function change(event) {
    if(chordTextInput != '' && event.key != 'Delete' && event.key!= 'Backspace'){
      let chord = '';
      const splitChord = chordTextInput.split(" + ").join(""); 
      console.log(splitChord)
      for(let i =0; i < splitChord.length; i++){
      
        chord += splitChord[i] + ' + '; //add this + between action ids; put here so we don't have to remove it at end of for-loop
      }

    return chord;
    } else if(event.key == 'Delete' || event.key == 'Backspace'){
      return chordTextInput.slice(0, -3);
    }
    else
    return '';
  }
  return (
    <React.Fragment>
    <CardContainer>
        <InputIdentifiers>Output
        <PhraseTextBox 
        placeholder={phrase.toString()}
        disabled={lockInputs}
        onChange={e => setPhraseTextInput(e.target.value)}
        /> 
        </InputIdentifiers>
        <InputIdentifiers>Input
        <ChordTextBox 
        placeholder={chord.toString()}
        disabled={lockInputs}
        onKeyDown= {e => setChordTextInput(change(e))}
        onChange={e => setChordTextInput(e.target.value)}
        value={chordTextInput}
        />
        </InputIdentifiers>
        <CardEditButton onClick={onClick}
        cancelled={lockInputs}
        >Edit Chord</CardEditButton>
        <CardCancelButton onClick={onClick} cancelled={lockInputs}>Cancel</CardCancelButton>
        <CardSaveButton onClick={onClickSaveButton}cancelled={lockInputs}>Save</CardSaveButton>
        <CardDeleteButton onClick={onClickDeleteButton}>Delete</CardDeleteButton>
    </CardContainer>
    </React.Fragment>

  );
}
