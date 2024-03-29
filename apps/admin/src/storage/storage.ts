import { Bucket, Storage as CloudStorage } from '@google-cloud/storage'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { writeFileSync, rmSync } from 'node:fs'
import { serverConfig } from '~/config/config.server'
import { generateTimestampedId } from '~/id/id'
import { strict as assert } from 'node:assert'

export class Storage {
    private readonly bucket: Bucket
    private config: ReturnType<typeof serverConfig>['gCloud']

    constructor() {
        this.config = serverConfig().gCloud
        const storage = new CloudStorage({
            apiEndpoint: this.config.storageApiEndpoint,
            projectId: this.config.projectName,
        })
        this.bucket = storage.bucket(this.config.storageBucketName)
    }

    public async has(key: string): Promise<boolean> {
        const [exists] = await this.bucket.file(key).exists()
        return exists
    }

    public async set<Data>(key: string, data: Data): Promise<void> {
        const filePath = resolve(tmpdir(), generateTimestampedId())
        writeFileSync(filePath, JSON.stringify(data))
        await this.bucket.upload(filePath, { destination: key })
        rmSync(filePath)
    }

    public async get<Data>(key: string): Promise<Data> {
        const [file] = await this.bucket.file(key).get()
        const content = await file.download()
        return JSON.parse(content.toString()) as Data
    }

    public async ensure(): Promise<void> {
        if (this.config.initialize) {
            const exists = await this.bucket.exists()
            if (!exists) {
                await this.bucket.create()
            }
        }
        await this.set('dummy', 1)
        assert(await this.has('dummy'))
    }
}

let instance: Storage | null = null

export const storage = () => {
    if (!instance) {
        instance = new Storage()
    }

    return instance
}
