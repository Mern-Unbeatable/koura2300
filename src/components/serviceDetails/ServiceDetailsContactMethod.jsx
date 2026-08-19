import React, { memo, useCallback } from 'react';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import useGsapMountEnter from '../../hooks/useGsapMountEnter';
import { SERVICE_DETAILS_CONTENT } from './serviceDetailsCopy';
import {
  MOUNT_ENTER_DURATION,
  MOUNT_ENTER_OFFSET,
  CONTACT_METHOD_HEADER_MAX_WIDTH_CLASS,
  CONTACT_METHOD_ICON_SIZE,
  CONTACT_METHOD_ICON_WRAP_CLASS,
  CONTACT_METHOD_IDS,
  CONTACT_METHOD_OPTION_PADDING_CLASS,
  CONTACT_METHOD_OPTIONS_MAX_WIDTH_CLASS,
  CONTACT_METHOD_SECTION_SHADOW_CLASS,
  CONTACT_METHODS,
} from './serviceDetailsData';

const { contactMethod } = SERVICE_DETAILS_CONTENT;

const CONTACT_METHOD_OPTIONS = [
  { id: CONTACT_METHODS.PHONE, label: contactMethod.phone, Icon: Phone },
  { id: CONTACT_METHODS.EMAIL, label: contactMethod.email, Icon: Mail },
  { id: CONTACT_METHODS.CHAT, label: contactMethod.chat, Icon: MessageSquare },
];

const SECTION_CLASS = `min-w-0 rounded-xl bg-white px-4 py-10 ${CONTACT_METHOD_SECTION_SHADOW_CLASS} sm:px-8`;
const OPTIONS_GRID_CLASS = `mx-auto mt-8 grid w-full gap-5 sm:grid-cols-3 ${CONTACT_METHOD_OPTIONS_MAX_WIDTH_CLASS}`;
const OPTION_CARD_BASE = `flex w-full min-w-0 cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 ${CONTACT_METHOD_OPTION_PADDING_CLASS} transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange`;

const OPTION_APPEARANCE = {
  true: {
    card: `${OPTION_CARD_BASE} border-brand-orange bg-brand-orange-light`,
    iconWrap: `${CONTACT_METHOD_ICON_WRAP_CLASS} bg-brand-orange text-white`,
    label: 'text-sm font-semibold text-brand-orange',
  },
  false: {
    card: `${OPTION_CARD_BASE} border-gray-200 bg-white`,
    iconWrap: `${CONTACT_METHOD_ICON_WRAP_CLASS} bg-gray-100 text-gray-500`,
    label: 'text-sm font-semibold text-gray-600',
  },
};

const ContactMethodOption = memo(({ option, isSelected, onSelect }) => {
  const appearance = OPTION_APPEARANCE[String(isSelected)];
  const OptionIcon = option.Icon;

  const handleSelect = useCallback(() => {
    onSelect(option.id);
  }, [onSelect, option.id]);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={handleSelect}
      className={appearance.card}
    >
      <span className={appearance.iconWrap} aria-hidden="true">
        <OptionIcon size={CONTACT_METHOD_ICON_SIZE} />
      </span>
      <span className={appearance.label}>{option.label}</span>
    </button>
  );
});

ContactMethodOption.displayName = 'ContactMethodOption';

const ServiceDetailsContactMethod = memo(({ selectedContactMethod, onSelectContactMethod }) => {
  const enterRef = useGsapMountEnter({
    y: MOUNT_ENTER_OFFSET,
    duration: MOUNT_ENTER_DURATION,
  });

  return (
    <div ref={enterRef} className="min-w-0 pt-6">
      <section className={SECTION_CLASS} aria-labelledby={CONTACT_METHOD_IDS.TITLE}>
        <div
          className={`mx-auto flex flex-col items-center gap-2 text-center ${CONTACT_METHOD_HEADER_MAX_WIDTH_CLASS}`}
        >
          <h2 id={CONTACT_METHOD_IDS.TITLE} className="text-xl font-bold text-brand-blue">
            {contactMethod.title}
          </h2>
          <p className="text-sm text-gray-500">{contactMethod.description}</p>
        </div>
        <div
          role="radiogroup"
          aria-label={contactMethod.groupLabel}
          className={OPTIONS_GRID_CLASS}
        >
          {CONTACT_METHOD_OPTIONS.map((option) => (
            <ContactMethodOption
              key={option.id}
              option={option}
              isSelected={option.id === selectedContactMethod}
              onSelect={onSelectContactMethod}
            />
          ))}
        </div>
      </section>
    </div>
  );
});

ServiceDetailsContactMethod.displayName = 'ServiceDetailsContactMethod';

export default ServiceDetailsContactMethod;
