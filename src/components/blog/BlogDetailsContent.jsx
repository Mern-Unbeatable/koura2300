import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import BlogMeta from './BlogMeta';
import BlogNotFound from './BlogNotFound';
import PopularPosts from './PopularPosts';
import { BLOG_CONTENT } from './blogContent';
import { BLOG_FEATURE_IMAGE_SIZE, getBlogPost, getPopularBlogPosts } from './blogData';

const { notFound, seo } = BLOG_CONTENT;

const buildSeoTitle = (headline) => `${headline} | ${seo.titleSuffix}`;

const BlogDetailsContent = memo(() => {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  useSEO({
    title: buildSeoTitle(post?.title ?? notFound.title),
    description: post?.summary ?? notFound.body,
    keywords: seo.keywords,
  });

  if (!post) {
    return <BlogNotFound />;
  }

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <header className="max-w-4xl">
        <h1 className="text-3xl font-medium leading-tight text-brand-ink sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <div className="mt-8 lg:mt-12">
          <BlogMeta
            author={post.author}
            publishedAt={post.publishedAt}
            readMinutes={post.readMinutes}
          />
        </div>
      </header>

      <img
        src={post.featureImage}
        alt={post.featureImageAlt}
        width={BLOG_FEATURE_IMAGE_SIZE.width}
        height={BLOG_FEATURE_IMAGE_SIZE.height}
        fetchPriority="high"
        className="mt-8 aspect-video w-full rounded object-cover sm:mt-10 lg:mt-12 lg:aspect-2/1"
      />

      <div className="mt-10 grid items-start gap-12 lg:grid-cols-3 lg:gap-16">
        <article className="max-w-4xl space-y-6 text-base leading-relaxed text-brand-ink lg:col-span-2 lg:space-y-8 lg:text-xl">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <PopularPosts posts={getPopularBlogPosts(slug)} />
      </div>
    </main>
  );
});

BlogDetailsContent.displayName = 'BlogDetailsContent';

export default BlogDetailsContent;
