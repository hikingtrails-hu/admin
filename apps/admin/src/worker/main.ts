import { storage } from '~/storage/storage'
import { pubsub } from '~/worker/pubsub'

export const startWorker = async () => {
    await storage().ensure()
    console.info('✔ Connected to Google Cloud Storage')
    pubsub().listen()
}

export const loadDataRequest = async () => {
    await storage().ensure()
    console.info('✔ Connected to Google Cloud Storage')
    await pubsub().publish({ job: { type: 'BlueTrailDataLoadRequest', data: {} } })
}
