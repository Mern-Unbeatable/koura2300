import {
  OVERVIEW_CARD_CLASS,
  OVERVIEW_CARD_TITLE_CLASS,
  OVERVIEW_VIEW_ALL_CLASS,
} from './overviewData';

const OverviewPanelCard = ({ title, subtitle, actionLabel, onAction, children }) => (
  <section className={OVERVIEW_CARD_CLASS} aria-label={title} role="region">
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div className="flex flex-col gap-1">
        <h2 className={OVERVIEW_CARD_TITLE_CLASS}>{title}</h2>
        {subtitle ? <p className="text-sm leading-5 text-[#6b7280]">{subtitle}</p> : null}
      </div>
      {actionLabel && onAction ? (
        <button type="button" className={OVERVIEW_VIEW_ALL_CLASS} onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
    {children}
  </section>
);

export default OverviewPanelCard;
