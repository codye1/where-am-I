import { useContext } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import style from './Home.module.scss';
import { PositionContext } from '../../App';
import findRandomStreetView from '../../helpers/findRandomStreetView';
import { useNavigate } from 'react-router';

const Home = () => {
  const positionContext = useContext(PositionContext);
  const streetViewLib = useMapsLibrary('streetView');

  const navigate = useNavigate();

  if (!positionContext) {
    return null;
  }

  const { setPosition } = positionContext;

  return (
    <div className={style.home}>
      <h1>Home</h1>
      <p>Welcome to the Where am I? game! Click on "Match" to start playing.</p>
      <button
        onClick={() => {
          if (!streetViewLib) {
            return;
          }

          findRandomStreetView({
            sv: new google.maps.StreetViewService(),
            callback: (position) => {
              const nextPosition = {
                lat: position.lat(),
                lng: position.lng(),
              };

              setPosition(nextPosition);
              navigate('/match');
            },
          });
        }}
      >
        Go to Match
      </button>
    </div>
  );
};

export default Home;
