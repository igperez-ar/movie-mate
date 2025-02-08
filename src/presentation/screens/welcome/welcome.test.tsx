import { fireEvent, renderWithNavigation, waitFor } from '@testing/test-utils';
import { WelcomeScreen } from './welcome.screen';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';

describe('WelcomeScreen', () => {
  const renderScreen = () =>
    renderWithNavigation(WelcomeScreen, { routeName: GlobalRoutesEnum.WELCOME });

  it('should render successfully', () => {
    const { getByText } = renderScreen();

    expect(getByText('Welcome\nto MovieMate')).toBeTruthy();
    expect(getByText('Discover your next history')).toBeTruthy();
    expect(getByText('Get started')).toBeTruthy();
  });

  it('should navigate to "Home" and update flag value on button press', async () => {
    const { store, navigation, getByText } = renderScreen();

    expect(store.getState().config.flags.hasLaunched).toBeFalsy();

    fireEvent.press(getByText('Get started'));

    expect(store.getState().config.flags.hasLaunched).toBeTruthy();

    await waitFor(() => {
      expect(navigation.reset).toHaveBeenCalledTimes(1);
      expect(navigation.reset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: GlobalRoutesEnum.HOME }],
      });
    });
  });
});
