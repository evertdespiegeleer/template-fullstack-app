import { validateConfig } from './config.js'
import { migrate } from './db.js'
import { server } from './server.js'

export const start = async () => {
  validateConfig()
  console.info('✅ Config validated')

  await migrate()
  console.info('📔 Ran database migrations')

  await server.start()
  console.info('🌍 http server started')
}

start().catch((e) => { throw e })
