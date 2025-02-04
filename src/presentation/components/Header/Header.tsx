import { Icon } from '@components/Icon/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { GlobalRoutesEnum, MovieRoutesEnum } from 'src/shared/enums/routes';
import styled from 'styled-components/native';

export const Header: React.FC = () => {
  const navigation = useNavigation();
  const currentRoute = useRoute().name;

  const goToHome = () => {
    if (currentRoute !== GlobalRoutesEnum.HOME) {
      navigation.reset({ index: 0, routes: [{ name: GlobalRoutesEnum.HOME }] });
    }
  };

  const goToWatchlist = () => {
    navigation.navigate(MovieRoutesEnum.STACK, { screen: MovieRoutesEnum.WATCHLIST });
  };

  return (
    <HeaderContainer>
      <ActionContainer align="flex-start">
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
        )}
      </ActionContainer>
      <TouchableOpacity onPress={goToHome}>
        <Title>MovieMate</Title>
      </TouchableOpacity>
      <ActionContainer align="flex-end">
        {currentRoute !== MovieRoutesEnum.WATCHLIST && (
          <TouchableOpacity onPress={goToWatchlist}>
            <Icon name="ticket" size={24} />
          </TouchableOpacity>
        )}
      </ActionContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing['md-plus']}px ${theme.spacing['lg']}px`};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.Text`
  flex: 1;
  align-self: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: Bukhari Script;
  font-size: 20px;
`;

type AnimationContainerProps = {
  align?: string;
};
const ActionContainer = styled.View<AnimationContainerProps>`
  flex: 1;
  align-items: ${(props) => props.align};
`;
