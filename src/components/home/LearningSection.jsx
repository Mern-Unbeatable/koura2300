import React, { memo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useGsapReveal from '../../hooks/useGsapReveal';
import usePagination from '../../hooks/usePagination';
import ArticleCard from './ArticleCard';
import { LANDING_CONTENT } from './landingContent';
import { ARTICLE_ITEMS } from './landingData';

const ARTICLES_PER_PAGE = 6;
const ARROW_ICON_SIZE = 14;
const ARTICLE_SELECTOR = '[data-article-card]';
const NAVIGATION_BUTTON_CLASS =
  'flex size-7 cursor-pointer items-center justify-center rounded-full border border-brand-orange text-brand-orange transition-all duration-200 hover:scale-110 hover:bg-brand-orange hover:text-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100';

const LearningSection = memo(() => {
  const {
    visibleItems,
    pageIndex,
    direction,
    canShowPrevious,
    canShowNext,
    showPreviousPage,
    showNextPage,
  } = usePagination(ARTICLE_ITEMS, ARTICLES_PER_PAGE);

  const gridRef = useGsapReveal({
    selector: ARTICLE_SELECTOR,
    trigger: pageIndex,
    direction,
  });

  return (
    <section id="learning" className="scroll-mt-32 pb-16 sm:pb-22 lg:pb-28">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h2 className="text-3xl font-semibold uppercase text-brand-ink sm:text-4xl">
            {LANDING_CONTENT.learn.title}
          </h2>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={showPreviousPage}
              disabled={!canShowPrevious}
              aria-label={LANDING_CONTENT.learn.previousLabel}
              className={NAVIGATION_BUTTON_CLASS}
            >
              <ArrowLeft size={ARROW_ICON_SIZE} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNextPage}
              disabled={!canShowNext}
              aria-label={LANDING_CONTENT.learn.nextLabel}
              className={NAVIGATION_BUTTON_CLASS}
            >
              <ArrowRight size={ARROW_ICON_SIZE} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div ref={gridRef} className="mt-8 grid items-start gap-x-10 gap-y-8 lg:grid-cols-3">
          {visibleItems.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
});

LearningSection.displayName = 'LearningSection';

export default LearningSection;
