import React, { memo } from 'react';
import formatBlogDate from '../../utils/formatBlogDate';
import { BLOG_CONTENT } from './blogContent';

const { meta } = BLOG_CONTENT;

const BlogMeta = memo(({ author, publishedAt, readMinutes }) => (
  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-brand-blue">
    <span>{meta.by}</span>
    <span>{author}</span>
    <span aria-hidden="true">{meta.divider}</span>
    <span>{meta.publishedOn}</span>
    <time dateTime={publishedAt}>{formatBlogDate(publishedAt)}</time>
    <span aria-hidden="true">{meta.divider}</span>
    <span>{`${readMinutes} ${meta.readTimeUnit}`}</span>
  </div>
));

BlogMeta.displayName = 'BlogMeta';

export default BlogMeta;
