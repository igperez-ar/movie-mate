import { useSelector } from 'react-redux';

export const useMovieSelectors = () => {
  const watchlist = useSelector((state: RootState) => state.movie.watchlist);
  const checkWatchlisted = (id: number) =>
    useSelector((state: RootState) => state.movie.watchlist.some((item) => item.id === id));

  return {
    watchlist,
    checkWatchlisted,
  };
};
