import { EntityManager, FilterQuery } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TodoList } from './database/entities/todo-list.entity';
import { Transactional } from '@mikro-orm/decorators/legacy';
import { Todo } from './database/entities/todo.entity';

@Injectable()
export class AppService {
  constructor(private readonly em: EntityManager) {}

  public async createList(title: string) {
    const list = this.em.create(TodoList, { title });
    await this.em.persist(list).flush();
    return { id: list.id, title: list.title };
  }

  public async getList(id: number) {
    const list = await this.em.findOne(TodoList, id, {
      populate: ['todos'],
    });
    if (!list) {
      throw new BadRequestException(`List ${id} does not exist`);
    }
    return list;
  }

  public async searchLists(title?: string) {
    const search: FilterQuery<TodoList> = {};
    if (title) {
      search.title = { $contains: title };
    }
    const results = await this.em.findAndCount(TodoList, search);
    return { lists: results[0], count: results[1] };
  }

  @Transactional()
  public async updateListCompletionStatus(id: number, status: boolean) {
    console.log(id);
    const list = await this.em.findOne(TodoList, id);

    if (!list) {
      throw new BadRequestException(`List ${id} does not exist`);
    }

    list.completed = status;
    this.em.persist(list);
    return list;
  }

  @Transactional()
  public async deleteList(id: number) {
    const list = await this.em.findOne(TodoList, id);
    if (!list) {
      throw new BadRequestException(`List ${id} does not exist`);
    }
    this.em.remove(list);
    return { id: list.id, title: list.title };
  }

  public async addTodo(title: string, list_id: number) {
    const list = await this.em.findOne(TodoList, { id: list_id });
    if (!list) {
      throw new BadRequestException(`Todo List ${list_id} does not exist`);
    }
    const todo = new Todo();
    todo.title = title;
    list.todos.add(todo);
    await this.em.persist(list).flush();
    return list;
  }

  @Transactional()
  public async updateTodoCompletionStatus(id: number, status: boolean) {
    const todo = await this.em.findOne(Todo, id);
    if (!todo) {
      throw new BadRequestException(`Todo ${id} does not exist`);
    }
    todo.completed = status;
    this.em.persist(todo);
    return todo;
  }

  @Transactional()
  public async deleteTodo(id: number) {
    const todo = await this.em.findOne(Todo, id);
    if (!todo) {
      throw new BadRequestException(`Todo ${id} does not exist`);
    }
    this.em.remove(todo);
    return { id: todo.id, title: todo.title };
  }
}
