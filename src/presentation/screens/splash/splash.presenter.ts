import type { ScreenProps } from '@core/infrastructure/navigation/navigation.types';
import { useConfigSelectors } from '@core/infrastructure/storage/modules/config';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';

export const useSplashPresenter = ({ navigation }: ScreenProps<GlobalRoutesEnum.SPLASH>) => {
  const { flags } = useConfigSelectors();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    });
    animation.start(goNextScreen);
    return () => animation.stop();
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
