import React from 'react'

import UserDropdown from '~/components/Dropdowns/UserDropdown'
import { Form } from '@remix-run/react'

export default function AdminNavbar() {
    return (
        <>
            {/* Navbar */}
            <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    {/* Brand */}
                    <ul className="flex">
                        <li className="mr-6">
                            <a
                                className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                                href="/"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li className="mr-6">
                            <a
                                className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                                href="/bluetrail-data"
                            >
                                Blue Trail Data
                            </a>
                        </li>
                    </ul>
                    {/* User */}
                    <div className="text-white text-sm uppercase">
                        <Form action="/logout" method="post">
                            <button type="submit">
                                Logout
                                <span className="ml-2 align-text-top">
                                    <i className="fa-solid fa-person-through-window"></i>
                                </span>
                            </button>
                        </Form>
                    </div>
                </div>
            </nav>
            {/* End Navbar */}
        </>
    )
}
