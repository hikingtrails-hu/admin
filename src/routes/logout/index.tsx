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
    return redirect('/', {
        headers: {
            'Set-Cookie': serialize('token', null, {
                expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT'),
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            }),
        },
    })
}
