import clsx from 'clsx';
import {
  AdvancedMarker,
  Map,
  Polyline,
  useMap,
} from '@vis.gl/react-google-maps';
import styles from './ResultMap.module.scss';
import finishIcon from '@assets/finish.svg';
import { useEffect } from 'react';

interface ResultMapProps {
  markerPosition: google.maps.LatLngLiteral;
  positionToGuess: google.maps.LatLngLiteral;
  onPlayAgain: () => void;
}

const ResultMap = ({
  markerPosition,
  positionToGuess,
  onPlayAgain,
}: ResultMapProps) => {
  const map = useMap('resultMap');

  useEffect(() => {
    if (!map) {
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(markerPosition);
    bounds.extend(positionToGuess);
    map.fitBounds(bounds, 48);
  }, [map, markerPosition, positionToGuess]);

  return (
    <div className={styles.resultMap}>
      <Map
        className={styles.map}
        disableDefaultUI
        id="resultMap"
        mapId={'resultMap'}
        defaultZoom={1}
        defaultCenter={{ lat: 48.0503486, lng: 19.5724191 }}
      >
        {markerPosition && (
          <AdvancedMarker position={markerPosition}>
            <div className={styles.mapDot} />
          </AdvancedMarker>
        )}
        {positionToGuess && (
          <AdvancedMarker position={positionToGuess}>
            <div className={clsx(styles.mapDotToGuess, styles.mapDot)}>
              <img src={finishIcon} alt="Finish" />
            </div>
          </AdvancedMarker>
        )}
        {markerPosition && positionToGuess && (
          <Polyline
            path={[markerPosition, positionToGuess]}
            strokeColor="black"
            strokeOpacity={0}
            strokeWeight={1}
            icons={[
              {
                icon: {
                  path: 'M 0,-1 0,1',
                  strokeOpacity: 1,
                  scale: 3,
                },
                offset: '0',
                repeat: '14px',
              },
            ]}
          />
        )}
      </Map>
      <button className={styles.playAgainButton} onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default ResultMap;
