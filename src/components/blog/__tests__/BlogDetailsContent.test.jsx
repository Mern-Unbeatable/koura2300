import React from 'react';
import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogDetailsContent from '../BlogDetailsContent';

const renderBlogDetails = (slug = 'plumbing') =>
  render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogDetailsContent />} />
      </Routes>
    </MemoryRouter>,
  );

afterEach(() => {
  cleanup();
});

describe('Blog details page', () => {
  it('renders the article headline as the single page heading', () => {
    renderBlogDetails();

    expect(
      screen.getByRole('heading', { level: 1, name: '5 Signs Your Home Needs a Plumbing Repair' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('renders author, publication date, and read time in the meta line', () => {
    renderBlogDetails();

    expect(screen.getByText('Jordan Mirchev')).toBeInTheDocument();
    expect(screen.getByText('November 14, 2022')).toBeInTheDocument();
    expect(screen.getByText('2 min read')).toBeInTheDocument();
  });

  it('exposes the publication date as a machine-readable time element', () => {
    renderBlogDetails();

    expect(screen.getByText('November 14, 2022').tagName).toBe('TIME');
    expect(screen.getByText('November 14, 2022')).toHaveAttribute('datetime', '2022-11-14');
  });

  it('uses the article card image as the main feature image', () => {
    renderBlogDetails();

    const featureImage = screen.getByRole('img', {
      name: 'A plumber working beneath a kitchen sink',
    });

    expect(featureImage).toHaveAttribute('src', '/assets/landing/article-plumbing.png');
    expect(featureImage).toHaveAttribute('width');
    expect(featureImage).toHaveAttribute('height');
    expect(featureImage).toHaveAttribute('fetchpriority', 'high');
  });

  it('shows a different card image when another article is opened', () => {
    renderBlogDetails('winter');

    expect(
      screen.getByRole('img', { name: 'A professional inspecting a home heating system' }),
    ).toHaveAttribute('src', '/assets/landing/article-winter.png');
  });

  it('renders the full long-form article body', () => {
    renderBlogDetails();

    expect(
      screen.getByText(/Plumbing problems often start small, but ignoring the early warning signs/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Your plumbing system plays an important role in keeping your home/i),
    ).toBeInTheDocument();
  });

  it('lists popular posts as links to their dynamic article routes', () => {
    renderBlogDetails();

    const popularPosts = screen.getByRole('complementary', { name: 'Popular Posts' });
    const electricianLink = within(popularPosts).getByRole('link', {
      name: /When Should You Call a Professional Electrician/i,
    });

    expect(electricianLink).toHaveAttribute('href', '/blog/electrician');
  });

  it('excludes the current article from the popular posts sidebar', () => {
    renderBlogDetails();

    const popularPosts = screen.getByRole('complementary', { name: 'Popular Posts' });

    expect(
      within(popularPosts).queryByText('5 Signs Your Home Needs a Plumbing Repair'),
    ).not.toBeInTheDocument();
  });

  it('renders a different article when the route slug changes', () => {
    renderBlogDetails('winter');

    expect(
      screen.getByRole('heading', { level: 1, name: 'How to Prepare Your Home for Winter' }),
    ).toBeInTheDocument();
  });

  it('renders a not-found state for an unknown article slug', () => {
    renderBlogDetails('missing-post');

    expect(screen.getByRole('heading', { name: 'Article not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
  });

  it('does not render any language switcher on the page', () => {
    renderBlogDetails();

    expect(screen.queryByRole('button', { name: /polski/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /english/i })).not.toBeInTheDocument();
  });
});
