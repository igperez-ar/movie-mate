import { useConfigSelectors } from '@core/infrastructure/storage/modules/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';

export const useSplashPresenter = ({
  navigation,
}: NativeStackScreenProps<ReactNavigation.MainNavigator, GlobalRoutesEnum.SPLASH>) => {
  const { flags } = useConfigSelectors();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) goNextScreen();
    });
  }, [opacity, navigation]);

  const goNextScreen = async () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: flags.hasLaunched ? GlobalRoutesEnum.HOME : GlobalRoutesEnum.WELCOME,
        },
      ],
    });
  };

  return { opacity };
};
