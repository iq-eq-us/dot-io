import React from 'react';
import type { flashCard } from '../../../models/flashCardsModel';
import {
  FlashCardEditButton,
  FlashCardSaveButton,
  FlashCardCancelButton,
  CardContainer,
  ChordTextBox,
  PhraseTextBox,
  FlashCardDeleteButton,
  InputIdentifiers,
  InputIdentifiersForPhrase,
  FlashCardConfirmDeleteButton,
  FlashCardCancelDeleteButton,
} from './FlashCardManagerCardColumn.styled';

import { useStoreActions } from '../../../store/store';

interface FlashCardProps {
  flashCard: flashCard;
  index: number;
  forceRerender: () => void;
}

const FlashCard = ({ flashCard, index, forceRerender }: FlashCardProps) => {
  const removeFlashCard = useStoreActions((actions) => actions.removeFlashCard);
  const editFlashCard = useStoreActions((actions) => actions.editFlashCard);
  const updateLocalStorage = useStoreActions(
    (actions) => actions.updateLocalStorage,
  );

  const [lockInputs, setInputs] = React.useState<boolean>(true);
  const [deleteButtonProps, setDeleteButtonProps] = React.useState(false);
  const [questionInput, setQuestionInput] = React.useState<string>(
    flashCard.question,
  );
  const [answerInput, setAnswerInput] = React.useState<string>('');
  const [imageURL, setImageURL] = React.useState<string>('');

  const onClickConfirmDeleteButton = () => {
    setDeleteButtonProps(!deleteButtonProps);
    removeFlashCard(index);
    updateLocalStorage();
  };

  const onClickCancelDeleteButton = () => {
    setDeleteButtonProps(!deleteButtonProps);
  };

  const onClickDeleteButton = () => {
    setDeleteButtonProps(!deleteButtonProps);
  };

  const onClick = () => {
    setInputs(!lockInputs);
    setAnswerInput('');
    setQuestionInput('');
    setImageURL('');
  };

  const onClickSaveButton = () => {
    setInputs(!lockInputs);

    const ImagePresent = imageURL.length > 0 ? true : false;
    const newFlashCard: flashCard = {
      question: questionInput,
      answer: answerInput,
      image: ImagePresent,
      url: imageURL,
      tags: [],
      ebbinghausValue: 0,
      nextReinforcement: new Date(),
    };

    editFlashCard({ newFlashCard: newFlashCard, index: index });
    updateLocalStorage();
  };

  return (
    <CardContainer>
      <InputIdentifiersForPhrase>
        Term
        <PhraseTextBox
          placeholder={flashCard.question}
          disabled={lockInputs}
          onChange={(e) => setQuestionInput(e.target.value)}
          value={questionInput}
          //value = {questionInput}
        />
      </InputIdentifiersForPhrase>
      <InputIdentifiers>
        Definition
        <ChordTextBox
          placeholder={flashCard.answer}
          disabled={lockInputs}
          onChange={(e) => setAnswerInput(e.target.value)}
          value={answerInput}
        />
      </InputIdentifiers>
      <InputIdentifiers>
        URL
        <ChordTextBox
          placeholder={flashCard.url}
          disabled={lockInputs}
          onChange={(e) => setImageURL(e.target.value)}
          value={imageURL}
        />
      </InputIdentifiers>
      <FlashCardEditButton
        onClick={onClick}
        cancelled={lockInputs}
        shouldDelete={deleteButtonProps}
      >
        Edit Flashcards
      </FlashCardEditButton>
      <FlashCardCancelButton
        onClick={onClick}
        cancelled={lockInputs}
        shouldDelete={deleteButtonProps}
      >
        Cancel
      </FlashCardCancelButton>
      <FlashCardSaveButton
        onClick={() => onClickSaveButton()}
        cancelled={lockInputs}
        shouldDelete={deleteButtonProps}
      >
        Save
      </FlashCardSaveButton>
      <FlashCardDeleteButton
        onClick={onClickDeleteButton}
        shouldDelete={deleteButtonProps}
      >
        Delete
      </FlashCardDeleteButton>
      <FlashCardCancelDeleteButton
        onClick={onClickCancelDeleteButton}
        shouldDelete={deleteButtonProps}
      >
        Cancel
      </FlashCardCancelDeleteButton>
      <FlashCardConfirmDeleteButton
        onClick={onClickConfirmDeleteButton}
        shouldDelete={deleteButtonProps}
      >
        Confirm
      </FlashCardConfirmDeleteButton>
    </CardContainer>
  );
};

export default FlashCard;
