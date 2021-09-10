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
  async getAllTodo() {
    return await db.select('id', 'content', 'completed').from('todos');
  }
  async createTodo(request: Request) {
    return await db('todos').insert({ ...request.body });
  }
  async updateTodo(request: Request) {
    const todo = request.body as Todo;
    return await db('todos')
      .where('id', todo.id)
      .update({ completed: todo.completed });
  }
  async deleteTodo(request: Request) {
    const todo = request.body as Todo;
    return await db('todos').where('id', todo.id).del();
  }
}
