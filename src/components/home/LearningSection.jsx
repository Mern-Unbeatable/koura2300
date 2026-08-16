import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ArticleCard from './ArticleCard';
import { ARTICLE_ITEMS } from './landingData';

const LearningSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section id="learning" className="pb-16 sm:pb-22 lg:pb-28">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-brand-ink pb-3">
          <h2 className="text-3xl font-semibold uppercase text-brand-ink sm:text-4xl">
            {t('landing.learn.title')}
          </h2>
          <div className="flex gap-3" aria-hidden="true">
            <span className="flex size-7 items-center justify-center rounded-full border border-brand-orange text-brand-orange">
              <ArrowLeft size={14} />
            </span>
            <span className="flex size-7 items-center justify-center rounded-full border border-brand-orange text-brand-orange">
              <ArrowRight size={14} />
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-x-10 gap-y-8 lg:grid-cols-3">
          {ARTICLE_ITEMS.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
});

LearningSection.displayName = 'LearningSection';

export default LearningSection;
