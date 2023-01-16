import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Emails Sent Text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Emails Sent/i);
  expect(linkElement).toBeInTheDocument();
});
