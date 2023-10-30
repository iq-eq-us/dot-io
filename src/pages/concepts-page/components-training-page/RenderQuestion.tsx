import React, { ReactElement } from 'react';
import type { flashCard } from 'src/models/flashCardsModel';

interface RenderQuestionProps {
  flashCard: flashCard;
}

const RenderQuestion = ({ flashCard }: RenderQuestionProps) => {
  let ResultElement: ReactElement;
  console.log(flashCard);

  if (flashCard.question === '') {
    ResultElement = <img src={flashCard.url} alt="Image" />;
  } else {
    ResultElement = <p>{flashCard.question}</p>;
  }

  return <>{ResultElement}</>;
};

export default RenderQuestion;
