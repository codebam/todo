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
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port: 5432,
    user: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || 'toor',
    database: process.env.POSTGRES_DB || 'postgres',
  },
};

const db = knex(config);

@Injectable()
export class AppService {
  async getAllTodo() {
    return await db.select('id', 'content', 'completed').from('todos');
  }
  async createTodo(request: Request) {
    await db('todos').insert({ ...request.body });
    return 'success';
  }
  async updateTodo(request: Request) {
    const todo = request.body as Todo;
    await db('todos').where('id', todo.id).update(todo);
    return 'success';
  }
  async deleteTodo(request: Request) {
    const todo = request.body as Todo;
    await db('todos').where('id', todo.id).del();
    return 'success';
  }
}
