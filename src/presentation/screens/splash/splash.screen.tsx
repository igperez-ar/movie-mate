import type { ScreenProps } from '@core/infrastructure/navigation/navigation.types';
import { LogoTMDB } from 'assets/images';
import React from 'react';
import { Animated } from 'react-native';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';
import styled from 'styled-components/native';
import { useSplashPresenter } from './splash.presenter';

export const SplashScreen: React.FC<ScreenProps<GlobalRoutesEnum.SPLASH>> = (props) => {
  const { opacity } = useSplashPresenter(props);

  return (
    <SafeContainer>
      <BackgroundContainer opacity={opacity}>
        <Title>MovieMate</Title>
        <FooterContainer>
          <Credits>Powered by</Credits>
          <Logo source={LogoTMDB} resizeMode="contain" />
        </FooterContainer>
      </BackgroundContainer>
    </SafeContainer>
  );
};

const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

type BackgroundContainerProps = {
  opacity: Animated.Value;
};
const BackgroundContainer = styled(Animated.View).attrs<BackgroundContainerProps>(
  ({ opacity }) => ({
    style: { opacity },
  }),
)<BackgroundContainerProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: Bukhari Script;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`;

const FooterContainer = styled.View`
  position: absolute;
  bottom: 0px;
`;

const Credits = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: Nunito;
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacing['md-plus']}px;
  text-align: center;
`;

const Logo = styled.Image`
  height: 30px;
`;
