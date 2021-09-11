import { Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';
import { Number, String, Boolean, Record } from 'runtypes';

const Todo = Record({
  id: Number,
  content: String,
  completed: Boolean,
});

const TodoCreate = Record({
  content: String,
});

const TodoDelete = Record({
  id: Number,
});

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
    await db('todos').insert({ ...TodoCreate.check(request.body) });
    return 'success';
  }
  async updateTodo(request: Request) {
    const todo = Todo.check(request.body);
    await db('todos').where('id', todo.id).update(todo);
    return 'success';
  }
  async deleteTodo(request: Request) {
    const todo = TodoDelete.check(request.body);
    await db('todos').where('id', todo.id).del();
    return 'success';
  }
}
