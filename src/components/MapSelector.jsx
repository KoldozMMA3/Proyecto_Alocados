import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

// Corrección de Iconos Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function SearchBar() {
    const map = useMap();
    useEffect(() => {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider: provider,
            style: 'bar',
            placeholder: 'Busca tu dirección...',
            autoClose: true,
        });
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [map]);
    return null;
}

const MapSelector = ({ position, setPosition }) => {
    // Componente interno para manejar clics
    function MapEvents() {
        useMapEvents({
            click(e) { setPosition(e.latlng); },
        });
        return null;
    }

    return (
        <div className="h-[400px] w-full rounded-2xl overflow-hidden border-2 border-zinc-700 shadow-2xl relative">
            <MapContainer center={[position.lat, position.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <SearchBar />
                <MapEvents />
                <Marker position={[position.lat, position.lng]} draggable={true} eventHandlers={{
                    dragend: (e) => setPosition(e.target.getLatLng())
                }} />
            </MapContainer>
        </div>
    );
};

export default MapSelector;