import { Collection } from '@mikro-orm/core';
import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/decorators/legacy';
import { Todo } from './todo.entity';

@Entity()
export class TodoList {
  @PrimaryKey({ type: 'int' })
  id!: number;

  @Property({ type: 'string' })
  title!: string;

  @Property({ type: 'boolean' })
  completed?: boolean = false;

  @OneToMany(() => Todo, (todo) => todo.todoList)
  todos = new Collection<Todo>(this);
}
