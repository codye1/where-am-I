import style from './MapView.module.scss';
import {
  AdvancedMarker,
  Map,
  type MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import clsx from 'clsx';
import ResultMap from '../ResultMap/ResultMap';
import { useSubmitGuessMutation } from '@api/api';

interface MapViewProps {
  onPlayAgain: () => void;
  gameId: string;
}

const MapView = ({ onPlayAgain, gameId }: MapViewProps) => {
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [isGuessSubmitted, setIsGuessSubmitted] = useState(false);
  const [submitGuess] = useSubmitGuessMutation();
  const [positionToGuess, setPositionToGuess] =
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
    setIsGuessSubmitted(false);
  };

  const handleSubmitGuess = async () => {
    if (!markerPosition) {
      return;
    }
    setIsGuessSubmitted(true);

    const data = await submitGuess({
      gameId,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
    }).unwrap();
    localStorage.removeItem('CURRENT_GAME');
    setPositionToGuess(data.guessResult.targetCoords);
  };

  return (
    <>
      {isGuessSubmitted && markerPosition && positionToGuess ? (
        <ResultMap
          markerPosition={markerPosition}
          positionToGuess={positionToGuess}
          onPlayAgain={() => {
            setMarkerPosition(null);
            setIsGuessSubmitted(false);
            setPositionToGuess(null);
            onPlayAgain();
          }}
        />
      ) : (
        <div className={clsx(style.mapView)}>
          <Map
            className={clsx(style.map)}
            disableDefaultUI
            mapId={'pickingMap'}
            defaultZoom={1}
            defaultCenter={{ lat: 45.0503486, lng: 19.5724191 }}
            onClick={handleMapClick}
          >
            {markerPosition && (
              <AdvancedMarker position={markerPosition}>
                <div className={style.mapDot} />
              </AdvancedMarker>
            )}
          </Map>
          <button disabled={!markerPosition} onClick={handleSubmitGuess}>
            Submit Guess
          </button>
        </div>
      )}
    </>
  );
};

export default MapView;
