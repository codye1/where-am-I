import { APIProvider, Map } from '@vis.gl/react-google-maps';
import './App.css';
import StreetView from './components/StreetViewPanorama/StreetView';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const App = () => (
  <div className="app">
    <h1>Where am I?</h1>
    <div className="view-container">
      <APIProvider apiKey={API_KEY} libraries={['streetView']}>
        <StreetView />
        <div className="map-view">
          <Map disableDefaultUI />
        </div>
      </APIProvider>
    </div>
  </div>
);

export default App;
