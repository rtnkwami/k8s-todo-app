import { Migration } from '@mikro-orm/migrations';

export class Migration20260406134400 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`alter table "todo_list" add "completed" boolean not null default false;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "todo_list" drop column "completed";`);
  }

}
