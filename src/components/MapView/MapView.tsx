import style from './MapView.module.scss';
import {
  AdvancedMarker,
  Map,
  type MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { useContext, useState } from 'react';
import { PositionContext } from '../../App';
import clsx from 'clsx';
import ResultMap from '../ResultMap/ResultMap';

interface MapViewProps {
  onPlayAgain: () => void;
}

const MapView = ({ onPlayAgain }: MapViewProps) => {
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
    <>
      {isGuessSubmitted && markerPosition && positionToGuess ? (
        <ResultMap
          markerPosition={markerPosition}
          positionToGuess={positionToGuess}
          onPlayAgain={() => {
            setMarkerPosition(null);
            setIsGuessSubmitted(false);
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
