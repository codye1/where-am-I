import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react';
import style from './StreetView.module.css';

interface StreetViewProps {
  position: google.maps.LatLngLiteral;
}

const StreetView = ({ position }: StreetViewProps) => {
  const streetViewLib = useMapsLibrary('streetView');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);

  useEffect(() => {
    if (!streetViewLib || !containerRef.current) {
      return;
    }

    if (!panoramaRef.current) {
      panoramaRef.current = new google.maps.StreetViewPanorama(
        containerRef.current,
        {
          position,
          pov: { heading: 0, pitch: 0 },
          zoom: 1,
          addressControl: false,
          fullscreenControl: false,
          motionTracking: false,
          motionTrackingControl: false,
          showRoadLabels: false,
        }
      );
    } else {
      panoramaRef.current.setPosition(position);
    }

    return () => {
      if (panoramaRef.current) {
        panoramaRef.current.setVisible(false);
      }
    };
  }, [position, streetViewLib]);

  return <div ref={containerRef} className={style.streetView} />;
};

export default StreetView;
