import todosSlice from '../todosSlice';
import type { Todo } from '../types';

const PREFIX_KEY = 'redux-toolkit-seminar';
const LOCAL_STORAGE_KEY = `${PREFIX_KEY}:todos`;

export const setTodos = (todos: Todo[]) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}

export const getTodos = (): Todo[] => {
  const json = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!json) return [];

  const todos = JSON.parse(json) as Todo[];
  return todos;
}