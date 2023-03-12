import { getenv } from '~/server-tools/config/getenv'

export const config = {
    gCloud: {
        projectName: getenv('GCLOUD_PROJECT', ''),
        storageApiEndpoint: getenv('GCLOUD_STORAGE_API_ENDPOINT', ''),
        storageBucketName: 'hikingtrails-db',
        slowQueueTopic: 'slow-queue',
    },
    secret: getenv('SECRET'),
}
