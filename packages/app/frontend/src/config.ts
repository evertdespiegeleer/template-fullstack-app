import { z } from 'zod'

const zConfig = z.object({
  API_URL: z.string().min(1),
  SOME_RUNTIME_VAR_USED_IN_THE_FRONTEND: z.string().min(1)
})

type Config = z.infer<typeof zConfig>

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T

declare global {
  interface Window {
    __env__: Partial<DeepPartial<Config>>
  }
}

let config: Config

try {
  config = zConfig.parse(window.__env__)
} catch (e: any) {
  console.error('Runtime configuration issue', e)
  throw e
}

export const getConfig = () => config
