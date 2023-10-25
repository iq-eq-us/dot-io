import React, { ReactElement } from 'react';

export function ForgotAnswer(): ReactElement {
  /*const addFlashCardSet = useStoreActions(
        (store) => store.flashCardActionModel.,
      );*/
  /* function addNewFlashCard() {
        const newFlashCard = flashCard('', '', '', '', '');
        flashCardActionModel.addFlashCard(newFlashCard);
      } */
  return (
    <React.Fragment>
      <button
        //className="import sc-bYwzuL text-white rounded-md bg-[#AD5050] hover:bg-[#FF0000] active:bg-[#222]"
        color="pink"
        //onClick={() => flashCardStoreActions.addEmptyFlashCardSet}
        //onClick={()=>{addNewFlashCard}}
      >
        Forgot Answer{' '}
      </button>
    </React.Fragment>
  );
}
