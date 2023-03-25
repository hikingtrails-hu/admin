import type { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { bounds } from '~/core/hungary/hungary'
import {MeasuredLocationOnPath, Trail} from '~/core/types/types'

const markers = (trail: Trail) => {
    const result: MeasuredLocationOnPath[] = []
    trail.path.checkpoints.forEach((checkpoint) => {
        checkpoint.locations.forEach((location) => {
            result.push(location)
        })
    })
    return result.map((location, i) => (
        <Marker
            key={`${i}`}
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
    ))
}

const TrailOnMap = (props: {trail: Trail}) => (
        <>
            <Polyline
                color={'hsl(207,100%,33%)'}
                key={props.trail.id}
                positions={props.trail.path.nodes.map((node) => [
                    node.point.lat,
                    node.point.lon,
                ])}
            />
            {markers(props.trail)}

        </>
    )

export function Map(props: { trails: Trail[] }) {
    const { trails } = props
    return (
        <div className='h-full'>
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
                {props.trails.map((trail) => <TrailOnMap trail={trail} key={trail.id}/>)}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}
