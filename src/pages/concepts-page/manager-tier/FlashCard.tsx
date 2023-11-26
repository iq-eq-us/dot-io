import React, { useState, useEffect } from 'react';
import { useStoreActions } from '../../../store/store';
import type { flashCard } from '../../../models/flashCardsModel';
import { Dropdown } from './Dropdown';
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

interface FlashCardProps {
  flashCard: flashCard;
  index: number;
  selected: boolean;
  setSelected: (index: number) => void;
}

export const FlashCard = ({
  flashCard,
  index,
  selected,
  setSelected,
}: FlashCardProps) => {
  const removeFlashCard = useStoreActions((actions) => actions.removeFlashCard);
  const editFlashCard = useStoreActions((actions) => actions.editFlashCard);
  const updateLocalStorage = useStoreActions(
    (actions) => actions.updateLocalStorage,
  );

  const [lockInputs, setInputs] = useState<boolean>(true);
  const [deleteButtonProps, setDeleteButtonProps] = useState(false);
  const [oldFlashCard, setOldFlashCard] = useState<flashCard>(flashCard);
  const [newFlashCard, setNewFlashCard] = useState<flashCard>(flashCard);

  useEffect(() => {
    if (lockInputs && newFlashCard.type !== oldFlashCard.type) {
      setInputs(false);
    }
  });

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

  const onClickCancelButton = () => {
    setNewFlashCard(oldFlashCard);
    setInputs(!lockInputs);
  };

  const onClick = () => {
    setInputs(!lockInputs);
  };

  const onSelectedChange = (selected: string) => {
    if (selected === 'text') {
      setNewFlashCard({
        ...newFlashCard,
        type: 'text',
        question: newFlashCard.answer,
        imageSrc: '',
      });
    } else if (selected === 'translation') {
      setNewFlashCard({
        ...newFlashCard,
        type: 'translation',
        question: newFlashCard.answer,
        imageSrc: '',
      });
    } else if (selected === 'image') {
      setNewFlashCard({ ...newFlashCard, type: 'image', question: '' });
    }
  };

  const onClickSaveButton = () => {
    editFlashCard({ newFlashCard: newFlashCard, index: index });
    updateLocalStorage();
    setOldFlashCard(newFlashCard);
    setInputs(!lockInputs);
  };

  const showCorrectInput = () => {
    if (newFlashCard.type === 'text') {
      return <InputIdentifiers style={{ width: '221px' }} />;
    } else if (newFlashCard.type === 'translation') {
      return (
        <InputIdentifiers>
          Translation
          <ChordTextBox
            placeholder={newFlashCard.question}
            disabled={lockInputs}
            onChange={(e) =>
              setNewFlashCard({ ...newFlashCard, question: e.target.value })
            }
            value={newFlashCard.question}
          />
        </InputIdentifiers>
      );
    } else if (newFlashCard.type === 'image') {
      return (
        <InputIdentifiers>
          URL
          <ChordTextBox
            placeholder={newFlashCard.imageSrc}
            disabled={lockInputs}
            onChange={(e) =>
              setNewFlashCard({ ...newFlashCard, imageSrc: e.target.value })
            }
            value={newFlashCard.imageSrc}
          />
        </InputIdentifiers>
      );
    }
  };

  return (
    <CardContainer>
      <input
        type="checkbox"
        checked={selected}
        onClick={() => setSelected(index)}
      />
      <Dropdown
        name="hi"
        options={['text', 'translation', 'image']}
        selected={newFlashCard.type}
        onSelectedChange={onSelectedChange}
      />
      <InputIdentifiersForPhrase>
        Term
        <PhraseTextBox
          placeholder={newFlashCard.answer}
          disabled={lockInputs}
          onChange={(e) => {
            if (newFlashCard.type === 'text') {
              setNewFlashCard({
                ...newFlashCard,
                answer: e.target.value,
                question: e.target.value,
              });
            } else {
              setNewFlashCard({ ...newFlashCard, answer: e.target.value });
            }
          }}
          value={newFlashCard.answer}
          //value = {questionInput}
        />
      </InputIdentifiersForPhrase>
      {showCorrectInput()}
      <FlashCardEditButton
        onClick={onClick}
        cancelled={lockInputs}
        shouldDelete={deleteButtonProps}
      >
        Edit Flashcards
      </FlashCardEditButton>
      <FlashCardCancelButton
        onClick={() => onClickCancelButton()}
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
