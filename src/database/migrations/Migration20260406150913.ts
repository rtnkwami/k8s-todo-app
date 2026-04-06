import { Migration } from '@mikro-orm/migrations';

export class Migration20260406150913 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`alter table "todo" drop constraint "todo_todo_list_id_foreign";`);

    this.addSql(`alter table "todo" add constraint "todo_todo_list_id_foreign" foreign key ("todo_list_id") references "todo_list" ("id") on delete cascade;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "todo" drop constraint "todo_todo_list_id_foreign";`);

    this.addSql(`alter table "todo" add constraint "todo_todo_list_id_foreign" foreign key ("todo_list_id") references "todo_list" ("id") on update no action on delete no action;`);
  }

}
