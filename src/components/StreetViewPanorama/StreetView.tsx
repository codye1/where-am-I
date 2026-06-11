import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
import style from './StreetView.module.scss';

interface StreetViewProps {
  panoramaId: string;
}

const StreetView = ({ panoramaId }: StreetViewProps) => {
  const streetViewLib = useMapsLibrary('streetView');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!streetViewLib || !containerRef.current) return;

    panoramaRef.current = new streetViewLib.StreetViewPanorama(
      containerRef.current,
      {
        pov: { heading: 0, pitch: 0 },
        zoom: 1,
        addressControl: false,
        fullscreenControl: false,
        motionTracking: false,
        motionTrackingControl: false,
        showRoadLabels: false,
      }
    );
  }, [streetViewLib]);

  useEffect(() => {
    if (!panoramaRef.current || !panoramaId) return;

    setHasError(false);

    const sv = new google.maps.StreetViewService();
    sv.getPanorama({ pano: panoramaId }, (data, status) => {
      if (
        status === google.maps.StreetViewStatus.OK &&
        data?.location?.latLng
      ) {
        panoramaRef.current!.setPano(panoramaId);
        panoramaRef.current!.setVisible(true);
      } else {
        setHasError(true);
      }
    });
  }, [panoramaId, streetViewLib]);

  return (
    <div className={style.streetViewWrapper}>
      {hasError && (
        <div className={style.errorMessage}>
          Failed to load Street View panorama.
        </div>
      )}
      <div ref={containerRef} className={style.streetView} />
    </div>
  );
};

export default StreetView;
