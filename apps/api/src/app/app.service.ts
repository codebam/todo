import { Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';

interface Todo {
  id?: number;
  content?: string;
  completed?: boolean;
}

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'root',
    password: 'toor',
    database: 'postgres',
  },
};

const db = knex(config);

@Injectable()
export class AppService {
  getAllTodo(): Todo[] {
    return db
      .select('id', 'content', 'completed')
      .from('todos') as unknown as Todo[];
  }
  createTodo(request: Request) {
    return db('todos').insert({ ...request.body });
  }
  updateTodo(request: Request) {
    const todo = request.body as Todo;
    return db('todos')
      .where('id', todo.id)
      .update({ completed: todo.completed });
  }
  deleteTodo(request: Request) {
    const todo = request.body as Todo;
    return db('todos').where('id', todo.id).del();
  }
}
