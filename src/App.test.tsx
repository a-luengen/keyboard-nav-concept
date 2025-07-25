import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders keyboard navigation concept title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Keyboard Navigation Concept/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders counter section', () => {
  render(<App />);
  const counterTitle = screen.getByText(/MobX State Management Demo/i);
  expect(counterTitle).toBeInTheDocument();
});

test('renders keyboard navigation demo', () => {
  render(<App />);
  const navTitle = screen.getByText(/Keyboard Navigation Demo/i);
  expect(navTitle).toBeInTheDocument();
});
