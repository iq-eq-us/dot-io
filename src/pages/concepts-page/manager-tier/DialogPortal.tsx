import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useStoreActions, useStoreState } from '../../../store/store';
import type { flashCard } from '../../../models/flashCardsModel';
import { FlashCard } from './FlashCard';
import CustomDropDown from './CustomDropDown';

interface DialogPortalProps {
  selectedFlashcardIndices: number[];
}

export const DialogPortal = ({
  selectedFlashcardIndices,
}: DialogPortalProps) => {
  const addTagFlashCard = useStoreActions((state) => state.addTagFlashCard);
  const updatedFlashCards = useStoreState((state) => state.flashCards);

  const [showModal, setShowModal] = useState(false);

  const [customTag, setCustomTag] = useState('');

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const modalHeight = 150;
  const modalWidth = 300;
  const modalTop = windowHeight / 1.5 + modalHeight / 1.5;
  const modalLeft = windowWidth / 2 - modalWidth / 2;

  const handleAddTag = () => {
    console.log('Adding tag:', customTag);

    selectedFlashcardIndices.forEach((index) => {
      addTagFlashCard({ key: customTag, index });
    });

    // Log flashcards and their tags
    updatedFlashCards.forEach((flashCard, index) => {
      console.log(`Flashcard ${index + 1}:`, flashCard);
      console.log('Tags:', flashCard.tags);
    });

    setCustomTag('');
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
        color="pink"
        onClick={() => setShowModal(true)}
      >
        Add Tag
      </button>
      {showModal &&
        createPortal(
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              boxShadow: 'rgba(100, 100, 111, .3) 0px 7px 29px 0px',
              backgroundColor: 'white',
              position: 'absolute',
              top: modalTop,
              left: modalLeft,
              height: modalHeight,
              width: modalWidth,
              flexDirection: 'column',
            }}
          >
            <h1>New Tag: </h1>
            <CustomDropDown setCustomTag={setCustomTag} />
            <div>
              <button
                className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
                color="pink"
                onClick={() => {
                  setShowModal(false);
                  setCustomTag('');
                }}
              >
                Cancel
              </button>
              <button
                className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
                color="pink"
                onClick={() => {
                  handleAddTag();
                }}
              >
                Confirm
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
