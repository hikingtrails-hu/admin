import React from 'react'
import CardStats from '~/components/header/CardStats'

export default function HeaderStats() {
    return (
        <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
            <div className="px-4 md:px-10 mx-auto w-full">
                <div>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                            <CardStats
                                statSubtitle="Last Data Import"
                                statTitle="10 hours ago"
                                statIcon="fa-solid fa-check"
                                statPercent="Success"
                                statPercentColor="text-emerald-500"
                                statDescripiron=""
                                statIconName="fa-solid fa-file-import"
                                statIconColor="bg-red-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
