import {Trail} from "~/core/types/types";
import {sprintf} from "sprintf-js";
import React from "react";
import {formatDistance} from "~/lib/map/map";

export const TrailSelector = (props: { trail: Trail }) => {
    const {trail} = props
    const [opened, setOpened] = React.useState(true)
    return <li key={trail.id}>
        <h2 className='border-t border-solid'>
            <button
                className='p-4 font-bold text-blueGray-600  p-4 block w-full text-left relative'
                onClick={() => {
                    setOpened(!opened)
                }}
            >
                {trail.name}
                <span className='absolute right-4'>
                    <i className={'fa-solid ' + (opened ? 'fa-minus' : 'fa-plus')}/>
                </span>
            </button>
        </h2>
        { opened ?
        <ul className='border-t border-solid'>
            {trail.path.checkpoints.map((checkpoint, i) => (
                <li key={i}>
                    <h3 className='p-4 text-blueGray-600  p-4 block w-full text-left'>
                        {i+1}. {checkpoint.name}
                    </h3>
                    <ul className='bg-white'>
                        {checkpoint.locations.map((location, j) => (
                            <li key={j}>
                                <button
                                    className='p-4 text-blueGray-600 p-4 block w-full text-left relative'
                                    onClick={() => {
                                        console.log(123)
                                    }}
                                >
                                    <span className='block mr-4'>
                                    {location.description}

                                    </span>
                                    <span className='absolute right-4 top-4'>
                    <i className='fa-solid fa-bullseye'/>
                </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul> : null }
    </li>
}

export const Selector = (props: {trails: Trail[]}) => {
    const {trails} = props
    return (
        <ul className='border-b border-solid text-xs'>
            {trails.map(trail => (
                <TrailSelector key={trail.id} trail={trail} />
            ))}
        </ul>
    )
}