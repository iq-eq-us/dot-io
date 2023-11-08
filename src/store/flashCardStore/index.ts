import type { FlashCardStoreModel } from 'src/models/flashCardsModel';
import flashCardStoreStateModel from './state';
import flashCardActionModel from './action';

const FlashCardStore: FlashCardStoreModel = {
  ...flashCardStoreStateModel,
  ...flashCardActionModel,
};

export { FlashCardStore };
