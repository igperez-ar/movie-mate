import { GlobalRoutesEnum } from 'src/shared/enums/routes';
import type { RootState as StateType } from '@core/infrastructure';

declare global {

  type RootState = StateType;

  export namespace ReactNavigation {
    export type MainNavigator = {
      [GlobalRoutesEnum.HOME]: undefined;
      [GlobalRoutesEnum.SPLASH]: undefined;
      [GlobalRoutesEnum.WELCOME]: undefined;
    }
  }
}

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
    ? []
    : T extends Array<any> | string
      ? string[]
      : never;
interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}
