import { useSelector } from 'react-redux';

export const useMovieSelectors = () => {
  const watchlist = useSelector((state: RootState) => state.movie.watchlist);
  const isWatchlisted = (id: number) =>
    useSelector((state: RootState) => state.movie.watchlist.some((item) => item.id === id));

  return {
    watchlist,
    isWatchlisted,
  };
};
