import React from 'react'

// components

import CardStats from '~/components/Cards/CardStats'
import CardLineChart from '~/components/Cards/CardLineChart'
import CardBarChart from '~/components/Cards/CardBarChart'

export default function HeaderStats() {
    return (
        <>
            {/* Header */}
            <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
                <div className="flex flex-wrap">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">a</div>
                    <div className="w-full xl:w-4/12 px-4">b</div>
                </div>
            </div>
        </>
    )
}
