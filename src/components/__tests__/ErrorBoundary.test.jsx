import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

// Component that intentionally throws — used to trigger the boundary
const ThrowOnMount = ({ message = 'Test crash' }) => {
  throw new Error(message);
};

// Suppress the expected console.error output that React emits for caught errors
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

describe('ErrorBoundary', () => {
  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <p>Safe content</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('shows the fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowOnMount />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(/we apologize/i)).toBeInTheDocument();
  });

  it('shows the Try Again button in the fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowOnMount />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('remounts children when Try Again is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowOnMount />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Replace the permanently failing child, then reset the boundary.
    rerender(
      <ErrorBoundary>
        <p>Recovered content</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(screen.getByText('Recovered content')).toBeInTheDocument();
  });
});
