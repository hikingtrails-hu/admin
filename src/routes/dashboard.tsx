import { storage } from '~/lib/storage'
import { json, LinksFunction, LoaderArgs, redirect } from '@remix-run/node'
import {Outlet, useLoaderData} from '@remix-run/react'
import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
import { config } from '~/lib/config/config'
import { User } from '~/user/user'
import React from 'react'
import Sidebar from '~/components/sidebar/Sidebar'
import HeaderStats from '~/components/Headers/HeaderStats'
import AdminNavbar from '~/components/Navbars/AdminNavbar'
import FooterAdmin from '~/components/Footers/FooterAdmin'
import fontAwesomeCss from '@fortawesome/fontawesome-free/css/all.min.css'
import CardSettings from "~/components/Cards/CardSettings";
import CardProfile from "~/components/Cards/CardProfile";

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
    return json({ user: { id, email } })
}


export default function Dashboard() {
    console.log(666)
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar />
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <div className="flex flex-wrap">
                        <Outlet />
                    </div>
                    <FooterAdmin />
                </div>
            </div>
        </>
    )
}
