import App from 'src/components/App';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

test('renders learn React and Typescript link', () => {
  render(<App />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/Hello Home/i);

  expect(linkElement).toBeInTheDocument();
});
