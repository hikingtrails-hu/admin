import { storage } from '~/lib/storage'
import { json, LinksFunction, LoaderArgs, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
import { config } from '~/lib/config/config'
import { User } from '~/user/user'
import React, { Suspense, lazy } from 'react'
import Sidebar from '~/components/sidebar/Sidebar'
import HeaderStats from '~/components/Headers/HeaderStats'
import AdminNavbar from '~/components/Navbars/AdminNavbar'
import FooterAdmin from '~/components/Footers/FooterAdmin'
import fontAwesomeCss from '@fortawesome/fontawesome-free/css/all.min.css'
import { blueTrailKeys } from '~/core/hbt/blue-trail-setup'
import { Trail } from '~/core/types/types'
import { TrailMap } from '~/components/map/Map.client'
import { ClientOnly } from 'remix-utils'
import CardSettings from '~/components/Cards/CardSettings'
import CardProfile from '~/components/Cards/CardProfile'
import { Selector } from '~/components/map/Selector'
import { EventEmitter } from 'events'
import { allLocations } from '~/lib/map/map'
// import {ClientOnly} from "~/components/map/ClientOnly";
// import {Map} from "~/components/map/Map";

export const loader = async (args: LoaderArgs) => {
    // const token = parse(args.request.headers.get('cookie') ?? '').token
    // if (!token) {
    //     return redirect('/login')
    // }
    // const { userId } = verify(token, config.jwtSecret)
    // if (!userId) {
    //     return redirect('/login')
    // }
    // if (!(await storage.has(`admin-db/user/id/${userId}/data`))) {
    //     return redirect('/login')
    // }
    const trails = await Promise.all(
        blueTrailKeys.map((key) => storage.get<Trail>(`trails/current/${key}.json`))
    )
    // const { id, email } = await storage.get<User>(`admin-db/user/id/${userId}/data`)
    return json({ trails })
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: fontAwesomeCss }]

export type LocationSelectEmitters = Map<string, EventEmitter>

const BluetrailData = () => {
    const { user, trails } = useLoaderData<typeof loader>()
    let leaflet = null
    const locationSelectEmitter = new EventEmitter()
    const emitters: LocationSelectEmitters = new Map()
    allLocations(trails).forEach((location) => {
        emitters.set(location.id, new EventEmitter())
    })
    return (
        <>
            <div className="w-full lg:w-8/12 px-4">
                <div className="h-screen pb-8">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg overflow-hidden bg-blueGray-100 border-0 h-full">
                        <ClientOnly
                            fallback={<div id="skeleton" className="h-screen bg-blueGray-200" />}
                        >
                            {() => (
                                <TrailMap
                                    emitters={emitters}
                                    trails={trails}
                                    onReady={(mapRef) => {
                                        leaflet = mapRef
                                    }}
                                />
                            )}
                        </ClientOnly>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
                <div className="h-screen pb-8">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 h-full overflow-scroll">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Map Data</h6>
                            </div>
                        </div>
                        <div>
                            <Selector
                                trails={trails}
                                onSelect={(location) => {
                                    if (leaflet) {
                                        emitters.get(location.id)?.emit('selected', location)
                                        leaflet.flyTo(
                                            [location.position.lat, location.position.lon],
                                            13,
                                            {
                                                duration: 1.5,
                                            }
                                        )
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BluetrailData
