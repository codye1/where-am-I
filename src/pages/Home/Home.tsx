import style from './Home.module.scss';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={style.home}>
      <h1>Home</h1>
      <p>Welcome to the Where am I? game! Click on "Match" to start playing.</p>
      <button onClick={() => navigate('/match')}>Go to Match</button>
    </div>
  );
};

export default Home;
