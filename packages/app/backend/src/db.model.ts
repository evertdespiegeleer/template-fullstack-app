import { string, z } from 'zod'
import {
  type Generated
} from 'kysely'

export interface Database {
  greetings: GreetingTable
}

// Greeting

export type Greeting = z.infer<typeof zDbGreeting>

export const zDbGreeting = z.object({
  id: z.string().uuid(),
  created_at: z.date(),
  message: string()
})

type GreetingTable = Greeting & {
  id: Generated<string>
}
