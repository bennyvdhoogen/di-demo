import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText, debug, getByTestId } = render(<App />);
  expect(getByTestId('main-container')).toBeInTheDocument();
});
