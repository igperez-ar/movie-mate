import { Icon } from '@components/index';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { MovieRoutesEnum } from 'src/shared/enums/routes';
import styled from 'styled-components/native';

export const Header: React.FC = () => {
  const nav = useNavigation();
  const currentRoute = useRoute().name;

  return (
    <HeaderContainer>
      <View>
        {nav.canGoBack() && (
          <TouchableOpacity onPress={nav.goBack}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
        )}
      </View>
      <Title>MovieMate</Title>
      <View>
        {currentRoute !== MovieRoutesEnum.WATCHLIST && (
          <TouchableOpacity
            onPress={() =>
              nav.navigate(MovieRoutesEnum.STACK, { screen: MovieRoutesEnum.WATCHLIST })
            }
          >
            <Icon name="ticket" size={24} />
          </TouchableOpacity>
        )}
      </View>
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
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: Bukhari Script;
  font-size: 20px;
`;
