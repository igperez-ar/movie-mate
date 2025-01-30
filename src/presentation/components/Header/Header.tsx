import styled from 'styled-components/native';

export const Header: React.FC = () => (
  <HeaderContainer>
    <Logo>MOVIEAPP</Logo>
    <HeaderDivider />
    <HeaderTitle>Explore</HeaderTitle>
  </HeaderContainer>
);

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 24px 16px;
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
  margin-left: 16px;
`;

const HeaderDivider = styled.View`
  height: 24px;
  width: 1px;
  background-color: #404040;
  margin-left: 16px;
`;
