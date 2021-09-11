import { useState } from 'react';
import './todo-item.module.scss';
import { Todo } from '../app';

export interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
}

export function TodoItem(props: TodoItemProps) {
  const formInitialState = {
    content: props.todo.content,
  };
  const [form, setForm] = useState(formInitialState);
  const [editing, setEditing] = useState(false);

  /* eslint-disable-next-line */
  const handleSetForm = ({ target: { name, value } }: any) => {
    setForm((form) => ({ ...form, [name]: value }));
  };

  return (
    <div className="flex">
      {!editing && (
        <>
          <p className={props.todo.completed ? 'strike' : ''}>
            {props.todo.content}
          </p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
      {editing && (
        <form
          className="flex"
          onSubmit={(event) => {
            event.preventDefault();
            props.updateTodo({
              id: props.todo.id,
              content: form.content,
              completed: props.todo.completed,
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
          props.updateTodo({
            id: props.todo.id,
            content: props.todo.content,
            completed: props.todo.completed ? false : true,
          });
        }}
      >
        Check
      </button>
      <button onClick={() => props.deleteTodo(props.todo.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
