import { storage } from '~/storage/storage'
import { pubsub } from '~/worker/pubsub'

export const startWorker = async () => {
    await storage().ensure()
    console.info('✔ Connected to Google Cloud Storage')
    await pubsub().ensure()
    console.info('✔ Connected to Google Pub/Sub')
    pubsub().listen()
}

export const loadDataRequest = async () => {
    await storage().ensure()
    console.info('✔ Connected to Google Cloud Storage')
    await pubsub().ensure()
    console.info('✔ Connected to Google Pub/Sub')
    await pubsub().publish()
}
