import { z } from 'zod'

const zConfig = z.object({
  // HTTP
  BACKEND_PORT: z.coerce
    .number().min(0),

  // Database
  POSTGRES_HOST: z
    .string()
    .describe('The postgres server hostname'),
  POSTGRES_PORT: z.coerce
    .number().min(0)
    .default(5432)
    .describe('The postgres server port'),
  POSTGRES_USER: z
    .string()
    .default('postgres')
    .describe('The postgres username'),
  POSTGRES_PASSWORD: z
    .string()
    .default('postgres')
    .describe('The postgres password'),
  POSTGRES_TLS_ENABLED: z.coerce
    .boolean()
    .default(false)
    .describe('Whether TLS is enabled for postgres connections'),
  POSTGRES_TLS_REJECT_UNAUTHORIZED: z.coerce
    .boolean()
    .default(true)
    .describe('Whether to reject unauthorized TLS postgres connections'),
  POSTGRES_MAX_POOLSIZE: z.coerce
    .number().min(0)
    .default(10)
    .describe('The maximum number of connections in the pool'),
  POSTGRES_DATABASE_NAME: z
    .string()
    .default('app')
    .describe('The postgres database name')
})

export const config = zConfig.parse(process.env)

export const validateConfig = () => {
  try {
    zConfig.parse(process.env)
  } catch (e) {
    console.error('Invalid env configuration', e)
    throw e
  }
}
