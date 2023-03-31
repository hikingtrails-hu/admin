import { LoaderArgs, redirect } from '@remix-run/node'
import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
import { config } from '~/lib/config/config'
import { storage } from '~/lib/storage'
import { User } from '~/user/user'

export const loader = async (args: LoaderArgs) => {
    const { token } = parse(args.request.headers.get('cookie') ?? '')
    if (!token) {
        return redirect('/login')
    }
    const { userId } = verify(token, config.jwtSecret)
    if (!userId) {
        return redirect('/login')
    }
    if (!(await storage.has(`admin-db/user/id/${userId}/data`))) {
        return redirect('/login')
    }
    const { id, email } = await storage.get<User>(`admin-db/user/id/${userId}/data`)
    return redirect('/dashboard/main')
}
