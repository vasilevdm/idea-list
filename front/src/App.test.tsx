import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders header, footer, idea list', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/ideas/i)).toBeInTheDocument();
  expect(getByText(/idea-list app/i)).toBeInTheDocument();
  expect(getByText(/prev/i)).toBeInTheDocument();
  expect(getByText(/next/i)).toBeInTheDocument();
});
