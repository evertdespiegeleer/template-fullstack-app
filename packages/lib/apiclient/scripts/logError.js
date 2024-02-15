// Thanks @danrr!
// https://github.com/TypeStrong/ts-node/issues/2026#issuecomment-1625385054
import { setUncaughtExceptionCaptureCallback } from 'node:process'
setUncaughtExceptionCaptureCallback(console.log)
