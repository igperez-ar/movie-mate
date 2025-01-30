import React from 'react';
import { StoreProvider } from 'src/presentation/providers/StoreProvider';
import { ThemeProvider } from 'styled-components/native';
import { MainNavigation } from '../core/infrastructure/navigation/MainNavigation';
import { theme } from './theme/theme';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <MainNavigation />
      </StoreProvider>
    </ThemeProvider>
  );
};
