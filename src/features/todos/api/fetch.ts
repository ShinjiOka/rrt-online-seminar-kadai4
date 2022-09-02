import { Todo } from '../types'
import { getTodos } from '../localStorage/todosLocalStorage';

type Response = {
  data: Todo[];
}

export const fetchTodos = async (): Promise<Response> => {
  {
    return new Promise((resolve) => {
      const todos: Todo[] = getTodos();

      setTimeout(() => {
        return (
          resolve({data: todos})
        )
      }, 1000);
    })
  }
}
