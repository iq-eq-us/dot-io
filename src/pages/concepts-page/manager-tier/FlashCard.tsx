import React, { useState, useEffect } from 'react';
import { useStoreActions } from '../../../store/store';
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

interface FlashCardProps {
  flashCard: flashCard;
  index: number;
  selected: boolean[];
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
  const [showImageUrl, setShowImageUrl] = useState<boolean>(
    !!newFlashCard.imageSrc,
  );

  useEffect(() => {
    if (lockInputs && newFlashCard !== oldFlashCard) {
      setInputs(false);
    }
  }, [lockInputs, newFlashCard, oldFlashCard]);

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

  const onToggleImageUrlButtonClick = () => {
    setShowImageUrl(!showImageUrl);
  };

  const onSelectedChange = (selected: string) => {
    const commonProps = {
      question: newFlashCard.answer,
      imageSrc: '',
    };
  };

  const onClickSaveButton = () => {
    editFlashCard({ newFlashCard: newFlashCard, index: index });
    updateLocalStorage();
    setOldFlashCard(newFlashCard);
    setInputs(!lockInputs);
  };

  return (
    <CardContainer>
      <input
        type="checkbox"
        checked={selected}
        onClick={() => setSelected(index)}
        style={{ marginRight: '4px', marginLeft: '2px' }}
      />
      <InputIdentifiersForPhrase>
        Term
        <PhraseTextBox
          placeholder={newFlashCard.answer}
          disabled={lockInputs}
          onChange={(e) => {
            setNewFlashCard({
              ...newFlashCard,
              answer: e.target.value,
              question: e.target.value,
            });
          }}
          value={newFlashCard.answer}
        />
      </InputIdentifiersForPhrase>
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
      <InputIdentifiers>
        Image URL
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1px',
          }}
        >
          <span
            style={{
              color: showImageUrl ? '#2ecc71' : '#e74c3c',
              fontWeight: 'bold',
            }}
          ></span>
          <div
            onClick={onToggleImageUrlButtonClick}
            style={{
              width: '40px',
              height: '20px',
              borderRadius: '10px',
              backgroundColor: showImageUrl ? '#2ecc71' : '#e74c3c',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                transform: showImageUrl
                  ? 'translateX(20px)'
                  : 'translateX(2px)',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          </div>

          {showImageUrl && (
            <ChordTextBox
              placeholder="URL"
              disabled={lockInputs}
              onChange={(e) =>
                setNewFlashCard({
                  ...newFlashCard,
                  imageSrc: e.target.value,
                })
              }
              value={newFlashCard.imageSrc}
              style={{
                marginLeft: '10px',
              }}
            />
          )}
        </div>
      </InputIdentifiers>
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
