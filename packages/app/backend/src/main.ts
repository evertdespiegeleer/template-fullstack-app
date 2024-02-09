import { validateConfig } from './config.js'
import { server } from './server.js'

export const start = async () => {
  validateConfig()
  console.log('✅ Config validated')

  await server.start()
  console.log('🌍 http server started')
}

start().catch((e) => { throw e })
