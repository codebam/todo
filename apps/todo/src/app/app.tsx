import { useState, useEffect } from 'react';
import styles from './app.module.scss';
import axios from 'axios';
import { TodoItem } from './todo-item/todo-item';
import { useFormik } from 'formik';
import { Record, Number, String, Boolean, Array as ArrayOf } from 'runtypes';

const API_URL = process.env.API_URL || 'http://127.0.0.1';
const API_PORT = process.env.API_PORT || 3333;
const API_PREFIX = process.env.API_PREFIX || 'api';
const API = `${API_URL}:${API_PORT}/${API_PREFIX}`;

export interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

const Todo = Record({
  id: Number,
  content: String,
  completed: Boolean,
});

const TodoList = ArrayOf(Todo);

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: (values) => {
      setTodos((todos) => [
        ...todos,
        { id: 0, content: values.content, completed: false },
      ]);
      axios.post(API, values).then(getTodos);
    },
  });

  useEffect(() => {
    getTodos();
  }, []);

  const updateTodo = (todo: Todo) => {
    setTodos(
      todos.map((t) => {
        if (t.id === todo.id) {
          return todo;
        }
        return t;
      })
    );
    axios.put(API, todo).then(getTodos);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
    axios.delete(API, { data: { id } }).then(getTodos);
  };

  const getTodos = () => {
    axios.get(API).then((res) => setTodos(TodoList.check(res.data)));
  };

  return (
    <div className={styles.app}>
      <header className="flex">
        <h1>Welcome to todo!</h1>
      </header>
      <main>
        <form className="flex" onSubmit={formik.handleSubmit}>
          <input
            onChange={formik.handleChange}
            type="text"
            name="content"
            required
          />
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
