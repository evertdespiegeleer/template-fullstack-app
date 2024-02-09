import {
  Kysely,
  PostgresDialect,
  FileMigrationProvider,
  Migrator
} from 'kysely'
import { promises as fs } from 'fs'
import * as pg from 'pg'
import { config } from './config.js'
import { type Database } from './db.model.js'
import * as path from 'node:path'
import { __dirname } from './utils.js'

const { Pool } = pg.default

const dialect = new PostgresDialect({
  pool: new Pool({
    database: config.POSTGRES_DATABASE_NAME,
    host: config.POSTGRES_HOST,
    user: config.POSTGRES_USER,
    port: config.POSTGRES_PORT,
    max: config.POSTGRES_MAX_POOLSIZE,
    password: config.POSTGRES_PASSWORD,
    ssl: config.POSTGRES_TLS_ENABLED
      ? {
          rejectUnauthorized: config.POSTGRES_TLS_REJECT_UNAUTHORIZED
        }
      : false
  })
})

const migrationFolder = path.join(__dirname(import.meta), 'migrations')

export const db = new Kysely<Database>({
  dialect
})

export async function migrate () {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder
    })
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`👍 migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`❌ failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error != null) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }
}
