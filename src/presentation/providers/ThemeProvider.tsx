import type { PropsWithChildren } from 'react';
import { type AppTheme, theme } from 'src/app/theme/theme';
import { ThemeProvider as ThemeProviderSC } from 'styled-components/native';

type ThemeProviderProps = PropsWithChildren<Partial<AppTheme>>;

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...props }) => {
  return (
    <ThemeProviderSC theme={theme} {...props}>
      {children}
    </ThemeProviderSC>
  );
};
