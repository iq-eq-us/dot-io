import type { FlashCardStoreModel } from 'src/models/flashCardsModel';
import flashCardStoreStateModel from './state';
import flashCardActionModel from './actions';

const FlashCardStore: FlashCardStoreModel = {
  ...flashCardStoreStateModel,
  ...flashCardActionModel,
};

export { FlashCardStore };
