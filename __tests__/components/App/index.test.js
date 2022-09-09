import App from 'src/components/App';
import { render, screen } from '@testing-library/react';

test('renders learn React and Typescript link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello World/i);

  expect(linkElement).toBeInTheDocument();
});
