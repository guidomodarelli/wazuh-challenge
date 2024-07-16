export type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialRecordMock<T> = Partial<
  {
    [K in keyof T]: T[K] extends Function
      ? jest.Mock
      : T[K] extends {}
      ? PartialRecordMock<T[K]>
      : T[K];
  }
>;
