import { env } from 'node:process'
import { writeFileSync, existsSync } from 'node:fs'

export const ensureSetup = () => {
    if (
        !env['GCLOUD_RUNTIME_SERVICE_ACCOUNT'] ||
        !env['GOOGLE_APPLICATION_CREDENTIALS'] ||
        existsSync(env['GOOGLE_APPLICATION_CREDENTIALS'])
    ) {
        return
    }

    const serviceAccount = new Buffer(env['GCLOUD_RUNTIME_SERVICE_ACCOUNT'], 'base64')
    writeFileSync(env['GOOGLE_APPLICATION_CREDENTIALS'], serviceAccount.toString('utf-8'))
}
