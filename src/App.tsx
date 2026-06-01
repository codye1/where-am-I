import { BrowserRouter } from 'react-router';
import Routing from './router/Routing';
import { createContext, useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';

const PositionContext = createContext<{
  position: google.maps.LatLngLiteral | null;
  setPosition: (position: google.maps.LatLngLiteral) => void;
} | null>(null);

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const App = () => {
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(
    () => {
      const storedPosition = localStorage.getItem('position');
      if (!storedPosition) {
        return null;
      }

      try {
        const { lat, lng } = JSON.parse(storedPosition);
        return { lat, lng };
      } catch {
        return null;
      }
    }
  );

  const setPositionWrapper = (position: google.maps.LatLngLiteral) => {
    localStorage.setItem(
      'position',
      JSON.stringify({ lat: position.lat, lng: position.lng })
    );

    setPosition(position);
  };

  return (
    <PositionContext.Provider
      value={{ position, setPosition: setPositionWrapper }}
    >
      <APIProvider apiKey={API_KEY} libraries={['streetView']}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </APIProvider>
    </PositionContext.Provider>
  );
};

export default App;
export { PositionContext };
