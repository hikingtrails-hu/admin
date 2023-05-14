import { serverConfig } from '~/config/config.server'
import { Message, PubSub, Subscription, Topic } from '@google-cloud/pubsub'

export class Pubsub {
    private config: ReturnType<typeof serverConfig>['gCloud']
    private topic: Topic
    private subscription: Subscription
    private pubsub: PubSub

    constructor() {
        this.config = serverConfig().gCloud
        this.pubsub = new PubSub({
            projectId: this.config.projectName,
        })
        this.topic = this.pubsub.topic(this.config.pubsubTopic)
        this.subscription = this.topic.subscription(this.config.pubsubSubscription)
    }

    public listen() {
        this.subscription.on('message', async (message: Message) => {
            try {
                console.log(message.data.toString())
                message.ack()
            } catch (err) {
                message.nack()
            }
        })
        console.info('🌈 listening to Pub/Sub messages')
    }

    public async publish(data: unknown) {
        await this.topic.publishMessage({
            json: data,
        })
        console.info('🏃 Load request triggered')
    }

    public async ensure(): Promise<void> {
        if (this.config.initialize) {
            const [topicExists] = await this.topic.exists()
            if (!topicExists) {
                await this.topic.create()
            }
            const [subscriptionExists] = await this.subscription.exists()
            if (!subscriptionExists) {
                await this.subscription.create()
            }
        }
        await this.pubsub.getClientConfig()
    }
}

let instance: Pubsub | null = null

export const pubsub = () => {
    if (!instance) {
        instance = new Pubsub()
    }

    return instance
}
