import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';
import { BLOG_CONTENT } from './blogContent';

const { notFound } = BLOG_CONTENT;

const BlogNotFound = memo(() => (
  <main className="mx-auto flex min-h-96 max-w-screen-2xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
    <h1 className="text-4xl font-semibold text-brand-blue">{notFound.title}</h1>
    <p className="mt-4 text-brand-muted">{notFound.body}</p>
    <Link
      to={ROUTES.HOME}
      className="mt-7 rounded-md bg-brand-orange px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-orange-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
    >
      {notFound.backLabel}
    </Link>
  </main>
));

BlogNotFound.displayName = 'BlogNotFound';

export default BlogNotFound;
