import { Route, Routes } from 'react-router';
import routes from './routes';
import { useApiIsLoaded } from '@vis.gl/react-google-maps';
import Spinner from '../components/Spinner/Spinner';
import styles from './Routing.module.scss';

const Routing = () => {
  const apiIsLoaded = useApiIsLoaded();

  if (!apiIsLoaded) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
        Loading Google Maps API...
      </div>
    );
  }

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  );
};

export default Routing;
