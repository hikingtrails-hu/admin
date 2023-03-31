import type { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { bounds } from '~/core/hungary/hungary'
import { MeasuredLocationOnPath, Trail } from '~/core/types/types'
import { useRef } from 'react'
import { formatDistance, LocationSelectEmitter } from '~/lib/map/map'
import { EventEmitter } from 'events'
import { LocationSelectEmitters } from '~/routes/dashboard/bluetrail-data'
import { Icon } from 'leaflet'

const LocationMarker = (props: { location: MeasuredLocationOnPath; emitter: EventEmitter }) => {
    let ref = useRef()
    const { location } = props
    // console.log({selector})
    props.emitter.on('selected', (e) => {
        ref?.current?.openPopup()
    })
    return (
        <Marker
            position={[location.position.lat, location.position.lon]}
            ref={ref}
            icon={
                new Icon.Default({
                    imagePath: '/images/leaflet/',
                })
            }
        >
            <Popup>
                <div className="text-xs">
                    <h3 className="font-bold">{location.name}</h3>
                    <p className="italic">{location.description}</p>
                    <dl>
                        <dt className="inline-block">Distance from previous location:</dt>
                        <dd className="inline-block font-semibold">
                            &nbsp;{formatDistance(location.distance)}
                        </dd>
                    </dl>
                </div>
            </Popup>
        </Marker>
    )
}

const markers = (trail: Trail, emitters: LocationSelectEmitters) => {
    const result: MeasuredLocationOnPath[] = []
    trail.path.checkpoints.forEach((checkpoint) => {
        checkpoint.locations.forEach((location) => {
            result.push(location)
        })
    })
    return result.map((location, i) => (
        <LocationMarker location={location} key={i} emitter={emitters.get(location.id)} />
    ))
}

const TrailOnMap = (props: { trail: Trail; emitters: LocationSelectEmitters }) => (
    <>
        <Polyline
            color={'hsl(207,100%,33%)'}
            key={props.trail.id}
            positions={props.trail.path.nodes.map((node) => [node.point.lat, node.point.lon])}
        />
        {markers(props.trail, props.emitters)}
    </>
)

export function TrailMap(props: {
    trails: Trail[]
    onReady: (mapRef) => void
    emitters: LocationSelectEmitters
}) {
    const { trails } = props
    return (
        <div className="h-full">
            <MapContainer
                whenReady={(event) => {
                    props.onReady(event.target)
                }}
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
                {props.trails.map((trail) => (
                    <TrailOnMap trail={trail} key={trail.id} emitters={props.emitters} />
                ))}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}
