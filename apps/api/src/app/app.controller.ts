import { Controller, Get, Post, Delete, Req, Put } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllTodo() {
    return await this.appService.getAllTodo();
  }

  @Post()
  async createTodo(@Req() request: Request) {
    return await this.appService.createTodo(request);
  }

  @Put()
  async updateTodo(@Req() request: Request) {
    return await this.appService.updateTodo(request);
  }

  @Delete()
  async deleteTodo(@Req() request: Request) {
    return await this.appService.deleteTodo(request);
  }
}
