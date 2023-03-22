import {storage} from '~/lib/storage'
import {json, LinksFunction, LoaderArgs, redirect} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {parse} from 'cookie'
import {verify} from 'jsonwebtoken'
import {config} from '~/lib/config/config'
import {User} from '~/user/user'
import React, {Suspense, lazy}from "react";
import Sidebar from "~/components/Sidebar/Sidebar";
import HeaderStats from "~/components/Headers/HeaderStats";
import AdminNavbar from "~/components/Navbars/AdminNavbar";
import FooterAdmin from "~/components/Footers/FooterAdmin";
import fontAwesomeCss from '@fortawesome/fontawesome-free/css/all.min.css'
import {blueTrailKeys} from "~/core/hbt/blue-trail-setup";
import {Trail} from "~/core/types/types";
import {Map} from "~/components/map/Map.client";
import {ClientOnly} from "remix-utils";
// import {ClientOnly} from "~/components/map/ClientOnly";
// import {Map} from "~/components/map/Map";

export const loader = async (args: LoaderArgs) => {
    const token = parse(args.request.headers.get('cookie') ?? '').token
    if (!token) {
        return redirect('/login')
    }
    const { userId } = verify(token, config.jwtSecret)
    if (!userId) {
        return redirect('/login')
    }
    if (!await storage.has(`admin-db/user/id/${userId}/data`)) {
        return redirect('/login')
    }
    const trails = await Promise.all(blueTrailKeys.map(
        key => storage.get<Trail>(`trails/current/${key}.json`)
    ))
    const { id, email } = await storage.get<User>(`admin-db/user/id/${userId}/data`)
    return json({ trails, user: { id, email } })
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: fontAwesomeCss }
]
const Index = () => {
    const { user, trails } = useLoaderData<typeof loader>()
    return (
        <>
            <div className="relative bg-blueGray-100">
                <AdminNavbar />
                {/* Header */}
                <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
                    <div className="flex flex-wrap">
                        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                            <ClientOnly
                                fallback={
                                    <div
                                        id="skeleton"
                                        className='h-screen bg-blueGray-200'
                                    />
                                }
                            >
                                {() => <Map trails={trails} />}
                            </ClientOnly>

                        </div>
                        <div className="w-full xl:w-4/12 px-4">
                            <ul>
                                {trails.map(trail =>
                                    <li key={trail.id}><h2>{trail.name}</h2></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
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
