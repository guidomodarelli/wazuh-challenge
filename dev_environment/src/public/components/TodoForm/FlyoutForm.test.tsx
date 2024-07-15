import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import FlyoutForm from './FlyoutForm';
import { I18nProvider } from '@osd/i18n/react';
import { getByTestSubj } from '../../../test/utils';

const onClose = jest.fn();
jest.mock('./TodoForm', () => () => <></>);

describe('FlyoutForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should display a "Create new TODO" title', () => {
    render(
      <I18nProvider>
        <FlyoutForm onClose={onClose} />
      </I18nProvider>
    );

    expect(screen.getByText('Create new TODO')).toBeTruthy();
    expect(screen.getByText('Create')).toBeTruthy();
  });

  it('should display a "Update TODO" title', () => {
    render(
      <I18nProvider>
        <FlyoutForm onClose={onClose} itemIdToUpdate="ksdfsd" />
      </I18nProvider>
    );

    expect(screen.getByText('Update TODO')).toBeTruthy();
    expect(screen.getByText('Update')).toBeTruthy();
  });

  it('ensure `onClose` function is called', () => {
    render(
      <I18nProvider>
        <FlyoutForm onClose={onClose} itemIdToUpdate="ksdfsd" />
      </I18nProvider>
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.click(getByTestSubj('euiFlyoutCloseButton'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
