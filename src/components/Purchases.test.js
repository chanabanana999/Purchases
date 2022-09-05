import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders purchases', () => {
  render(<App />);

  expect(screen.getByTestId("purchases")).toBeInTheDocument();
});
