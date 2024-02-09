const configVars = [
  'SOME_RUNTIME_VAR_USED_IN_THE_FRONTEND'
] as const satisfies string[]

type EnvName = (typeof configVars)[number]

type Config = Record<string, EnvName>

declare global {
  interface Window {
    __env__: Partial<Config>
  }
}

export const getConfig = (envName: EnvName, errorIfNull: boolean) => {
  if (window.__env__[envName] == null && errorIfNull) throw new Error(`Missing env var ${envName}.`)
  return window.__env__[envName]
}

export const getAllConfig = () => window.__env__
