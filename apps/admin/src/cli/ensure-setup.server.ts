import { env } from 'node:process'
import { writeFileSync, existsSync, statSync } from 'node:fs'

export const ensureSetup = () => {
    const encodedServiceAccount = env['GCLOUD_RUNTIME_SERVICE_ACCOUNT']
    const credentialsFile = env['GOOGLE_APPLICATION_CREDENTIALS']
    if (!encodedServiceAccount || !credentialsFile || existsSync(credentialsFile)) {
        return
    }

    const serviceAccount = Buffer.from(encodedServiceAccount, 'base64').toString('utf-8')
    writeFileSync(credentialsFile, serviceAccount.toString())
    const stats = statSync(credentialsFile)
    console.info({
        credentialsFile: 'written',
        fileSize: stats.size,
    })
}
