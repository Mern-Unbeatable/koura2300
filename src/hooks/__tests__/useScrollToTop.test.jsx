import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import useScrollToTop from '../useScrollToTop';

const ScrollProbe = () => {
  useScrollToTop();
  return null;
};

const renderAtRoute = (entry) =>
  render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route path="/" element={<ScrollProbe />} />
        <Route path="/blog/:slug" element={<ScrollProbe />} />
      </Routes>
    </MemoryRouter>,
  );

beforeEach(() => {
  window.scrollTo.mockClear();
});

afterEach(() => {
  cleanup();
});

describe('useScrollToTop', () => {
  it('scrolls to the top of the page when a route is entered', () => {
    renderAtRoute('/blog/plumbing');

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('scrolls to the top again when navigating to a different article', () => {
    const { unmount } = renderAtRoute('/blog/plumbing');
    unmount();
    window.scrollTo.mockClear();

    renderAtRoute('/blog/winter');

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('leaves the scroll position untouched when the URL targets an anchor', () => {
    renderAtRoute('/#categories');

    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
