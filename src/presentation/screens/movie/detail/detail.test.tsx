import { GetAllSimilarUseCase, GetOneByIdUseCase } from '@core/capabilities/movies';
import { MOVIE_DETAIL, SIMILAR_MOVIES } from '@testing/fixtures/movies';
import { fireEvent, renderWithNavigation, waitFor } from '@testing/test-utils';
import { MovieRoutesEnum } from 'src/shared/enums/routes';
import { MovieDetailScreen } from './detail.screen';

const ROUTE_PROPS = {
  routeName: MovieRoutesEnum.DETAIL,
  routeParams: { id: MOVIE_DETAIL.id },
};

describe('DetailScreen', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(GetOneByIdUseCase.prototype, 'execute').mockResolvedValue(MOVIE_DETAIL);
    jest.spyOn(GetAllSimilarUseCase.prototype, 'execute').mockResolvedValue(SIMILAR_MOVIES);
  });

  it('should render successfully', async () => {
    const { getByText, getAllByTestId } = renderWithNavigation(MovieDetailScreen, ROUTE_PROPS);

    await waitFor(() => {
      const button = getByText('+watchlist');

      expect(getByText(MOVIE_DETAIL.title)).toBeTruthy();
      expect(getByText(MOVIE_DETAIL.overview)).toBeTruthy();
      expect(button).toBeTruthy();
      expect(button.props['aria-selected']).toBeTruthy();
      expect(getAllByTestId('movie_carousel_item')).toHaveLength(SIMILAR_MOVIES.results.length);
    });
  });

  it('should add a movie to watchlist successfully', async () => {
    const { store, findByText } = renderWithNavigation(MovieDetailScreen, ROUTE_PROPS);

    const button = await findByText('+watchlist');

    const isWatchlisted = () =>
      store.getState().movie.watchlist.some((item) => item.id === MOVIE_DETAIL.id);

    expect(isWatchlisted()).toBeFalsy();
    expect(button.props['aria-selected']).toBeTruthy();

    fireEvent(button, 'press');

    expect(isWatchlisted()).toBeTruthy();
    expect(button.props['aria-selected']).toBeFalsy();
  });

  it('should remove a movie from watchlist successfully', async () => {
    const { store, findByText } = renderWithNavigation(MovieDetailScreen, {
      ...ROUTE_PROPS,
      preloadedState: {
        movie: {
          watchlist: [
            {
              id: MOVIE_DETAIL.id,
              title: MOVIE_DETAIL.title,
              poster_path: MOVIE_DETAIL.poster_path,
            },
          ],
        },
      },
    });

    const button = await findByText('watchlisted');

    const isWatchlisted = () =>
      store.getState().movie.watchlist.some((item) => item.id === MOVIE_DETAIL.id);

    expect(isWatchlisted()).toBeTruthy();
    expect(button.props['aria-selected']).toBeFalsy();

    fireEvent(button, 'press');

    expect(isWatchlisted()).toBeFalsy();
    expect(button.props['aria-selected']).toBeTruthy();
  });

  it('should navigate to "MovieDetail" on press movie from similars carousel', async () => {
    const { navigation, findAllByTestId } = renderWithNavigation(MovieDetailScreen, ROUTE_PROPS);

    const carouselItems = await findAllByTestId('movie_carousel_item');

    fireEvent(carouselItems[0], 'press');

    expect(navigation.push).toHaveBeenCalledTimes(1);

    expect(navigation.push).toHaveBeenCalledWith(MovieRoutesEnum.DETAIL, {
      id: SIMILAR_MOVIES.results[0].id,
    });
  });

  it('should show movie details correctly without similars carousel', async () => {
    jest
      .spyOn(GetAllSimilarUseCase.prototype, 'execute')
      .mockRejectedValueOnce(new Error('Error retrieving similar movies'));
    const { getByText, queryByText, queryAllByTestId } = renderWithNavigation(
      MovieDetailScreen,
      ROUTE_PROPS,
    );

    await waitFor(() => {
      expect(getByText(MOVIE_DETAIL.title)).toBeTruthy();
      expect(getByText(MOVIE_DETAIL.overview)).toBeTruthy();
      expect(getByText('Synopsis')).toBeTruthy();
      expect(getByText('+watchlist')).toBeTruthy();
      expect(queryByText('Recommended')).toBeFalsy();
      expect(queryAllByTestId('movie_carousel_item')).toHaveLength(0);
    });
  });

  it('should handle fetching errors successfully', async () => {
    jest
      .spyOn(GetOneByIdUseCase.prototype, 'execute')
      .mockRejectedValueOnce(new Error('Error retrieving movie details'));
    const { queryByText, queryAllByTestId } = renderWithNavigation(MovieDetailScreen, ROUTE_PROPS);

    await waitFor(() => {
      expect(queryByText(MOVIE_DETAIL.title)).toBeFalsy();
      expect(queryByText(MOVIE_DETAIL.overview)).toBeFalsy();
      expect(queryByText('Synopsis')).toBeFalsy();
      expect(queryByText('+watchlist')).toBeFalsy();
      expect(queryByText('Recommended')).toBeFalsy();
      expect(queryAllByTestId('movie_carousel_item')).toHaveLength(0);
    });
  });
});
