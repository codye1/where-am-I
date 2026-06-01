import { Route, Routes } from 'react-router';
import routes from './routes';

const Routing = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  );
};

export default Routing;
