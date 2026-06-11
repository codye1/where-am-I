import StreetView from '../../components/StreetViewPanorama/StreetView';
import style from './Match.module.scss';
import MapView from '../../components/MapView/MapView';
import { useStartGameQuery } from '../../api/api';
import Spinner from '../../components/Spinner/Spinner';

const Match = () => {
  const panoramaId = 'assf';
  const { data, error, isLoading } = useStartGameQuery();

  if (isLoading) {
    return (
      <div className={style.match}>
        <Spinner size="lg" />
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return <div className={style.match}>Failed to start game.</div>;
  }
  console.log('Game started with data:', data);
  return (
    <div className={style.match}>
      <StreetView panoramaId={panoramaId} />
      <MapView onPlayAgain={() => {}} />
    </div>
  );
};

export default Match;
