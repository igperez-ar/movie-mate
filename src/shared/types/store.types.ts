// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;