import {storage} from '~/lib/storage'
import {json, LinksFunction, LoaderArgs, redirect} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {parse} from 'cookie'
import {verify} from 'jsonwebtoken'
import {config} from '~/lib/config/config'
import {User} from '~/user/user'
import {Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import Sidebar from "~/components/Sidebar/Sidebar";
import HeaderStats from "~/components/Headers/HeaderStats";
import AdminNavbar from "~/components/Navbars/AdminNavbar";
import FooterAdmin from "~/components/Footers/FooterAdmin";
import fontAwesomeCss from '@fortawesome/fontawesome-free/css/all.min.css'

export const loader = async (args: LoaderArgs) => {
    const token = parse(args.request.headers.get('cookie') ?? '').token
    if (!token) {
        return redirect('/login')
    }
    const { userId } = verify(token, config.jwtSecret)
    const { id, email } = await storage.get<User>(`admin-db/user/id/${userId}/data`)
    return json({ okt: { name: 'Test' }, user: { id, email } })
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: fontAwesomeCss }
]

const Index = () => {
    const { user } = useLoaderData()
    return (
        <>
            <div className="relative bg-blueGray-100">
                <AdminNavbar />
                {/* Header */}
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {/*<Switch>*/}
                    {/*    <Route path="/admin/dashboard" exact component={Dashboard} />*/}
                    {/*    <Route path="/admin/maps" exact component={Maps} />*/}
                    {/*    <Route path="/admin/settings" exact component={Settings} />*/}
                    {/*    <Route path="/admin/tables" exact component={Tables} />*/}
                    {/*    <Redirect from="/admin" to="/admin/dashboard" />*/}
                    {/*</Switch>*/}
                    <FooterAdmin />
                </div>
            </div>
        </>
    )
}

export default Index
