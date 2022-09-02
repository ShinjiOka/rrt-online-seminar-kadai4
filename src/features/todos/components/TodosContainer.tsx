import { useEffect, type FC } from 'react';
import { selectIsFetching, fetchTodosAsync, selectTodosByDisplayStatus } from '../todosSlice';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import TodosForm from "./TodosForm";
import TodosList from './TodosList';
import { DisplayStatusSelector } from './DisplayStatusSelector';

export const TodosContainer: FC = () => {
  const todos = useAppSelector(selectTodosByDisplayStatus);
  const isFetching = useAppSelector(selectIsFetching);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, []);

  if (isFetching) {
    return <div>読み込み中...</div>
  }

  return (
    <div>
      <TodosForm />
      <hr />
      <DisplayStatusSelector />
      <h2>Todo一覧</h2>
      <TodosList todos={todos} />
    </div>
  )
}