import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { buildBlogDetailsRoute } from '../../config';
import { LANDING_CONTENT } from './landingContent';

const ARTICLE_IMAGE_WIDTH = 170;
const ARTICLE_IMAGE_HEIGHT = 200;

const ArticleCard = memo(({ article }) => (
  <Link
    to={buildBlogDetailsRoute(article.slug ?? article.id)}
    data-article-card
    className="group block min-w-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
  >
    <article className="flex min-w-0 gap-4">
      <img
        src={article.image}
        alt={article.imageAlt}
        width={ARTICLE_IMAGE_WIDTH}
        height={ARTICLE_IMAGE_HEIGHT}
        loading="lazy"
        className="h-40 w-30 shrink-0 rounded object-cover transition-transform duration-300 group-hover:scale-105 sm:h-44 sm:w-36"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
        <div>
          <h3 className="text-base leading-6 text-brand-ink transition-colors group-hover:text-brand-orange sm:text-lg">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-5 text-brand-ink/70">{article.body}</p>
        </div>
        <p className="mt-4 text-xs text-brand-ink">{LANDING_CONTENT.learn.readingMeta}</p>
      </div>
    </article>
  </Link>
));

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
