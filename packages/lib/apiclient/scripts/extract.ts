#!/usr/bin/env -S node --loader ts-node/esm
import url from 'node:url'
import path from 'node:path'
import { exit } from 'node:process'

import { server } from '../../../app/backend/src/server.js'
import { writeFileSync, mkdirSync } from 'node:fs'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

console.log(`Importing OAS and writing to ${path.resolve(__dirname, '../temp', 'spec.json')}`)

const jsonSpec = server.oasInstance.getJsonSpec()
mkdirSync(path.resolve(__dirname, '../temp'), { recursive: true })
writeFileSync(path.resolve(__dirname, '../temp', 'spec.json'), jsonSpec)
exit(0)
