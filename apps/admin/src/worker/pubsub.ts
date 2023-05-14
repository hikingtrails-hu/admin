import { serverConfig } from '~/config/config.server'
import { PubSub, Subscription, Topic } from '@google-cloud/pubsub'

export class Pubsub {
    private config: ReturnType<typeof serverConfig>['gCloud']
    private topic: Topic
    private subscription: Subscription

    constructor() {
        this.config = serverConfig().gCloud
        const ps = new PubSub({ projectId: this.config.projectName })
        this.topic = ps.topic(this.config.pubsubTopic)
        this.subscription = this.topic.subscription(this.config.pubsubSubscription)
    }

    public async ensure(): Promise<void> {
        const [topicExists] = await this.topic.exists()
        if (this.config.initialize && !topicExists) {
            await this.topic.create()
        }
        const [subscriptionExists] = await this.subscription.exists()
        if (this.config.initialize && !subscriptionExists) {
            await this.subscription.create()
        }
    }

    public listen() {
        this.subscription.on('message', async (message) => {
            console.log(message.data.toString())
        })
    }

    public async publish(data: unknown) {
        await this.topic.publishMessage({
            json: data,
        })
    }
}

let instance: Pubsub | null = null

export const pubsub = () => {
    if (!instance) {
        instance = new Pubsub()
    }

    return instance
}
