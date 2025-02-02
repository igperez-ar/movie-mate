import { MainContainer } from '@components/index';
import MovieGrid from '@components/MovieGrid/MovieGrid';
import React from 'react';
import { useWatchlistPresenter } from './watchlist.presenter';
import type { WatchlistScreenProps } from './watchlist.types';

export const WatchlistScreen: React.FC<WatchlistScreenProps> = (props) => {
  const { watchlist, goToDetail } = useWatchlistPresenter(props);

  return (
    <MainContainer>
      <MovieGrid data={watchlist} onPress={(item) => goToDetail(item.id)} />
    </MainContainer>
  );
};
