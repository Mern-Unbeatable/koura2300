import React, { memo } from 'react';
import { LANDING_CONTENT } from './landingContent';

const ARTICLE_IMAGE_WIDTH = 170;
const ARTICLE_IMAGE_HEIGHT = 200;

const ArticleCard = memo(({ article }) => (
  <article data-article-card className="flex min-w-0 gap-4">
    <img
      src={article.image}
      alt={article.imageAlt}
      width={ARTICLE_IMAGE_WIDTH}
      height={ARTICLE_IMAGE_HEIGHT}
      loading="lazy"
      className="h-full min-h-40 w-30 shrink-0 rounded object-cover sm:w-36"
    />
    <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
      <div>
        <h3 className="text-base leading-6 text-brand-ink sm:text-lg">{article.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-5 text-brand-ink/70">{article.body}</p>
      </div>
      <p className="mt-4 text-xs text-brand-ink">{LANDING_CONTENT.learn.readingMeta}</p>
    </div>
  </article>
));

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
