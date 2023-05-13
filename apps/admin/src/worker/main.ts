import { storage } from '~/storage/storage'

export const startWorker = async () => {
    console.info('Checking Google Cloud Storage connection…')
    await storage().ensure()
}
