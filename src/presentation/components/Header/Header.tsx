import { goBack, navigate, reset } from '@core/infrastructure/navigation/root-navigation';
import Icon from '@react-native-vector-icons/material-design-icons';
import { TouchableOpacity } from 'react-native';
import { GlobalRoutesEnum, MovieRoutesEnum } from 'src/shared/enums/routes';
import { scale } from 'src/shared/utils/sizes';
import styled from 'styled-components/native';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <TouchableOpacity
        onPress={() => goBack()}
      >
        {/* <Logo>MOVIEAPP</Logo> */}
        <Icon name="arrow-left" color="white" size={scale(24)} />
      </TouchableOpacity>
      {/* <HeaderDivider /> */}
      <TouchableOpacity
        onPress={() => navigate(MovieRoutesEnum.STACK, { screen: MovieRoutesEnum.WATCHLIST })}
      >
        <Icon name="ticket" color="white" size={scale(24)} />
        {/* <HeaderTitle>Watchlist</HeaderTitle> */}
      </TouchableOpacity>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing['md-plus']}px ${({ theme }) => theme.spacing['lg']}px;
  background-color: #1a1a1a;
`;

const Logo = styled.Text`
  color: #e50914;
  font-size: 24px;
  font-weight: 700;
`;

const HeaderTitle = styled.Text`
  color: white;
  font-size: 18px;
`;

const HeaderDivider = styled.View`
  height: 24px;
  width: 1px;
  background-color: #404040;
  margin: 0 16px;
`;
