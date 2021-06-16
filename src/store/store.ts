import { createStore, action, createTypedHooks } from 'easy-peasy';
import type StoreModel from 'src/models/storeModel';

export const defaultStoreState: StoreModel = {
  todos: ['Create store', 'Wrap application', 'Use store'],
  addTodo: action((state, payload) => {
    state.todos.push(payload);
  }),
};

const store = createStore<StoreModel>(defaultStoreState);

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
export default store;
