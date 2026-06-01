import style from './MapView.module.css';
import { Map, Marker, type MapMouseEvent } from '@vis.gl/react-google-maps';
import { useState } from 'react';

const MapView = () => {
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const handleMapClick = (event: MapMouseEvent) => {
    const latLng = event.detail.latLng;
    if (!latLng) {
      return;
    }

    setMarkerPosition({
      lat: latLng.lat,
      lng: latLng.lng,
    });
  };

  return (
    <div className={style.mapView}>
      <Map
        className={style.map}
        disableDefaultUI
        defaultZoom={1}
        defaultCenter={{ lat: 48.0503486, lng: 19.5724191 }}
        onClick={handleMapClick}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </Map>
    </div>
  );
};

export default MapView;
