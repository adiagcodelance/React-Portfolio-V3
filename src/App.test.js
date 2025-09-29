import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => {
  // Reset fetch mock before each test
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('Network request failed'))
  );
});

test('renders home page without crashing', () => {
  render(
    <MemoryRouter initialEntries={['/']}>  
      <App />
    </MemoryRouter>
  );
  
  // Check that the App component renders without throwing an error
  const appElement = document.querySelector('.App');
  expect(appElement).toBeInTheDocument();
});

test('renders admin page without crashing', () => {
  render(
    <MemoryRouter initialEntries={['/admin']}>  
      <App />
    </MemoryRouter>
  );
  
  // Check that the admin route loads
  const appElement = document.querySelector('.App');
  expect(appElement).toBeInTheDocument();
});

test('handles undefined routes gracefully', () => {
  render(
    <MemoryRouter initialEntries={['/nonexistent']}>  
      <App />
    </MemoryRouter>
  );
  
  // App should still render even for non-existent routes
  const appElement = document.querySelector('.App');
  expect(appElement).toBeInTheDocument();
});
