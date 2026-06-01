import style from './MapView.module.css';
import {
  AdvancedMarker,
  Map,
  Polyline,
  type MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { useContext, useState } from 'react';
import { PositionContext } from '../../App';
import clsx from 'clsx';
import finishIcon from '../../assets/finish.svg';

const MapView = () => {
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [isGuessSubmitted, setIsGuessSubmitted] = useState(false);
  const positionToGuess = useContext(PositionContext)?.position;

  const handleMapClick = (event: MapMouseEvent) => {
    const latLng = event.detail.latLng;
    if (!latLng) {
      return;
    }

    setMarkerPosition({
      lat: latLng.lat,
      lng: latLng.lng,
    });
    setIsGuessSubmitted(false);
  };

  const handleSubmitGuess = () => {
    if (!markerPosition || !positionToGuess) {
      return;
    }

    setIsGuessSubmitted(true);
  };

  return (
    <div
      className={clsx(style.mapView, isGuessSubmitted && style.fullScreenView)}
    >
      <Map
        className={clsx(style.map, isGuessSubmitted && style.fullScreenMap)}
        disableDefaultUI
        mapId={'MAP_ID'}
        defaultZoom={1}
        defaultCenter={{ lat: 48.0503486, lng: 19.5724191 }}
        onClick={handleMapClick}
      >
        {markerPosition && (
          <AdvancedMarker position={markerPosition}>
            <div className={style.mapDot} />
          </AdvancedMarker>
        )}
        {isGuessSubmitted && positionToGuess && (
          <AdvancedMarker position={positionToGuess}>
            <div className={clsx(style.mapDotToGuess, style.mapDot)}>
              <img src={finishIcon} alt="Finish" />
            </div>
          </AdvancedMarker>
        )}
        {isGuessSubmitted && markerPosition && positionToGuess && (
          <Polyline
            path={[markerPosition, positionToGuess]}
            strokeColor="#ff4d4f"
            strokeOpacity={0.9}
            strokeWeight={3}
          />
        )}
      </Map>
      <button disabled={!markerPosition} onClick={handleSubmitGuess}>
        Submit Guess
      </button>
    </div>
  );
};

export default MapView;
