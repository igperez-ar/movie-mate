import type { AppState } from '@core/infrastructure';

declare global {
  type RootState = AppState;
}
