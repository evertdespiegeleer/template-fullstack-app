import { type Kysely, sql } from 'kysely'

export async function up (db: Kysely<any>): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db)

  await db.schema
    .createTable('greetings')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`)
    )
    .addColumn('message', 'text')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute()
}

export async function down (db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('greetings').execute()
}
