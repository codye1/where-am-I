import randomCoords from './randomCoords';
interface findRandomStreetViewProps {
  sv: google.maps.StreetViewService;
  callback: (latLng: google.maps.LatLng) => void;
}

const findRandomStreetView = ({ sv, callback }: findRandomStreetViewProps) => {
  const { lat, lng } = randomCoords();

  sv.getPanorama({ location: { lat, lng }, radius: 5000 }, (data, status) => {
    if (status === 'OK' && data && data.location && data.location.latLng) {
      callback(data.location.latLng);
    } else {
      findRandomStreetView({ sv, callback });
    }
  });
};

export default findRandomStreetView;
