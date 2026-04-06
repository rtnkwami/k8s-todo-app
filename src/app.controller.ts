import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  public async createList(@Body('title') title: string) {
    return await this.appService.createList(title);
  }

  @Post('lists/:id/todos')
  public async addTodo(@Param('id') id: number, @Body('title') todo: string) {
    return await this.appService.addTodo(todo, id);
  }

  @Get('lists/search')
  public async searchLists(@Query('title') title?: string) {
    return await this.appService.searchLists(title);
  }

  @Get('lists/:id')
  public async getList(@Param('id') id: number) {
    return await this.appService.getList(id);
  }

  @Patch('lists/:id')
  public async updateListCompletion(
    @Param('id') id: number,
    @Body('status') status: boolean,
  ) {
    return await this.appService.updateListCompletionStatus(id, status);
  }

  @Delete('lists/:id')
  public async deleteList(@Param('id') id: number) {
    return await this.appService.deleteList(id);
  }

  @Patch('todos/:id')
  public async updateTodoCompletion(
    @Param('id') id: number,
    @Body('status') status: boolean,
  ) {
    return await this.appService.updateTodoCompletionStatus(id, status);
  }

  @Delete('todos/:id')
  public async deleteTodo(@Param('id') id: number) {
    return await this.appService.deleteTodo(id);
  }
}
