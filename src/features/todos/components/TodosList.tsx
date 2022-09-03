import type { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { remove, update, restore } from '../todosSlice';
import type { Todo } from '../types';
import { useConfirmModal } from './modals/ConfirmModal/useConfirmModal';
import { useUpdateTodoModal } from './modals/UpdateTodoModal/useUpdateTodoModal';
import { translateStatus } from '../utils/todoConverter';

type Props = {
  todos: Todo[]
}

const TodosList: FC<Props> = ({todos}) => {
  // const todos = useAppSelector((state: RootState) => state.todos.todos);
  // const todos = useAppSelector(selectTodos);
  const displayStatus = useAppSelector((state) => state.todos.displayStatus);
  const dispatch = useAppDispatch();
  const {
    open: openConfirmModal,
    setMessage,
    ConfirmModalWrapper,
  } = useConfirmModal();
  const {
    open: openUpdateTodoModal,
    setTodoInput: setTodoInputForUpdateTodoModal,
    UpdateTodoModalWrapper,
  } = useUpdateTodoModal();

  const isSelectDeletedStatus = displayStatus === 'deleted';
  
  return (
    <>
      <ConfirmModalWrapper />
      <UpdateTodoModalWrapper />
      <table border={1}>
        <thead>
          <tr>
            <th>id</th>
            <th>タイトル</th>
            <th>本文</th>
            <th>ステータス</th>
            <th>作成日時</th>
            <th>更新日時</th>
            <th>削除日時</th>
            <th>更新ボタン</th>
            <th>削除ボタン</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan={9} style={{textAlign: 'center'}}>
                データなし
              </td>
            </tr>
          ) : (
            todos.map((todo, key) => {
              return (
                <tr key={key}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.body}</td>
                  <td>{translateStatus(todo.status)}</td>
                  <td>{todo.createdAt}</td>
                  <td>{todo.updatedAt ?? '無し'}</td>
                  <td>{todo.deletedAt ?? '無し'}</td>
                  <td>
                    <button
                      disabled={isDeletedTodo(todo)}
                      onClick={() => {
                        setTodoInputForUpdateTodoModal(todo);
                        openUpdateTodoModal((newTodoInput) => {
                          const updateAction = update({
                            id: todo.id,
                            input: {
                              ...newTodoInput,
                            },
                          });
                          dispatch(updateAction);
                        });
                      }}
                    >
                      更新
                    </button>
                  </td>
                  <td>
                    {isDeletedTodo(todo) ? (
                      <button
                      onClick={() => {
                        setMessage('復元しますか？')
                        openConfirmModal(() => dispatch(restore(todo.id)));
                      }}
                    >
                      復元
                    </button>
                    ) : (
                      <button
                      onClick={() => {
                        setMessage('本当に削除しますか？')
                        openConfirmModal(() => dispatch(remove(todo.id)));
                      }}
                    >
                      削除
                    </button>
                    )
                  }
                    
                  </td>
                </tr>
              )
            })
          )
        }
        </tbody>
      </table>
    </>
  )
}

const isDeletedTodo = (todo: Todo) => {
  return todo.deletedAt !== undefined;
};

export default TodosList;