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
    null
  );

  return (
    <PositionContext.Provider value={{ position, setPosition }}>
      <APIProvider apiKey={API_KEY} libraries={['streetView', 'marker']}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </APIProvider>
    </PositionContext.Provider>
  );
};

export default App;
export { PositionContext };
