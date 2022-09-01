import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import type { Todo, TodoInput, TodoId, TodoUpdatePayload } from './types';
import { createTodo, removeTodo, updateTodo, restoreTodo } from './crud/index';
import { RootState } from '../../app/store';

export type TodoState = {
  todos: Todo[]
}

const initialState: TodoState = {
  todos: []
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<TodoInput>) => {
      const { title, body } = action.payload;
      if (!title || !body)
        throw new Error('タイトルと本文の両方を入力してください');
        
      const todo = createTodo(action.payload);
      state.todos.push(todo);

    },
    remove: (state, action: PayloadAction<TodoId>) => {
      const id = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      const todo = state.todos[index];
      if (!todo) {
        return;
      } else {
        state.todos[index] = removeTodo(todo);
      }
    },
    update: (state, action: PayloadAction<TodoUpdatePayload>) => {
      const { id, input } = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      const todo = state.todos[index];
      if (!todo) {
        return;
      } else {
        state.todos[index] = updateTodo({
          ...todo,
          ...input,
        })
      }
    },
    restore: (state, action: PayloadAction<TodoId>) => {
      const id = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      const todo = state.todos[index];
      if (!todo) {
        return;
      } else {
        state.todos[index] = restoreTodo(todo);
      }
    }
  }
})

export const { create, remove, update, restore } = todosSlice.actions;

// export const selectTodos = (state: RootState) =>
//   state.todos.todos.filter((todo) => todo.deletedAt === undefined);

export const selectTodos = (state: RootState) => {
  return state.todos.todos.filter((todo) => { return todo.deletedAt === undefined });
}

export const selectDeletedTodos = (state: RootState) => {
  return state.todos.todos.filter((todo) => { return todo.deletedAt !== undefined });
}

export default todosSlice.reducer;