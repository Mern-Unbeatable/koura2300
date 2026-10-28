import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../../config';
import authReducer from '../../../store/slices/authSlice';
import cartReducer from '../../../store/slices/cartSlice';
import ServiceReviewsContent from '../ServiceReviewsContent';
import { SERVICE_REVIEWS_CONTENT } from '../serviceReviewsCopy';

const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
    },
  });

const renderReviewsPage = (serviceId = 'lighting-1') => {
  const path = `/service/${serviceId}/reviews`;

  render(
    <Provider store={createTestStore()}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={ROUTES.SERVICE_REVIEWS} element={<ServiceReviewsContent />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe('ServiceReviewsContent', () => {
  it('renders landing chrome and customer feedback heading', () => {
    renderReviewsPage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: SERVICE_REVIEWS_CONTENT.heading }),
    ).toBeInTheDocument();
  });

  it('renders the rating summary and breakdown rows from Figma', () => {
    renderReviewsPage();

    expect(screen.getByText('4.7')).toBeInTheDocument();
    expect(screen.getByText(/Customer Rating/i)).toBeInTheDocument();
    expect(screen.getByText('(934,516)')).toBeInTheDocument();
    expect(screen.getByText('63%')).toBeInTheDocument();
    expect(screen.getByText('(94,532)')).toBeInTheDocument();
    expect(screen.getByText('24%')).toBeInTheDocument();
    expect(screen.getByText('(6,717)')).toBeInTheDocument();
  });

  it('renders customer feedback entries with names and bodies', () => {
    renderReviewsPage();

    expect(screen.getByText('Darrell Steward')).toBeInTheDocument();
    expect(screen.getByText('Brooklyn Simmons')).toBeInTheDocument();
    expect(screen.getByText('Kathryn Murphy')).toBeInTheDocument();
    expect(
      screen.getByText(/The quality of this cement is outstanding/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/The texture is fine and easy to mix/i)).toBeInTheDocument();
  });

  it('shows a back link to the matching service details route', () => {
    renderReviewsPage('lighting-1');

    const backLink = screen.getByRole('link', { name: SERVICE_REVIEWS_CONTENT.actions.back });
    expect(backLink).toHaveAttribute('href', expect.stringContaining('/service/lighting-1'));
  });

  it('exposes an accessible rating summary region', () => {
    renderReviewsPage();

    const summary = screen.getByRole('region', { name: /customer rating/i });
    expect(within(summary).getByText('4.7')).toBeInTheDocument();
  });
});
