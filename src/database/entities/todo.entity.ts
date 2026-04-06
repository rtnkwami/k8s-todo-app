import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/decorators/legacy';
import { TodoList } from './todo-list.entity';
import type { Rel } from '@mikro-orm/core';

@Entity()
export class Todo {
  @PrimaryKey({ type: 'int' })
  id!: number;

  @Property({ type: 'string' })
  title!: string;

  @Property({ type: 'boolean' })
  completed: boolean = false;

  @ManyToOne({ entity: () => TodoList })
  todoList!: Rel<TodoList>;
}
