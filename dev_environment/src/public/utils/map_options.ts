import { Option } from "../types";

/**
 * The function `mapOptions` takes an object or array of values and returns an array of options with string labels.
 * @param {{ [s: string]: T }} object - an object with string keys and values of type `T`.
 * @returns an array of objects with a `label` property, where the value of the `label` property is the string
 * representation of each value in the input object or array.
 */
export function mapOptions<T>(object: { [s: string]: T }): Option<T>[] {
  return Object.values(object).map((value) => ({
    label: value,
  }));
}
