import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/* eslint-disable @typescript-eslint/naming-convention */
export const __filename = (meta: ImportMeta): string => fileURLToPath(meta.url)
export const __dirname = (meta: ImportMeta): string => dirname(__filename(meta))
