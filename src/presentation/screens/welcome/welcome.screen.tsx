import { GradientContainer } from '@components/index';
import type { ScreenProps } from '@core/infrastructure/navigation/navigation.types';
import { MoviesCollage } from 'assets/images';
import React from 'react';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';
import styled from 'styled-components/native';
import { useWelcomePresenter } from './welcome.presenter';
import LinearGradient from 'react-native-linear-gradient';
import { createTypographyStyles } from 'src/shared/utils/typography';

export const WelcomeScreen: React.FC<ScreenProps<GlobalRoutesEnum.WELCOME>> = (props) => {
  const { handleButtonPress } = useWelcomePresenter(props);

  return (
    <BackgroundContainer source={MoviesCollage}>
      <OpacityContainer colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.9)']}>
        <SafeContainer>
          <Title>Welcome{'\n'}to MovieMate</Title>
          <Subtitle>Discover your next history</Subtitle>
          <Description>
            Explore the world of cinema with personalized{'\n'}recommendations, lists and more.
          </Description>
          <ButtonContainer onPress={handleButtonPress}>
            <GradientContainer
              colors={['#845ec2', '#d65db1', '#ff6f91', '#ff9671', '#ffc75f', '#f9f871']}
            >
              <ButtonText>Get started</ButtonText>
            </GradientContainer>
          </ButtonContainer>
        </SafeContainer>
      </OpacityContainer>
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.ImageBackground`
  flex: 1;
`;

const OpacityContainer = styled(LinearGradient)`
  flex: 1;
`;

const SafeContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing['lg-plus']}px;
  margin-bottom: ${({ theme }) => theme.spacing['6xl']}px;
`;

const Title = styled.Text`
  ${({ theme }) => createTypographyStyles(theme.typography.logo)}
  font-size: 36px;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['6xl']}px;
`;

const Subtitle = styled.Text`
  ${({ theme }) => createTypographyStyles(theme.typography.h2)}
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['md-plus']}px;
`;

const Description = styled.Text`
  ${({ theme }) => createTypographyStyles(theme.typography.caption)}
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']}px;
`;

const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: ${({ theme }) => `${theme.spacing['md-plus']}px ${theme.spacing['5xl']}px`};
  border-radius: 25px;
`;

const ButtonText = styled.Text`
  ${({ theme }) => createTypographyStyles(theme.typography.button)}
`;
