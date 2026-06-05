import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useContext, useEffect, useRef, useState } from 'react';
import style from './StreetView.module.scss';
import findRandomStreetView from '../../helpers/findRandomStreetView';
import { PositionContext } from '../../App';

interface StreetViewProps {
  position: google.maps.LatLngLiteral;
}

const StreetView = ({ position }: StreetViewProps) => {
  const streetViewLib = useMapsLibrary('streetView');
  const positionContext = useContext(PositionContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const initialPositionRef = useRef(position);

  useEffect(() => {
    if (!streetViewLib || !containerRef.current || panoramaRef.current) {
      return;
    }

    panoramaRef.current = new google.maps.StreetViewPanorama(
      containerRef.current,
      {
        position: initialPositionRef.current,
        pov: { heading: 0, pitch: 0 },
        zoom: 1,
        addressControl: false,
        fullscreenControl: false,
        motionTracking: false,
        motionTrackingControl: false,
        showRoadLabels: false,
      }
    );

    const statusListener = panoramaRef.current.addListener(
      'status_changed',
      () => {
        const status = panoramaRef.current?.getStatus();
        if (status && status !== 'OK') {
          setHasError(true);
        }
      }
    );

    return () => {
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
      }
      statusListener.remove();
      if (panoramaRef.current) {
        panoramaRef.current.setVisible(false);
        panoramaRef.current = null;
      }
    };
  }, [streetViewLib]);

  useEffect(() => {
    if (!panoramaRef.current) {
      return;
    }

    setHasError(false);

    const currentPos = panoramaRef.current.getPosition();
    if (
      currentPos &&
      (currentPos.lat() !== position.lat || currentPos.lng() !== position.lng)
    ) {
      panoramaRef.current.setPosition(position);
      panoramaRef.current.setVisible(true);
    }
  }, [position]);

  const handleRetry = () => {
    if (!positionContext?.setPosition || !streetViewLib || isRetrying) {
      return;
    }

    setIsRetrying(true);
    setHasError(false);

    retryTimeoutRef.current = window.setTimeout(() => {
      findRandomStreetView({
        sv: new google.maps.StreetViewService(),
        callback: (nextPosition) => {
          positionContext.setPosition({
            lat: nextPosition.lat(),
            lng: nextPosition.lng(),
          });
          setIsRetrying(false);
        },
      });
    }, 1200);
  };

  return (
    <div className={style.streetViewWrapper}>
      <div ref={containerRef} className={style.streetView} />
      {hasError && (
        <div className={style.errorOverlay}>
          <p>Street View temporarily unavailable.</p>
          <button onClick={handleRetry} disabled={isRetrying}>
            {isRetrying ? 'Retrying...' : 'Try again'}
          </button>
        </div>
      )}
    </div>
  );
};

export default StreetView;
