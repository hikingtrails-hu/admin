import { Bucket, Storage as CloudStorage } from '@google-cloud/storage'
import { tmpdir } from 'os'
import { resolve } from 'path'
import { writeFileSync, rmSync } from 'fs'
import { config } from '~/lib/config/config'

export class Storage {
    private readonly bucket: Bucket

    constructor(apiEndpoint: string, projectId: string, bucket: string) {
        const storage = new CloudStorage({
            apiEndpoint,
            projectId,
        })
        this.bucket = storage.bucket(bucket)
    }

    public async has(key: string): Promise<boolean> {
        const [exists] = await this.bucket.file(key).exists()
        return exists
    }

    public async set<Data>(key: string, data: Data): Promise<void> {
        const filePath = resolve(tmpdir(), 'x')
        writeFileSync(filePath, JSON.stringify(data))
        await this.bucket.upload(filePath, { destination: key })
        rmSync(filePath)
    }

    public async get<Data>(key: string): Promise<Data> {
        const [file] = await this.bucket.file(key).get()
        const content = await file.download()
        return JSON.parse(content.toString()) as Data
    }
}

export const storage = new Storage(
    config.gCloud.storageApiEndpoint,
    config.gCloud.projectName,
    config.gCloud.storageBucketName
)
