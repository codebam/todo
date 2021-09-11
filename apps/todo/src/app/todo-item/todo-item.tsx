import { useState } from 'react';
import './todo-item.module.scss';
import { Todo } from '../app';
import { useFormik } from 'formik';

export interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
}

export function TodoItem(props: TodoItemProps) {
  const { todo, updateTodo, deleteTodo } = props;
  const formik = useFormik({
    initialValues: {
      content: todo.content,
    },
    onSubmit: (values) => {
      updateTodo({
        id: todo.id,
        content: values.content,
        completed: todo.completed,
      });
      setEditing(false);
    },
  });
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex">
      {!editing ? (
        <>
          <p className={todo.completed ? 'strike' : ''}>{todo.content}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      ) : (
        <form className="flex" onSubmit={formik.handleSubmit}>
          <input
            onChange={formik.handleChange}
            value={formik.values.content}
            type="text"
            name="content"
            required
          />
          <input type="submit" value="Save" />
        </form>
      )}
      <button
        onClick={() => {
          updateTodo({
            id: todo.id,
            content: todo.content,
            completed: todo.completed ? false : true,
          });
        }}
      >
        Check
      </button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
