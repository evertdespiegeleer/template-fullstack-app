import { z } from 'zod'

const zConfig = z.object({
  BACKEND_PORT: z.coerce.number().min(0)
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
