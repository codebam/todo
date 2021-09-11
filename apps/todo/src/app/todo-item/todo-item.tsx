import { useState } from 'react';
import './todo-item.module.scss';
import { Todo } from '../app';

export interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
}

export function TodoItem(props: TodoItemProps) {
  const { todo, updateTodo, deleteTodo } = props;
  const formInitialState = {
    content: todo.content,
  };
  const [form, setForm] = useState(formInitialState);
  const [editing, setEditing] = useState(false);

  /* eslint-disable-next-line */
  const handleSetForm = ({ target: { name, value } }: any) => {
    setForm((form) => ({ ...form, [name]: value }));
  };

  return (
    <div className="flex">
      {!editing ? (
        <>
          <p className={todo.completed ? 'strike' : ''}>{todo.content}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      ) : (
        <form
          className="flex"
          onSubmit={(event) => {
            event.preventDefault();
            updateTodo({
              id: todo.id,
              content: form.content,
              completed: todo.completed,
            });
            setEditing(false);
          }}
        >
          <input
            onChange={handleSetForm}
            value={form.content}
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
