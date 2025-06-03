import '@testing-library/jest-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { render as rtlRender } from '@testing-library/react';
import { getConfig, mergeConfig } from '@edx/frontend-platform';
import { configure as configureI18n, IntlProvider } from '@edx/frontend-platform/i18n';
import { configure as configureLogging } from '@edx/frontend-platform/logging';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

mergeConfig({
  ...process.env,
});

jest.mock('@src/generic/messages', () => jest.fn(() => { }), { virtual: true });

/* eslint-disable no-console */
const supressWarningBlock = (callback) => {
  const originalConsoleWarning = console.warn;
  console.warn = jest.fn();
  callback();
  console.warn = originalConsoleWarning;
};
/* eslint-enable no-console */

class MockLoggingService {
  // eslint-disable-next-line no-console
  logInfo = jest.fn(infoString => console.log(infoString));

  // eslint-disable-next-line no-console
  logError = jest.fn(errorString => console.log(errorString));
}

export const initializeIntl = () => {
  const loggingService = configureLogging(MockLoggingService, {
    config: getConfig(),
  });

  // i18n doesn't have a service class to return.
  // ignore missing/unexpect locale warnings from @edx/frontend-platform/i18n
  // it is unnecessary and not relevant to the tests
  supressWarningBlock(() => configureI18n({
    config: getConfig(),
    loggingService,
    messages: [],
  }));
};

function render(
  ui,
  {
    ...renderOptions
  } = {},
) {
  const Wrapper = ({ children }) => (
    // eslint-disable-next-line react/jsx-filename-extension
    <IntlProvider locale="en">
      {children}
    </IntlProvider>
  );

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export default render;
