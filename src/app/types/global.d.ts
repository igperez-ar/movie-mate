import type { RootState as StateType } from '@core/infrastructure';

declare global {
  type RootState = StateType;
}