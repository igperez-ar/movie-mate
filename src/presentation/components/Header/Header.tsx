import { navigate, reset } from '@core/infrastructure/navigation/root-navigation';
import { TouchableOpacity } from 'react-native';
import { GlobalRoutesEnum, MovieRoutesEnum } from 'src/shared/enums/routes';
import styled from 'styled-components/native';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <TouchableOpacity
        onPress={() => reset({ routes: [{ name: GlobalRoutesEnum.HOME }], index: 0 })}
      >
        <Logo>MOVIEAPP</Logo>
      </TouchableOpacity>
      <HeaderDivider />
      <TouchableOpacity
        onPress={() => navigate(MovieRoutesEnum.STACK, { screen: MovieRoutesEnum.WATCHLIST })}
      >
        <HeaderTitle>Watchlist</HeaderTitle>
      </TouchableOpacity>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px 16px;
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
