import React from 'react';
import { render } from '@testing-library/react-native';
import { expect } from 'detox';

import App from './App';

test('renders correctly', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('heading')).toHaveText('Welcome');
});
