import * as scripts from './cli'
import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import tailwind from '~/tailwind.css'
import fontAwesomeCss from "@fortawesome/fontawesome-free/css/all.min.css";

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: tailwind },
    {
        rel: 'stylesheet',
        href: 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.css',
    },
    { rel: 'stylesheet', href: fontAwesomeCss }
]

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'New Remix App',
    viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

export const { cli } = scripts
