import { serverConfig } from '~/config/config.server'
import { Message, PubSub, Subscription, Topic } from '@google-cloud/pubsub'

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

    public listen() {
        this.subscription.on('message', async (message: Message) => {
            try {
                console.log(message.data.toString())
                message.ack()
            } catch (err) {
                message.nack()
            }
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
