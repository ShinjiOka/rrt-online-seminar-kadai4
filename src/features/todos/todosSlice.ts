import { createSlice, createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import type { Todo, TodoInput, TodoId, TodoUpdatePayload } from './types';
import { createTodo, removeTodo, updateTodo, restoreTodo } from './crud/index';
import { RootState } from '../../app/store';
import { fetchTodos } from './api/fetch';
import { setTodos } from './localStorage/todosLocalStorage';

export const DISPLAY_STATUS_MAP = {
  all: '全て (削除済みは除く)',
  updated: '更新済み(削除済みは除く)',
  deleted: '削除済み',
}

export type DisplayStatusType = keyof typeof DISPLAY_STATUS_MAP;

export type TodoState = {
  displayStatus: DisplayStatusType;
  isFetching: boolean;
  error: null | SerializedError;
  todos: Todo[];
}

const initialState: TodoState = {
  displayStatus: 'all',
  isFetching: false,
  error: null,
  todos: [],
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
      setTodos(state.todos);

    },
    remove: (state, action: PayloadAction<TodoId>) => {
      const id = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      const todo = state.todos[index];
      if (!todo) {
        return;
      } else {
        state.todos[index] = removeTodo(todo);
        setTodos(state.todos);
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
        setTodos(state.todos);
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
        setTodos(state.todos);
      }
    },
    changeDisplayStatus: (state, action: PayloadAction<DisplayStatusType>) => {
      state.displayStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.error = null;
        state.todos = action.payload;
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error;
      })
  }
})

export const fetchTodosAsync = createAsyncThunk<Todo[]>(
  `$(todoSlice.name)/fetch`,
  async () => {
    const response = await fetchTodos();

    return response.data;
  }
)

export const { create, remove, update, restore, changeDisplayStatus } = todosSlice.actions;

// export const selectTodos = (state: RootState) =>
//   state.todos.todos.filter((todo) => todo.deletedAt === undefined);

export const selectTodos = (state: RootState) => {
  return state.todos.todos.filter((todo) => { return todo.deletedAt === undefined });
}

export const selectDeletedTodos = (state: RootState) => {
  return state.todos.todos.filter((todo) => { return todo.deletedAt !== undefined });
}

export const selectTodosByDisplayStatus = (state: RootState) => {
  if (state.todos.displayStatus === 'updated') {
    return state.todos.todos.filter((todo) => { return todo.updatedAt !== undefined && todo.deletedAt === undefined });
  }

  if (state.todos.displayStatus === 'deleted') {
    return selectDeletedTodos(state);
  }

  return selectTodos(state);
}

export const selectIsFetching = (state: RootState) => {
  return state.todos.isFetching;
}

export const selectDisplayStatus = (state: RootState) => {
  return state.todos.displayStatus;
}

export default todosSlice.reducer;