import {Trail} from "~/core/types/types";
import React from "react";

export const TrailSelector = (props: { trail: Trail }) => {
    const {trail} = props
    const [opened, setOpened] = React.useState(false)
    return <li key={trail.id}>
        <h2 className='border-t border-solid'>
            <button
                className='p-4 text-xs font-bold text-blueGray-600  p-4 block w-full text-left'
                onClick={() => {
                    console.log(123)
                    setOpened(!opened)
                }}
            >
                {trail.name}
                <span className='absolute right-4'>
                    <i className={'fa-solid ' + (opened ? 'fa-minus' : 'fa-plus')}/>
                </span>
            </button>
        </h2>
        {/*<ul>*/}
        {/*    {trail.path.checkpoints.map((checkpoint, i) => (*/}
        {/*        <li key={i}>*/}
        {/*            <h3 className='p-1 ml-3 font-bold text-blueGray-600'>{checkpoint.name}</h3>*/}
        {/*        </li>*/}
        {/*    ))}*/}
        {/*</ul>*/}
    </li>
}

export const Selector = (props: {trails: Trail[]}) => {
    const {trails} = props
    return (
        <ul className='border-b border-solid'>
            {trails.map(trail => (
                <TrailSelector key={trail.id} trail={trail} />
            ))}
        </ul>
    )
}