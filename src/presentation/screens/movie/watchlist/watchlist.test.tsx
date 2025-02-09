import { WASTCHLISTED_MOVIES } from '@testing/fixtures/movies/watchlisted-movies.fixture';
import { act, fireEvent, renderWithNavigation } from '@testing/test-utils';
import { MovieRoutesEnum } from 'src/shared/enums/routes';
import { WatchlistScreen } from './watchlist.screen';
import { addWatchlist, removeWatchlist } from '@core/infrastructure/storage/modules/movie';

const ROUTE_PROPS = {
  routeName: MovieRoutesEnum.WATCHLIST,
};

describe('WatchlistScreen', () => {
  it('should render successfully', async () => {
    const { getByText, findAllByTestId } = renderWithNavigation(WatchlistScreen, {
      ...ROUTE_PROPS,
      preloadedState: { movie: { watchlist: WASTCHLISTED_MOVIES } },
    });

    const gridItems = await findAllByTestId('movie_grid_item');

    expect(gridItems).toHaveLength(WASTCHLISTED_MOVIES.length);
    expect(getByText(WASTCHLISTED_MOVIES[0].title)).toBeTruthy();
  });

  it('should navigate to "MovieDetail" on movie press', async () => {
    const { navigation, findAllByTestId } = renderWithNavigation(WatchlistScreen, {
      ...ROUTE_PROPS,
      preloadedState: { movie: { watchlist: WASTCHLISTED_MOVIES } },
    });

    const gridItems = await findAllByTestId('movie_grid_item');

    fireEvent(gridItems[0], 'press');

    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith(MovieRoutesEnum.DETAIL, {
      id: WASTCHLISTED_MOVIES.reverse()[0].id,
    });
  });

  it('should successfully update the list on movie toggle from watchlist', async () => {
    const { store, queryByText } = renderWithNavigation(WatchlistScreen, {
      ...ROUTE_PROPS,
      preloadedState: { movie: { watchlist: WASTCHLISTED_MOVIES } },
    });

    const movie = WASTCHLISTED_MOVIES[0];

    expect(queryByText(movie.title)).toBeTruthy();

    await act(async () => {
      store.dispatch(removeWatchlist(movie.id));
    });

    expect(queryByText(movie.title)).toBeFalsy();

    await act(async () => {
      store.dispatch(addWatchlist(movie));
    });

    expect(queryByText(movie.title)).toBeTruthy();
  });
});
