import { storage } from "~/storage/storage";

export const startWorker = async () => {
    await storage().ensure()
}
