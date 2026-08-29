import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { buildBlogDetailsRoute } from '../../config';
import { LANDING_CONTENT } from './landingContent';

const ARTICLE_IMAGE_WIDTH = 170;
const ARTICLE_IMAGE_HEIGHT = 200;

const ARTICLE_CARD_LINK_CLASS =
  'group block min-w-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2';

const ARTICLE_CARD_SHELL_CLASS = 'flex min-w-0 gap-4';

const ARTICLE_IMAGE_CLASS =
  'h-40 w-30 shrink-0 rounded object-cover transition-transform duration-300 group-hover:scale-105 sm:h-44 sm:w-36';

const ARTICLE_BODY_CLASS = 'flex min-w-0 flex-1 flex-col justify-between py-1';

const ARTICLE_TITLE_CLASS =
  'text-base leading-6 text-brand-ink transition-colors group-hover:text-brand-orange sm:text-lg';

const ARTICLE_EXCERPT_CLASS = 'mt-2 line-clamp-3 text-sm leading-5 text-brand-ink/70';

const ARTICLE_META_CLASS = 'mt-4 text-xs text-brand-ink';

const ARTICLE_ACTIONS_WRAP_CLASS = 'mt-4';

const ArticleCardContent = memo(({ article, readingMeta, actions }) => (
  <article className={ARTICLE_CARD_SHELL_CLASS}>
    <img
      src={article.image}
      alt={article.imageAlt}
      width={ARTICLE_IMAGE_WIDTH}
      height={ARTICLE_IMAGE_HEIGHT}
      loading="lazy"
      className={ARTICLE_IMAGE_CLASS}
    />
    <div className={ARTICLE_BODY_CLASS}>
      <div>
        <h3 className={ARTICLE_TITLE_CLASS}>{article.title}</h3>
        <p className={ARTICLE_EXCERPT_CLASS}>{article.body}</p>
      </div>
      <div>
        <p className={ARTICLE_META_CLASS}>{readingMeta}</p>
        {actions ? <div className={ARTICLE_ACTIONS_WRAP_CLASS}>{actions}</div> : null}
      </div>
    </div>
  </article>
));

ArticleCardContent.displayName = 'ArticleCardContent';

const ArticleCard = memo(
  ({
    article,
    readingMeta = LANDING_CONTENT.learn.readingMeta,
    actions = null,
    testId,
  }) => {
    if (actions) {
      return (
        <div data-article-card data-testid={testId} className="min-w-0">
          <ArticleCardContent
            article={article}
            readingMeta={readingMeta}
            actions={actions}
          />
        </div>
      );
    }

    return (
      <Link
        to={buildBlogDetailsRoute(article.slug ?? article.id)}
        data-article-card
        data-testid={testId}
        className={ARTICLE_CARD_LINK_CLASS}
      >
        <ArticleCardContent article={article} readingMeta={readingMeta} />
      </Link>
    );
  },
);

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
