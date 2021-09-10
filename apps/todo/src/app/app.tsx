import { useState, useEffect } from 'react';
import styles from './app.module.scss';
import axios from 'axios';

const formInitialState = {
  content: '',
};

interface Todo {
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
    axios.post('http://127.0.0.1:3333/api', form);
    getTodos();
  };

  const handleSetForm = ({ target: { name, value } }: any) => {
    setForm((form) => ({ ...form, [name]: value }));
  };

  const getTodos = () => {
    axios.get('http://127.0.0.1:3333/api').then((res) => setTodos(res.data));
  };

  return (
    <div className={styles.app}>
      <header className="flex">
        <h1>Welcome to todo!</h1>
      </header>
      <main>
        <form onSubmit={handleFormSubmit}>
          <input onChange={handleSetForm} type="text" name="content" />
          <input type="submit" value="Add Todo" />
        </form>
        {todos.map((todo) => (
          <p key={todo.id}>{todo.content}</p>
        ))}
      </main>
    </div>
  );
}

export default App;
