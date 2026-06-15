import { BrowserRouter } from 'react-router';
import Routing from './router/Routing';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Provider } from 'react-redux';
import store from '@redux/store';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const App = () => {
  return (
    <Provider store={store}>
      <APIProvider apiKey={API_KEY} libraries={['streetView', 'marker']}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </APIProvider>
    </Provider>
  );
};

export default App;
