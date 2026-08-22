import {
  OVERVIEW_HEADER_SUBTITLE_CLASS,
  OVERVIEW_HEADER_TITLE_CLASS,
} from './overviewData';

const OverviewHeader = ({ title, subtitle }) => (
  <header className="flex flex-col gap-2">
    <h1 className={OVERVIEW_HEADER_TITLE_CLASS}>{title}</h1>
    <p className={OVERVIEW_HEADER_SUBTITLE_CLASS}>{subtitle}</p>
  </header>
);

export default OverviewHeader;
