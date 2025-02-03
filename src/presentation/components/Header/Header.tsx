import Icon from '@react-native-vector-icons/material-design-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { MovieRoutesEnum } from 'src/shared/enums/routes';
import { scale } from 'src/shared/utils/sizes';
import styled from 'styled-components/native';

export const Header: React.FC = () => {
  const nav = useNavigation();
  const currentRoute = useRoute().name;

  return (
    <HeaderContainer>
      <View>
        {nav.canGoBack() && (
          <TouchableOpacity onPress={nav.goBack}>
            <Icon name="arrow-left" color="white" size={scale(24)} />
          </TouchableOpacity>
        )}
      </View>
      <View>
        {currentRoute !== MovieRoutesEnum.WATCHLIST && (
          <TouchableOpacity
            onPress={() =>
              nav.navigate(MovieRoutesEnum.STACK, { screen: MovieRoutesEnum.WATCHLIST })
            }
          >
            <Icon name="ticket" color="white" size={scale(24)} />
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
  background-color: #1a1a1a;
`;
