import { ActionArgs, json, redirect, Response } from '@remix-run/node'
import registerBg from '~/assets/img/register_bg_2.png'
import Login from '~/views/auth/Login'
import { storage } from '~/lib/storage'
import { User } from '~/user/user'
import { verify } from 'argon2'
import invariant from 'tiny-invariant'
import { sign } from 'jsonwebtoken'
import { config } from '~/lib/config/config'
import { serialize } from 'cookie'

export const action = async (args: ActionArgs) => {
    const data = await args.request.formData()
    const email = data.get('email')
    const password = data.get('password') as string
    invariant(email)
    invariant(password)
    if (!(await storage.has(`admin-db/user/email/${email}/data`))) {
        throw new Error('Bad credentials')
    }
    const user = await storage.get<User>(`admin-db/user/email/${email}/data`)
    console.log({ user, password })
    if (!(await verify(user.encodedPassword, password))) {
        throw new Error('Bad credentials')
    }
    const token = sign({ userId: user.id }, config.jwtSecret)
    return redirect('/', {
        headers: {
            'Set-Cookie': serialize('token', token, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            }),
        },
    })
    // return new Response('xx', {
    //     status: 302,
    //     headers: {
    //         'Location': '/',
    //         'Set-Cookie': serialize('token', token, {
    //             path: '/',
    //             httpOnly: true,
    //             secure: true,
    //             sameSite: 'strict',
    //         })
    //     }
    // })
    // throw json(
    //     {status: 200},
    //     {headers: {'Set-Cookie': serialize('token', token, {
    //     path: '/',
    //         httpOnly: true,
    //         secure: true,
    //         sameSite: 'strict',
    //
    // })}}
    // )
}

export default function LoginPage() {
    return (
        <>
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                            backgroundImage: 'url(' + registerBg + ')',
                        }}
                    ></div>
                    <Login></Login>
                </section>
            </main>
        </>
    )
}
