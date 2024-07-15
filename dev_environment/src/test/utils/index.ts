import { screen } from '@testing-library/react';

export const getByTestSubj = (id: string) => {
  return screen.getByLabelText((content, element) => {
    return element?.getAttribute('data-test-subj') === id;
  });
};
