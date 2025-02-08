import { StoreProvider, ThemeProvider } from 'src/presentation/providers';
import { MainNavigation } from '@core/infrastructure/navigation/index.router';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <StoreProvider>
        <MainNavigation />
      </StoreProvider>
    </ThemeProvider>
  );
};
