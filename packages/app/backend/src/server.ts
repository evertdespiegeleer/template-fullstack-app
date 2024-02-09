import { Server } from '@zhttp/core'
import { helloController } from './controllers/hello.js'
import { config } from './config.js'

export const server = new Server({
  controllers: [helloController]
}, {
  port: config.BACKEND_PORT,
  bypassAllowedOrigins: true
})
