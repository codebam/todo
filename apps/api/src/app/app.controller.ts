import { Controller, Get, Post, Delete, Req, Put } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTodo() {
    return this.appService.getAllTodo();
  }

  @Post()
  createTodo(@Req() request: Request) {
    return this.appService.createTodo(request);
  }

  @Put()
  updateTodo(@Req() request: Request) {
    return this.appService.updateTodo(request);
  }

  @Delete()
  deleteTodo(@Req() request: Request) {
    return this.appService.deleteTodo(request);
  }
}
