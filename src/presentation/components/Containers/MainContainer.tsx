import { Header } from '@components/index';
import styled from 'styled-components/native';

type MainContainerProps = React.PropsWithChildren & {};

export const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #0f0f0f;
`;

const InnerContainer = styled.View`
  flex: 1;
`;
