import { useAppDispatch } from 'src/core/infrastructure/index';
import { setFlagValue } from '@core/infrastructure/storage/modules/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';

export const useWelcomePresenter = ({
  navigation,
}: NativeStackScreenProps<ReactNavigation.MainNavigator, GlobalRoutesEnum.WELCOME>) => {
  const dispatch = useAppDispatch();

  const handleButtonPress = () => {
    dispatch(setFlagValue({ hasLaunched: true }));

    navigation.navigate(GlobalRoutesEnum.HOME);
  };

  return { handleButtonPress };
};
