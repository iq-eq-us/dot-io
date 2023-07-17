import React, { ReactElement, useState } from 'react';
import { useStoreActions } from '../../../store/store';

import {
  CardEditButton,
  CardSaveButton,
  CardCancelButton,
  CardContainer,
  ChordTextBox,
  PhraseTextBox,
  CardDeleteButton,
  InputIdentifiers,
  CardConfirmDeleteButton,
  CardCancelDeleteButton,
} from './ChordMapCardColumn.styled';

export interface CardProps {
  currentChord: string;
  currentPhrase: string;
  editedChord?: string;
  editedPhrase?: string;
  previousChord?: string;
  previousPhrase?: string;
  index: number;
}

export function ChordMapCard(props: any, index: number): ReactElement {
  const [lockInputs, setInputs] = useState<boolean>(true);
  const [phraseTextInput, setPhraseTextInput] = useState<string>('');
  const [chordTextInput, setChordTextInput] = useState<string>('');
  const [deleteButtonProps, setDeleteButtonProps] = useState<boolean>(false);

  const deleteDownloadedChordsData = useStoreActions(
    (store) => store.deleteDownloadedChordsData,
  );
  const saveDownloadedChordsData = useStoreActions(
    (store) => store.saveDownloadedChordsData,
  );

  const chord: string = props.currentChord;
  const phrase: string = props.currentPhrase;
  const originalHexChord = props.originalHexChord;
  const originalHexPhrase = props.originalHexPhrase;

  const payloadArray = [];
  payloadArray.push(chord);
  payloadArray.push(phrase);
  payloadArray.push(originalHexChord);

  const onClick = () => {
    setInputs(!lockInputs);
    setChordTextInput('');
  };

  const onClickCancelDeleteButton = () => {
    setDeleteButtonProps(!deleteButtonProps);
  };

  const onClickDeleteButton = () => {
    setDeleteButtonProps(!deleteButtonProps);
  };

  const onClickSaveButton = () => {
    const inArray = [];
    inArray.push(chord);
    inArray.push(phrase);
    inArray.push(phraseTextInput);
    inArray.push(chordTextInput);
    inArray.push(originalHexChord);
    inArray.push(originalHexPhrase);

    saveDownloadedChordsData(inArray);
    setInputs(!lockInputs);
  };

  const onClickConfirmDeleteButton = () => {
    deleteDownloadedChordsData(payloadArray);
  };

  function change(event) {
    if (
      chordTextInput != '' &&
      event.key != 'Delete' &&
      event.key != 'Backspace'
    ) {
      let chord = '';
      const splitChord = chordTextInput.split(' + ').join('');
      console.log(splitChord);
      for (let i = 0; i < splitChord.length; i++) {
        chord += splitChord[i] + ' + ';
      }

      return chord;
    } else if (event.key == 'Delete' || event.key == 'Backspace') {
      return chordTextInput.slice(0, -3);
    } else return '';
  }

  return (
    <React.Fragment>
      <CardContainer>
        <InputIdentifiers>
          Output
          <PhraseTextBox
            placeholder={phrase.toString()}
            disabled={lockInputs}
            onChange={(e) => setPhraseTextInput(e.target.value)}
          />
        </InputIdentifiers>
        <InputIdentifiers>
          Input
          <ChordTextBox
            placeholder={chord.toString()}
            disabled={lockInputs}
            onKeyDown={(e) => setChordTextInput(change(e))}
            onChange={(e) => setChordTextInput(e.target.value)}
            value={chordTextInput}
          />
        </InputIdentifiers>
        <CardEditButton
          onClick={onClick}
          cancelled={lockInputs}
          shouldDelete={deleteButtonProps}
        >
          Edit Chord
        </CardEditButton>
        <CardCancelButton
          onClick={onClick}
          cancelled={lockInputs}
          shouldDelete={deleteButtonProps}
        >
          Cancel
        </CardCancelButton>
        <CardSaveButton
          onClick={onClickSaveButton}
          cancelled={lockInputs}
          shouldDelete={deleteButtonProps}
        >
          Save
        </CardSaveButton>
        <CardDeleteButton
          onClick={onClickDeleteButton}
          shouldDelete={deleteButtonProps}
        >
          Delete
        </CardDeleteButton>
        <CardCancelDeleteButton
          onClick={onClickCancelDeleteButton}
          shouldDelete={deleteButtonProps}
        >
          Cancel
        </CardCancelDeleteButton>
        <CardConfirmDeleteButton
          onClick={onClickConfirmDeleteButton}
          shouldDelete={deleteButtonProps}
        >
          Confirm
        </CardConfirmDeleteButton>
      </CardContainer>
    </React.Fragment>
  );
}
