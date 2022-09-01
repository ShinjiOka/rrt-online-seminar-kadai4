import { useState, FC } from 'react';
import type { TodoInput } from '../types';
import { useAppDispatch } from '../../../app/hooks';
import { create } from '../todosSlice';

export const TodoForm: FC = () => {
  const [todoInput, setTodoInput] = useState<TodoInput>({
    title: '',
    body: '',
  })  

  const dispatch = useAppDispatch();

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTodoInput({
      ...todoInput,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement>  = (event) => {
    event.preventDefault();
    try {
      dispatch(create(todoInput));
      setTodoInput({
        title: '',
        body: '',
      });

      const activeElement = document.activeElement;
      if (!activeElement) {
        return;
      } else {
        (activeElement as HTMLInputElement).blur();
      }
    } catch(error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} method="post">
      <div>
        <label>
          タイトル: {''}
          <input 
            onChange={onChangeHandler}
            type="text"
            name="title"
            value={todoInput.title}
          />
        </label>
      </div>
      <div>
        <label>
          本文: {''}
          <input
            onChange={onChangeHandler}
            type="text"
            name="body"
            value={todoInput.body}
          />
        </label>
      </div>
      <div>
        <input type="submit" value="作成" />
      </div>
    </form>
  )
}

export default TodoForm;