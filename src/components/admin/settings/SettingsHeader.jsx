import { memo } from 'react';
import { SETTINGS_COPY } from './settingsCopy';
import { SETTINGS_HEADER_SUBTITLE_CLASS, SETTINGS_HEADER_TITLE_CLASS } from './settingsData';

const SettingsHeader = memo(({ copy = SETTINGS_COPY }) => (
  <header className="flex w-full min-w-0 flex-col gap-2">
    <h1 className={SETTINGS_HEADER_TITLE_CLASS}>{copy.title}</h1>
    <div className={SETTINGS_HEADER_SUBTITLE_CLASS}>
      <p className="leading-[1.5]">{copy.subtitleLineOne}</p>
      <p className="leading-[1.5]">{copy.subtitleLineTwo}</p>
    </div>
  </header>
));

SettingsHeader.displayName = 'SettingsHeader';

export default SettingsHeader;
