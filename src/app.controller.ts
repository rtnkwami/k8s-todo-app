import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('lists')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  public async createList(@Body('title') title: string) {
    return await this.appService.createList(title);
  }

  @Post(':id/todos')
  public async addTodo(@Param('id') id: number, @Body('title') todo: string) {
    return await this.appService.addTodo(todo, id);
  }

  @Get('search')
  public async searchLists(title: string) {
    return await this.appService.searchLists(title);
  }

  @Get(':id')
  public async getList(@Param('id') id: number) {
    return await this.appService.getList(id);
  }

  @Patch(':id')
  public async updateListCompletion(
    @Param('id') id: number,
    @Body('status') status: boolean,
  ) {
    return await this.appService.updateListCompletionStatus(id, status);
  }

  @Delete(':id')
  public async deleteList(@Param('id') id: number) {
    return await this.appService.deleteList(id);
  }
}
