import { AppTheme } from 'src/app/theme/theme';
import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}
