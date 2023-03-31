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
import { Form } from '@remix-run/react'
import React from 'react'

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
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-blueGray-500 text-sm font-bold">
                                                hikingtrails.hu admin
                                            </h6>
                                        </div>
                                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <Form method="post">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Email"
                                                />
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    name="password"
                                                    type="password"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Password"
                                                />
                                            </div>

                                            <div className="text-center mt-6">
                                                <input
                                                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                    type="submit"
                                                    value="Sign In"
                                                />
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
