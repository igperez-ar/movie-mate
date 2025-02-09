import { GetAllByCategoryUseCase, GetAllTrendingUseCase } from '@core/capabilities/movies';
import { TRENDING_MOVIES, UPCOMING_MOVIES } from '@testing/fixtures/movies';
import { act, fireEvent, renderWithNavigation, waitFor } from '@testing/test-utils';
import { GlobalRoutesEnum, MovieRoutesEnum } from 'src/shared/enums/routes';
import { HomeScreen } from './home.screen';

const ROUTE_PROPS = {
  routeName: GlobalRoutesEnum.HOME,
};

const titles = ['Trending', 'Top rated', 'Popular', 'Now playing', 'Upcoming'];

describe('HomeScreen', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(GetAllByCategoryUseCase.prototype, 'execute').mockResolvedValue(UPCOMING_MOVIES);
    jest.spyOn(GetAllTrendingUseCase.prototype, 'execute').mockResolvedValue(TRENDING_MOVIES);
  });

  it('should render successfully', async () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithNavigation(
      HomeScreen,
      ROUTE_PROPS,
    );

    await waitFor(() => {
      titles.map((title) => expect(getByText(title)).toBeTruthy());
      expect(getByTestId('expandable_button')).toBeTruthy();
      expect(getByText(TRENDING_MOVIES.results[0].title)).toBeTruthy();
      expect(getAllByTestId('movie_carousel_item')).toHaveLength(
        UPCOMING_MOVIES.results.length * 4 + TRENDING_MOVIES.results.length,
      );
    });
  });

  it('should navigate to "MovieDetail" on press carousel item', async () => {
    const { findAllByTestId, navigation } = renderWithNavigation(HomeScreen, ROUTE_PROPS);

    const carouselItems = await findAllByTestId('movie_carousel_item');

    fireEvent(carouselItems[0], 'press');

    expect(navigation.navigate).toHaveBeenCalledWith(MovieRoutesEnum.STACK, {
      screen: MovieRoutesEnum.DETAIL,
      params: {
        id: TRENDING_MOVIES.results[0].id,
        category: 'trending',
      },
    });
  });

  it('should show and navigate through featured movie successfully', async () => {
    const { getByText, queryByText, navigation } = renderWithNavigation(HomeScreen, ROUTE_PROPS);

    await waitFor(() => {
      expect(getByText(TRENDING_MOVIES.results[0].title)).toBeTruthy();
      expect(queryByText(TRENDING_MOVIES.results[1].title)).toBeFalsy();
    });

    await act(async () => {
      jest.advanceTimersByTime(5000);
    });

    expect(queryByText(TRENDING_MOVIES.results[0].title)).toBeFalsy();
    expect(getByText(TRENDING_MOVIES.results[1].title)).toBeTruthy();

    fireEvent(getByText('See more'), 'press');

    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith(MovieRoutesEnum.STACK, {
      screen: MovieRoutesEnum.DETAIL,
      params: {
        id: TRENDING_MOVIES.results[1].id,
      },
    });
  });

  it('should show only the successfully fetches', async () => {
    jest
      .spyOn(GetAllTrendingUseCase.prototype, 'execute')
      .mockRejectedValue(new Error('Error retrieving trending movies'));
    const { getByText, getAllByTestId, queryByText } = renderWithNavigation(
      HomeScreen,
      ROUTE_PROPS,
    );

    await waitFor(() => {
      expect(queryByText('Trending')).toBeFalsy();
      titles.slice(1).map((title) => expect(getByText(title)).toBeTruthy());
      expect(getAllByTestId('movie_carousel_item')).toHaveLength(
        UPCOMING_MOVIES.results.length * 4,
      );
    });
  });

  it('should handle fetching errors successfully', async () => {
    jest
      .spyOn(GetAllByCategoryUseCase.prototype, 'execute')
      .mockRejectedValue(new Error('Error retrieving movies'));
    const { queryByText, queryAllByTestId } = renderWithNavigation(HomeScreen, ROUTE_PROPS);

    await waitFor(() => {
      titles.map((title) => expect(queryByText(title)).toBeFalsy());
      expect(queryAllByTestId('movie_carousel_item')).toHaveLength(0);
    });
  });
});
