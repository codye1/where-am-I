import StreetView from '../../components/StreetViewPanorama/StreetView';
import { PositionContext } from '../../App';
import { useContext } from 'react';
import style from './Match.module.css';
import MapView from '../../components/MapView/MapView';

const Match = () => {
  const positionContext = useContext(PositionContext);

  if (!positionContext) {
    return null;
  }

  const { position } = positionContext;

  if (!position) {
    return <div>Position not available</div>;
  }

  return (
    <div className={style.match}>
      <StreetView position={position} />
      <MapView />
    </div>
  );
};

export default Match;
