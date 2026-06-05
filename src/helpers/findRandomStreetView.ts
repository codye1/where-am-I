import randomCoords from './randomCoords';
interface findRandomStreetViewProps {
  sv: google.maps.StreetViewService;
  callback: (latLng: google.maps.LatLng) => void;
  maxAttempts?: number;
  attempt?: number;
  retryDelayMs?: number;
  maxRetryDelayMs?: number;
}

const findRandomStreetView = ({
  sv,
  callback,
  maxAttempts = 30,
  attempt = 1,
  retryDelayMs = 300,
  maxRetryDelayMs = 3000,
}: findRandomStreetViewProps) => {
  if (attempt > maxAttempts) {
    return;
  }

  const { lat, lng } = randomCoords();

  sv.getPanorama({ location: { lat, lng }, radius: 5000 }, (data, status) => {
    const isWalkable =
      status === 'OK' &&
      data?.location?.latLng &&
      data.links &&
      data.links.length > 0;

    if (isWalkable) {
      callback(data!.location!.latLng!);
    } else {
      const delay = Math.min(
        retryDelayMs * Math.pow(1.4, attempt - 1),
        maxRetryDelayMs
      );
      window.setTimeout(() => {
        findRandomStreetView({
          sv,
          callback,
          maxAttempts,
          attempt: attempt + 1,
          retryDelayMs,
          maxRetryDelayMs,
        });
      }, delay);
    }
  });
};

export default findRandomStreetView;
