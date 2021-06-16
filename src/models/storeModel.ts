import type { Action } from 'easy-peasy';

interface StoreModel {
  todos: string[];
  addTodo: Action<StoreModel, string>;
}

export default StoreModel;
