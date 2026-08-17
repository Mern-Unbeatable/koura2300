import React, { memo } from 'react';
import ArticleCard from '../home/ArticleCard';
import { BLOG_CONTENT } from './blogContent';

const { popularPosts } = BLOG_CONTENT;

const PopularPosts = memo(({ posts }) => (
  <aside aria-label={popularPosts.title}>
    <h2 className="text-sm uppercase tracking-wider text-brand-muted">
      {popularPosts.title}
    </h2>
    <div className="mt-5 flex flex-col gap-7">
      {posts.map((post) => (
        <ArticleCard key={post.id} article={post} />
      ))}
    </div>
  </aside>
));

PopularPosts.displayName = 'PopularPosts';

export default PopularPosts;
