import { Server } from '@zhttp/core'
import { helloController } from './controllers/hello.js'

export const server = new Server({
  controllers: [helloController]
}, {
  port: 12000,
  bypassAllowedOrigins: true
})
