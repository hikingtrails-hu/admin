import React from 'react'

import { Form } from '@remix-run/react'

export default function AdminNavbar() {
    return (
        <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
            <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                <div className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                </div>
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
    )
}
