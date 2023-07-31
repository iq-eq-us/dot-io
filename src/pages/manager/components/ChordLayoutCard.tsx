import React, { ReactElement, useState } from 'react';
import {
  CardLayoutContainer,
  KeyMapTextBox,
  KeyMapPositionTextBox,
  KeyMapInputIdentifiers,
  FirstKeyMapInputIdentifiers,
  KeyMapValueTextBox,
  CardEditButton,
  CardDeleteButton,
  CardSaveButton,
  CardCancelDeleteButton,
  CardConfirmDeleteButton,
  CardCancelButton,
} from './ChordLayoutColumn.styled';

export function ChordLayoutCard(props: any): ReactElement {
  const keyMap: string = props.keyMap;
  const keyMapPosition: string = props.keyMapPosition;
  const keyMapValue: string = props.keyMapValue;

  const [lockInputs, setInputs] = useState<boolean>(true);
  const [phraseTextInput, setPhraseTextInput] = useState<string>('');
  const [chordTextInput, setChordTextInput] = useState<string>('');
  const [deleteButtonProps, setDeleteButtonProps] = useState<boolean>(false);

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

  return (
    <CardLayoutContainer>
      <FirstKeyMapInputIdentifiers>
        Key Map
        <KeyMapTextBox placeholder={keyMap} />
      </FirstKeyMapInputIdentifiers>
      <div
        className={`mx-auto h-full border-b-[60px] ${
          props.index % 2 == 0
            ? ' rotate-360 border-r-[25px] border-l-[0px]'
            : 'rotate-180 border-r-[0px] border-l-[25px]'
        }  border-r-transparent border-l-transparent border-b-[#778D83]`}
      />
      <KeyMapInputIdentifiers>
        Key Map Position
        <KeyMapPositionTextBox placeholder={keyMapPosition} />
      </KeyMapInputIdentifiers>
      <KeyMapInputIdentifiers>
        Key Map Value
        <KeyMapValueTextBox placeholder={keyMapValue} />
      </KeyMapInputIdentifiers>
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
    </CardLayoutContainer>
  );
}
