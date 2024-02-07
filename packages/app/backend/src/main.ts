import { server } from './server.js'

export const start = async () => {
  console.log('🌍 Starting the http server...')
  await server.start()
}

start().catch((e) => { throw e })
