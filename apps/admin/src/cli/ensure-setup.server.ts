import { env } from 'node:process'
import { writeFileSync, existsSync, statSync } from 'node:fs'

export const ensureSetup = () => {
    if (
        !env['GCLOUD_RUNTIME_SERVICE_ACCOUNT'] ||
        !env['GOOGLE_APPLICATION_CREDENTIALS'] ||
        existsSync(env['GOOGLE_APPLICATION_CREDENTIALS'])
    ) {
        return
    }

    const serviceAccount = Buffer.from(env['GCLOUD_RUNTIME_SERVICE_ACCOUNT'], 'base64').toString(
        'utf-8'
    )
    console.log({ serviceAccountLength: serviceAccount.length })
    writeFileSync(env['GOOGLE_APPLICATION_CREDENTIALS'], serviceAccount.toString('utf-8'))
    console.log(env['GOOGLE_APPLICATION_CREDENTIALS'], 'written')
    const stats = statSync(env['GOOGLE_APPLICATION_CREDENTIALS'])
    console.log('file size', stats.size)
}
