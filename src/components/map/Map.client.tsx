import type { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {bounds} from "~/core/hungary/hungary";

export function Map({ height }: { height: string }) {
    const position: LatLngTuple = [51.505, -0.09];

    return (
        <div className='h-screen pb-8'>
            <MapContainer
                style={{
                    height: "100%",
                }}
                bounds={[
                    [bounds.northEast.lat, bounds.northEast.lon],
                    [bounds.southWest.lat, bounds.southWest.lon],
                ]}
                maxZoom={18}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
