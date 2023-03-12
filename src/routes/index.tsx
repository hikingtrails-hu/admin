import { storage } from '~/lib/storage'
import { json, LoaderArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CardProfile from '~/components/Cards/CardProfile'
import Login from '~/views/auth/Login'
import Navbar from '~/components/Navbars/AuthNavbar'
import FooterSmall from '~/components/Footers/FooterSmall'
import registerBg from '~/assets/img/register_bg_2.png'
import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
import { config } from '~/lib/config/config'
import { User } from '~/user/user'

export const loader = async (args: LoaderArgs) => {
    const tokenStr = parse(args.request.headers.get('cookie') ?? '').token
    if (!tokenStr) {
        return redirect('/login')
    }
    const token = verify(tokenStr, config.jwtSecret)
    const { userId } = token
    const { id, email } = await storage.get<User>(`admin-db/user/id/${userId}/data`)
    return json({ okt: { name: 'Test' }, user: { id, email } })
}

const Index = () => {
    const { user } = useLoaderData()
    return (
        <>
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    {JSON.stringify(user)}
                </section>
            </main>
        </>
    )
}

export default Index
