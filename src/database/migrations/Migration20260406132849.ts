import { Migration } from '@mikro-orm/migrations';

export class Migration20260406132849 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create table "todo_list" ("id" serial primary key, "title" varchar(255) not null);`);

    this.addSql(`create table "todo" ("id" serial primary key, "title" varchar(255) not null, "completed" boolean not null default false, "todo_list_id" int not null);`);

    this.addSql(`alter table "todo" add constraint "todo_todo_list_id_foreign" foreign key ("todo_list_id") references "todo_list" ("id");`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "todo" drop constraint "todo_todo_list_id_foreign";`);

    this.addSql(`drop table if exists "todo_list" cascade;`);
    this.addSql(`drop table if exists "todo" cascade;`);
  }

}
