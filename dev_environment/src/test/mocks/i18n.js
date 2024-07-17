import React from 'react';

const injectI18n = Component => props => <Component {...props} />;

const FormattedMessage = ({ id, defaultMessage, values }) => {
  let message = defaultMessage;
  if (values) {
    Object.keys(values).forEach((key) => {
      message = message.replace(`{${key}}`, values[key]);
    });
  }
  return <span>{message}</span>;
};

const I18nProvider = ({ children }) => <>{children}</>;

module.exports = {
  injectI18n,
  FormattedMessage,
  I18nProvider,
  i18n: {
    translate: jest.fn((key, options) => options.defaultMessage || key),
  },
};
