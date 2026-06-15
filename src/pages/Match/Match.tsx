import StreetView from '@components/StreetView/StreetView';
import style from './Match.module.scss';
import MapView from '@components/MapView/MapView';
import { useStartGameQuery } from '@api/api';
import Spinner from '@components/Spinner/Spinner';
import { useState } from 'react';

const GAME_KEY = 'CURRENT_GAME';

const Match = () => {
  const [savedGameJson, setSavedGameJson] = useState(
    localStorage.getItem(GAME_KEY)
  );
  const [cacheKey, setCacheKey] = useState(0); // forces new query
  const savedGame = savedGameJson ? JSON.parse(savedGameJson) : null;

  const { data, error, isLoading, isFetching } = useStartGameQuery(cacheKey, {
    skip: !!savedGame,
  });

  const game = savedGame ?? data?.game;

  const handlePlayAgain = () => {
    localStorage.removeItem(GAME_KEY);
    setSavedGameJson(null);
    setCacheKey((k) => k + 1);
  };

  if (isLoading || isFetching) {
    return (
      <div className={style.loading}>
        <Spinner size="lg" />
        Loading...
      </div>
    );
  }

  if (error || !game) {
    return <div className={style.error}>Failed to start game.</div>;
  }

  return (
    <div className={style.match}>
      <StreetView panoramaId={game.panoramaId} />
      <MapView onPlayAgain={handlePlayAgain} gameId={game.id} />
    </div>
  );
};

export default Match;
