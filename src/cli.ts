import { storage } from '~/lib/storage'
import invariant from 'tiny-invariant'
import { hash, verify } from 'argon2'
import { generateId } from '~/lib/id/id'
import { User } from '~/user/user'

export const cli = {
    addUser: async () => {
        const [email, password] = process.argv.slice(1, 3).map(String)
        invariant(email)
        invariant(password)
        const encodedPassword = await hash(password)
        const existing = await storage.has(`admin-db/user/email/${email}/data`)
        const user: User = existing
            ? {
                  ...(await storage.get<User>(`admin-db/user/email/${email}/data`)),
                  encodedPassword,
              }
            : {
                  id: generateId(),
                  email,
                  encodedPassword,
              }
        await storage.set(`admin-db/user/email/${user.email}/data`, user)
        await storage.set(`admin-db/user/id/${user.id}/data`, user)
        console.info(`User ${user.id} ${existing ? 'updated' : 'created'}`)
    },
}
