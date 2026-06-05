import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import StreetView from '../../components/StreetViewPanorama/StreetView';
import { PositionContext } from '../../App';
import style from './Match.module.scss';
import MapView from '../../components/MapView/MapView';
import findRandomStreetView from '../../helpers/findRandomStreetView';
import Spinner from '../../components/Spinner/Spinner';

const Match = () => {
  const context = useContext(PositionContext);
  const setPosition = context?.setPosition;
  const [isLoading, setIsLoading] = useState(false);
  const isFindingPositionRef = useRef(false);

  const generatePosition = useCallback(() => {
    if (!setPosition) return;
    if (isFindingPositionRef.current) return;

    isFindingPositionRef.current = true;
    setIsLoading(true);

    findRandomStreetView({
      sv: new google.maps.StreetViewService(),
      callback: (position) => {
        setPosition({
          lat: position.lat(),
          lng: position.lng(),
        });
        isFindingPositionRef.current = false;
        setIsLoading(false);
      },
    });
  }, [setPosition]);

  useEffect(() => {
    generatePosition();
  }, [generatePosition]);

  if (!context) {
    return (
      <div className={style.loading}>
        Error: Position context not available.
      </div>
    );
  }

  const { position } = context;

  if (isLoading || !position) {
    return (
      <div className={style.loading}>
        <Spinner size="lg" />
        Loading new position...
      </div>
    );
  }

  return (
    <div className={style.match}>
      <StreetView position={position} />
      <MapView onPlayAgain={generatePosition} />
    </div>
  );
};

export default Match;
