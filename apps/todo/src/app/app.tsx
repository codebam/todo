import { useState, useEffect } from 'react';
import styles from './app.module.scss';
import axios from 'axios';
import { TodoItem } from './todo-item/todo-item';

const formInitialState = {
  content: '',
};

// TODO import this from a config file
const API = 'http://127.0.0.1:3333/api';

export interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

export function App() {
  const [form, setForm] = useState(formInitialState);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos();
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(API, form);
    getTodos();
  };

  /* eslint-disable-next-line */
  const handleSetForm = ({ target: { name, value } }: any) => {
    setForm((form) => ({ ...form, [name]: value }));
  };

  const updateTodo = (todo: Todo) => {
    axios.put(API, todo).then(getTodos);
  };

  const deleteTodo = (id: number) => {
    axios.delete(API, { data: { id } }).then(getTodos);
  };

  const getTodos = () => {
    axios.get(API).then((res) => setTodos(res.data));
  };

  return (
    <div className={styles.app}>
      <header className="flex">
        <h1>Welcome to todo!</h1>
      </header>
      <main>
        <form className="flex" onSubmit={handleFormSubmit}>
          <input onChange={handleSetForm} type="text" name="content" />
          <input type="submit" value="Add Todo" />
        </form>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
