import React from 'react';
import { useStoreActions } from '../../../store/store';
import uploadCSV from '../util/uploadCSV';

export const ImportFlashCards = () => {
  const addFlashCard = useStoreActions((actions) => actions.addFlashCard);
  const addTagFlashCard = useStoreActions((actions) => actions.addTagFlashCard);
  const updateLocalStorage = useStoreActions(
    (actions) => actions.updateLocalStorage,
  );

  const hiddenFileInput = React.useRef(null);

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];

    uploadCSV(uploadedFile).then((flashCards) => {
      flashCards.forEach((flashCard, index) => {
        addFlashCard(flashCard);
        flashCard.tags.forEach((tag: string) => {
          addTagFlashCard({ key: tag, index: index });
        });
      });
      updateLocalStorage();
    });
  };

  return (
    <>
      <button
        className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
        color="pink"
        onClick={() => hiddenFileInput.current.click()}
      >
        Import Flashcards
      </button>
      <input
        type="file"
        onChange={async (e) => {
          await handleFileUpload(e);
          e.target.value = '';
        }}
        ref={hiddenFileInput}
        style={{ display: 'none' }}
      />
    </>
  );
};
