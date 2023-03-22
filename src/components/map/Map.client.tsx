import type { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { bounds } from '~/core/hungary/hungary'
import { Trail } from '~/core/types/types'

export function Map(props: { trails: Trail[] }) {
    const { trails } = props
    console.log(trails)
    return (
        <div className="h-screen pb-8">
            <MapContainer
                style={{
                    height: '100%',
                }}
                bounds={[
                    [bounds.northEast.lat, bounds.northEast.lon],
                    [bounds.southWest.lat, bounds.southWest.lon],
                ]}
                maxZoom={18}
                scrollWheelZoom={true}
            >
                {props.trails.map((trail) => {
                    return (
                        <>
                            <Polyline
                                color={'hsl(207,100%,33%)'}
                                key={trail.id}
                                positions={trail.path.nodes.map((node) => [
                                    node.point.lat,
                                    node.point.lon,
                                ])}
                            />
                            {trail.path.checkpoints.map((checkpoint, i) => {
                                return (
                                    <>
                                        {checkpoint.locations.map((location, j) => (
                                            <Marker
                                                key={`${i}-${j}`}
                                                position={[
                                                    location.position.lat,
                                                    location.position.lon,
                                                ]}
                                            >
                                                <Popup>
                                                    <h3>{location.name}</h3>
                                                    <p>{location.description}</p>
                                                    <dl>
                                                        <dt>Distance from previous</dt>
                                                        <dd>{location.distance} m</dd>
                                                    </dl>
                                                </Popup>
                                            </Marker>
                                        ))}
                                    </>
                                )
                            })}
                        </>
                    )
                })}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}
