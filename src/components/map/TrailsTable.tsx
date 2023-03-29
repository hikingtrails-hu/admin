import { CheckPoint, LatLon, MeasuredLocationOnPath, Trail } from '~/core/types/types'
import { sprintf } from 'sprintf-js'
import React from 'react'
import { formatDistance } from '~/lib/map/map'
import { LocationSelected } from '~/components/map/Selector'

const CheckpointTable = (props: { checkpoint: CheckPoint; onSelect: LocationSelected }) => {
    const { checkpoint } = props
    return (
        <>
            {checkpoint.locations.map((location, i) => (
                <tr key={i} className="bg-white">
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        {i === 0 ? checkpoint.name : null}
                    </th>
                    <td className="bg-blueGray-50 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {i === 0 ? formatDistance(checkpoint.locations[0].distance) : null}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4">
                        <p className="max-w-xs overflow-x-auto">{location.description}</p>
                    </td>
                    <td className="bg-blueGray-50 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <p>{formatDistance(location.distance)}</p>
                    </td>
                </tr>
            ))}
        </>
    )
}

const TrailTable = (props: { trail: Trail; onSelect: LocationSelected }) => {
    const color = 'light'
    const { trail } = props
    const [opened, setOpened] = React.useState(false)
    return (
        <li className="text-xs bg-blueGray-50 text-blueGray-500 border-blueGray-100">
            <h2 className="border-t border-solid">
                <button
                    className="p-4 font-bold text-blueGray-600  p-4 block w-full text-left relative"
                    onClick={() => {
                        setOpened(!opened)
                    }}
                >
                    {trail.name}
                    <span className="absolute right-4">
                        <i
                            className={'fa-solid ' + (opened ? 'fa-chevron-up' : 'fa-chevron-down')}
                        />
                    </span>
                </button>
            </h2>
            {opened ? (
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                            <th
                                className={
                                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                    (color === 'light'
                                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                            >
                                Checkpoint
                            </th>
                            <th
                                className={
                                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                    (color === 'light'
                                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                            >
                                Distance
                            </th>
                            <th
                                className={
                                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                    (color === 'light'
                                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                            >
                                Location
                            </th>
                            <th
                                className={
                                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                                    (color === 'light'
                                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                                        : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                                }
                            >
                                Distance
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {trail.path.checkpoints.map((checkpoint, i) => (
                            <CheckpointTable
                                key={i}
                                checkpoint={checkpoint}
                                onSelect={props.onSelect}
                            />
                        ))}
                        {/*          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">*/}
                        {/*              $2,500 USD*/}
                        {/*          </td>*/}
                        {/*          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">*/}
                        {/*              <i className="fas fa-circle text-orange-500 mr-2"></i> pending*/}
                        {/*          </td>*/}
                        {/*          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">*/}
                        {/*              <div className="flex"></div>*/}
                        {/*          </td>*/}
                        {/*          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">*/}
                        {/*              <div className="flex items-center">*/}
                        {/*                  <span className="mr-2">60%</span>*/}
                        {/*                  <div className="relative w-full">*/}
                        {/*                      <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">*/}
                        {/*                          <div*/}
                        {/*                              style={{ width: "60%" }}*/}
                        {/*                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"*/}
                        {/*                          ></div>*/}
                        {/*                      </div>*/}
                        {/*                  </div>*/}
                        {/*              </div>*/}
                        {/*          </td>*/}
                        {/*          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">*/}
                        {/*              <TableDropdown />*/}
                        {/*          </td>*/}
                        {/*      </tr>*/}
                    </tbody>
                </table>
            ) : null}
        </li>
    )
}

export const TrailsTable = (props: { trails: Trail[]; onSelect: LocationSelected }) => {
    const { trails } = props
    return (
        <ul className="">
            {trails.map((trail) => (
                <TrailTable key={trail.id} trail={trail} onSelect={props.onSelect} />
            ))}
        </ul>
    )
}
