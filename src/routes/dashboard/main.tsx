import CardSettings from '~/components/Cards/CardSettings'
import CardProfile from '~/components/Cards/CardProfile'
import React from 'react'
import {Link} from "@remix-run/react";

export default function Main() {
    return (
        <>
            <div className="w-full px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h2 className="text-blueGray-700 text-xl font-bold">Useful links</h2>
                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0 text-sm">
                        <h3 className='mt-8 mb-6 font-bold uppercase'>Github</h3>
                        <ul className='list-disc'>
                            <li>
                                <Link to='https://github.com/hikingtrails-hu/' className='underline text-lightBlue-700'>Organization page</Link>
                            </li>
                        </ul>
                        <h3 className='mt-8 mb-6 font-bold uppercase'>Hosting</h3>
                        <ul className='list-disc'>
                            <li>
                                <Link to='https://fly.io/dashboard/' className='underline text-lightBlue-700'>Fly.io</Link>
                            </li>
                            <li>
                                <Link to='https://console.cloud.google.com/welcome?project=hikingtrails-hu' className='underline text-lightBlue-700'>Google Cloud Console</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
