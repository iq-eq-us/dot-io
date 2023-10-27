import React, { ReactElement } from 'react';
import type { flashCard } from '../../../models/flashCardsModel';

interface CardProps {
  flashCard: flashCard;
}

export function FlashCardManagerCard({ flashCard }: CardProps): ReactElement {
  return <h1>{flashCard.question}</h1>;
}
