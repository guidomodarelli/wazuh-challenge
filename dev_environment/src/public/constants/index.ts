export const MIN_DATE_MESSAGE = (date: Date) =>
  `Date must be greater than or equal to ${date.toLocaleDateString()}`;
export const MUST_BE_GREATER_THAN_OR_EQUAL_TO = (a: string, b: string) =>
  `The ${a} must be greater than or equal to the ${b}`;
