import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef } from 'react';

const StreetView = () => {
  const streetViewLib = useMapsLibrary('streetView');
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!streetViewLib || !containerRef.current) {
      return;
    }

    new google.maps.StreetViewPanorama(containerRef.current, {
      position: { lat: 37.7749, lng: -122.4194 },
      pov: { heading: 0, pitch: 0 },
      zoom: 1,
      addressControl: false,
      fullscreenControl: false,
      motionTracking: false,
      motionTrackingControl: false,
      showRoadLabels: false,
    });
  }, [streetViewLib]);

  return <div ref={containerRef} className="street-view" />;
};

export default StreetView;
