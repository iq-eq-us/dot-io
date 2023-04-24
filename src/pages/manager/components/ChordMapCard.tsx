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

  function showModal(){
    console.log('show modal')
    return(
      <div className="flex-row relative border-zinc-400 border-4	left-56 rounded-xl absolute ml-80 mt-24 justify-center h-2/5 bg-white">
        <button
          className={`close absolute ml-96 text-5xl pl-8 pt-4 text-[#181818]`}
          onClick={() => [
            //setPasswordModulModalToggle(!passwordModulModalToggle),
          ]}
        >
          &times;
        </button>
        <p className="pt-2 m-10 font-bold mr-64">Enter the secret phrase!</p>
        <p className={`pt-2 m-10 font-bold mr-64 text-red-500 `}>Wrong phrase!</p>
        <input type="password" className='border-black border-2 ml-16 w-3/4'></input>
        <button
          className={`drop-shadow-2xl right-arrow text-white rounded inline-block p-2 ml-48 mt-4 focus bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]`}
        //  onClick={() => [passwordUnlock(inputRef)]}
        >
          Unlock
        </button>
      </div>
    
        
   );
  }



  function change(event) {
    if(chordTextInput != '' && event.key != 'Delete' && event.key!= 'Backspace'){
      let chord = '';
      const splitChord = chordTextInput.split(" + ").join(""); 
      console.log(splitChord)
      for(let i =0; i < splitChord.length; i++){
      
        chord += splitChord[i] + ' + ';
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
