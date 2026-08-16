import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ArticleCard = memo(({ article }) => {
  const { t } = useTranslation();

  return (
    <article className="grid min-w-0 grid-cols-[7.5rem_1fr] gap-4 sm:grid-cols-[9rem_1fr]">
      <img
        src={article.image}
        alt={t(`landing.learn.articles.${article.id}.imageAlt`)}
        width="170"
        height="200"
        loading="lazy"
        className="h-full min-h-40 w-full rounded object-cover"
      />
      <div className="flex min-w-0 flex-col justify-between py-1">
        <div>
          <h3 className="text-base leading-6 text-brand-ink sm:text-lg">{t(article.titleKey)}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-5 text-brand-ink/70">
            {t(article.bodyKey)}
          </p>
        </div>
        <p className="mt-4 text-xs text-brand-ink">{t('landing.learn.readingMeta')}</p>
      </div>
    </article>
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
