import type { FC } from 'react';
import { selectTodos, selectDeletedTodos } from '../todosSlice';
import { useAppSelector } from '../../../app/hooks';
import TodosForm from "./TodosForm";
import TodosList from './TodosList';

export const TodosContainer: FC = () => {
  const todos = useAppSelector(selectTodos);
  const deletedTodos = useAppSelector(selectDeletedTodos);

  return (
    <div>
      <TodosForm />
      <hr />
      <h2>Todo一覧</h2>
      <TodosList todos={todos} />
      <hr />
      <h2>削除されたTodo一覧</h2>
      <TodosList todos={deletedTodos} />
    </div>
  )
}