import { controller, get } from '@zhttp/core'
import { z } from 'zod'

export const helloController = controller('Hello')

helloController.endpoint(
  get('/hello', 'getGreeting')
    .input({
      query: z.object({ name: z.string().optional() })
    })
    .response(z.object({
      greeting: z.string()
    }))
    .handler(async ({ query: { name } }) => ({
      greeting: `Hello, ${name ?? 'everyone'}`
    }))
)
