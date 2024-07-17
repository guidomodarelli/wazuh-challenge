import { screen } from '@testing-library/react';

/**
 * The function getByTestSubj returns an element based on the data-test-subj attribute matching the provided id.
 * @param {string} id - a string that represents the value of the `data-test-subj` attribute that you want to select.
 * @returns an element that has a `data-test-subj` attribute with a value equal to the `id` parameter passed to the
 * function.
 */
export const getByTestSubj = (id: string) => {
  return screen.getByLabelText((content, element) => {
    return element?.getAttribute('data-test-subj') === id;
  });
};
