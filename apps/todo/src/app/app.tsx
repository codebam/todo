import { useState } from 'react';
import styles from './app.module.scss';
import axios from 'axios';

const formInitialState = {
  content: '',
};

export function App() {
  const [form, setForm] = useState(formInitialState);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:3333/api', form);
  };

  const handleSetForm = ({ target: { name, value } }: any) => {
    setForm((form) => ({ ...form, [name]: value }));
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
      </main>
    </div>
  );
}

export default App;
