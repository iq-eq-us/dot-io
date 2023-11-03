import React, { ReactElement } from 'react';
import { useStoreActions } from '../../../store/store';
import uploadCSV from '../util/uploadCSV';

interface ImportFlashCardsProps {
  forceRerender: () => void;
}

export function ImportFlashCards({
  forceRerender,
}: ImportFlashCardsProps): ReactElement {
  const addEmptyFlashCardSet = useStoreActions(
    (actions) => actions.addEmptyFlashCardSet,
  );
  const addFlashCard = useStoreActions((actions) => actions.addFlashCard);
  const updateLocalStorage = useStoreActions(
    (actions) => actions.updateLocalStorage,
  );

  const hiddenFileInput = React.useRef(null);

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];

    const uploadedSet = await uploadCSV(uploadedFile);

    addEmptyFlashCardSet(uploadedSet.name);

    uploadedSet.flashCards.forEach((flashCard) => {
      addFlashCard(flashCard);
      updateLocalStorage();
    });
    updateLocalStorage();
    forceRerender();
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
}
