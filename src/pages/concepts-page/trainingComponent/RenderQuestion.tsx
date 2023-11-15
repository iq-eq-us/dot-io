import React, { ReactElement } from 'react';
import type { flashCard } from 'src/models/flashCardsModel';

interface RenderQuestionProps {
  flashCard: flashCard;
}

export const RenderQuestion = ({ flashCard }: RenderQuestionProps) => {
  let ResultElement: ReactElement;

  if (flashCard.question === '') {
    ResultElement = (
      <img
        src={flashCard.imageSrc}
        alt="Image"
        style={{
          maxHeight: '80%',
          maxWidth: '80%',
          minWidth: '40%',
          minHeight: '40%',
        }}
      />
    );
  } else {
    ResultElement = <p>{flashCard.question}</p>;
  }

  return <>{ResultElement}</>;
};
