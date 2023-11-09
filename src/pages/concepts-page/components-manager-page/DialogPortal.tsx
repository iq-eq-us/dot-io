import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useStoreActions } from '../../../store/store';
import { add } from 'lodash';

export const DialogPortal = () => {
  const addTagFlashCard = useStoreActions((state) => state.addTagFlashCard);

  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const modalHeight = 150;
  const modalWidth = 300;
  const modalTop = windowHeight / 2 - modalHeight / 2;
  const modalLeft = windowWidth / 2 - modalWidth / 2;

  return (
    <div>
      <button
        className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
        color="pink"
        onClick={() => setShowModal(true)}
      >
        Add New Tag
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
            <input
              style={{ padding: '5px' }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="New Tag"
            />
            <div>
              <button
                className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
                color="pink"
                onClick={() => {
                  setShowModal(false);
                  setInput('');
                }}
              >
                Cancel
              </button>
              <button
                className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
                color="pink"
                onClick={() => {
                  addTagFlashCard({ key: input, index: undefined });
                  setShowModal(false);
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
