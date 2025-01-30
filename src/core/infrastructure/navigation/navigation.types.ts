import type { CompositeScreenProps, ParamListBase } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootParamList } from './root-navigation';

export type ScreenProps<T extends keyof RootParamList> = NativeStackScreenProps<RootParamList, T>;

export type NestedScreenProps<
  T extends string & keyof NestedParamList,
  K extends keyof RootParamList,
  NestedParamList extends ParamListBase = Extract<RootParamList[K], ParamListBase>,
> = CompositeScreenProps<
  NativeStackScreenProps<NestedParamList, T>,
  NativeStackScreenProps<RootParamList, K>
>;
