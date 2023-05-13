import { getenv } from '~/env/getenv'

export const serverConfig = () => ({
    keepEveryNthLocation: Number(getenv('KEEP_EVERY_NTH_LOCATION', '1')),
    keepEveryNthPathNode: Number(getenv('KEEP_EVERY_NTH_PATH_NODE', '1')),
    gCloud: {
        initialize: getenv('INITIALIZE_GCLOUD', 'false') === 'true',
        projectName: getenv('GCLOUD_PROJECT', ''),
        storageApiEndpoint: getenv('GCLOUD_STORAGE_API_ENDPOINT', ''),
        storageBucketName: 'hikingtrails-db',
        pubsubTopic: 'slow-queue',
        pubsubSubscription: 'slow-queue-subscription',
    },
})
