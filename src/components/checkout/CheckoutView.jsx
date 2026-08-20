import React, { memo } from 'react';
import { Check, Mail, Phone, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';
import useCheckout from '../../hooks/useCheckout';
import {
  CHECKOUT_CARD_CLASS,
  CHECKOUT_CONFIRM_BUTTON_CLASS,
  CHECKOUT_CONFIRM_ICON_SIZE,
  CHECKOUT_CONTACT_ACTIVE,
  CHECKOUT_CONTACT_CHECK_SIZE,
  CHECKOUT_CONTACT_ICON_SIZE,
  CHECKOUT_CONTACT_ICON_WRAP_ACTIVE,
  CHECKOUT_CONTACT_ICON_WRAP_IDLE,
  CHECKOUT_CONTACT_IDLE,
  CHECKOUT_CONTACT_LABEL_ACTIVE,
  CHECKOUT_CONTACT_LABEL_IDLE,
  CHECKOUT_CONTACT_METHODS,
  CHECKOUT_DATE_BUTTON_ACTIVE,
  CHECKOUT_DATE_BUTTON_IDLE,
  CHECKOUT_DATE_DAY_CLASS,
  CHECKOUT_DATE_HEADING_CLASS,
  CHECKOUT_DATE_STRIP_CLASS,
  CHECKOUT_DATE_WEEKDAY_CLASS,
  CHECKOUT_EMPTY_PLACEHOLDER,
  CHECKOUT_INPUT_CLASS,
  CHECKOUT_LAYOUT_CLASS,
  CHECKOUT_NESTED_CARD_CLASS,
  CHECKOUT_PARAGRAPH_CLASS,
  CHECKOUT_PAYMENT_NOTE_BODY_CLASS,
  CHECKOUT_PAYMENT_NOTE_BOX_CLASS,
  CHECKOUT_PAYMENT_NOTE_LABEL_CLASS,
  CHECKOUT_REVIEW_SURFACE_CLASS,
  CHECKOUT_SECTION_TITLE_CLASS,
  CHECKOUT_SUBHEADING_CLASS,
  CHECKOUT_THUMBNAIL_SIZE_CLASS,
  CHECKOUT_TIME_BUTTON_ACTIVE,
  CHECKOUT_TIME_BUTTON_IDLE,
  CHECKOUT_UPLOAD_CLASS,
  CHECKOUT_UPLOAD_ICON_SIZE,
} from './checkoutData';

const Field = memo(({ id, label, value, onChange, placeholder, type = 'text' }) => (
  <div className="flex min-w-0 flex-1 flex-col gap-2">
    <label htmlFor={id} className="text-sm text-[#191c1f]">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={CHECKOUT_INPUT_CLASS}
    />
  </div>
));

Field.displayName = 'Field';

const UploadSection = memo(({ copy }) => (
  <section className={CHECKOUT_NESTED_CARD_CLASS}>
    <h2 className={CHECKOUT_SUBHEADING_CLASS}>{copy.uploadTitle}</h2>
    <p className={CHECKOUT_PARAGRAPH_CLASS}>{copy.uploadDescription}</p>
    <label className={`${CHECKOUT_UPLOAD_CLASS} mt-6`}>
      <Upload
        size={CHECKOUT_UPLOAD_ICON_SIZE}
        aria-hidden="true"
        className="mb-3 text-[#99a1af]"
      />
      <span className="text-base font-semibold leading-6 text-[#6a7282]">{copy.uploadAction}</span>
      <span className="mt-1 text-xs font-medium leading-4 text-[#99a1af]">{copy.uploadTypes}</span>
      <input type="file" className="sr-only" accept="image/jpeg,image/png,video/mp4" multiple />
    </label>
  </section>
));

UploadSection.displayName = 'UploadSection';

const ContactOption = memo(({ icon: Icon, label, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={isActive ? CHECKOUT_CONTACT_ACTIVE : CHECKOUT_CONTACT_IDLE}
  >
    <span className={isActive ? CHECKOUT_CONTACT_ICON_WRAP_ACTIVE : CHECKOUT_CONTACT_ICON_WRAP_IDLE}>
      <Icon size={CHECKOUT_CONTACT_ICON_SIZE} aria-hidden="true" />
    </span>
    <span className={isActive ? CHECKOUT_CONTACT_LABEL_ACTIVE : CHECKOUT_CONTACT_LABEL_IDLE}>
      {label}
    </span>
    {isActive ? (
      <Check size={CHECKOUT_CONTACT_CHECK_SIZE} aria-hidden="true" className="text-[#ff6b1a]" />
    ) : null}
  </button>
));

ContactOption.displayName = 'ContactOption';

const ContactMethodSection = memo(({ copy, contactMethod, onSelect }) => (
  <section className={CHECKOUT_NESTED_CARD_CLASS}>
    <h2 className={CHECKOUT_SUBHEADING_CLASS}>{copy.contactTitle}</h2>
    <p className={CHECKOUT_PARAGRAPH_CLASS}>{copy.contactHint}</p>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      <ContactOption
        icon={Phone}
        label={copy.phoneSms}
        isActive={contactMethod === CHECKOUT_CONTACT_METHODS.PHONE}
        onClick={() => onSelect(CHECKOUT_CONTACT_METHODS.PHONE)}
      />
      <ContactOption
        icon={Mail}
        label={copy.emailContact}
        isActive={contactMethod === CHECKOUT_CONTACT_METHODS.EMAIL}
        onClick={() => onSelect(CHECKOUT_CONTACT_METHODS.EMAIL)}
      />
    </div>
  </section>
));

ContactMethodSection.displayName = 'ContactMethodSection';

const DatePicker = memo(({ copy, dates, selectedDateId, monthYearLabel, onSelect }) => (
  <div>
    <div className="mb-3 flex items-center justify-between gap-4">
      <p className={CHECKOUT_DATE_HEADING_CLASS}>{copy.chooseDate}</p>
      <p className={CHECKOUT_DATE_HEADING_CLASS}>{monthYearLabel}</p>
    </div>
    <div
      role="listbox"
      aria-label={copy.chooseDate}
      className={CHECKOUT_DATE_STRIP_CLASS}
    >
      {dates.map((date) => (
        <button
          key={date.id}
          type="button"
          role="option"
          aria-selected={date.id === selectedDateId}
          onClick={() => onSelect(date.id)}
          className={
            date.id === selectedDateId ? CHECKOUT_DATE_BUTTON_ACTIVE : CHECKOUT_DATE_BUTTON_IDLE
          }
        >
          <span className={CHECKOUT_DATE_WEEKDAY_CLASS}>{date.weekday}</span>
          <span className={CHECKOUT_DATE_DAY_CLASS}>{date.day}</span>
        </button>
      ))}
    </div>
  </div>
));

DatePicker.displayName = 'DatePicker';

const OrderItemRow = memo(({ item, image }) => (
  <div className={`mt-6 flex items-center gap-3 p-3 ${CHECKOUT_REVIEW_SURFACE_CLASS}`}>
    {image.src ? (
      <img
        src={image.src}
        alt={image.alt}
        className={`${CHECKOUT_THUMBNAIL_SIZE_CLASS} shrink-0 rounded-xl object-cover`}
      />
    ) : null}
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold leading-5 text-[#0b1e3d]">{item.title}</p>
    </div>
    <p className="shrink-0 text-base font-bold text-[#0b1e3d]">${item.price}</p>
  </div>
));

OrderItemRow.displayName = 'OrderItemRow';

const PaymentNote = memo(({ label, body }) => (
  <p className={CHECKOUT_PAYMENT_NOTE_BOX_CLASS}>
    <span className={CHECKOUT_PAYMENT_NOTE_LABEL_CLASS}>{label}</span>
    <span className={CHECKOUT_PAYMENT_NOTE_BODY_CLASS}>{body}</span>
  </p>
));

PaymentNote.displayName = 'PaymentNote';

const OrderSummary = memo(({ copy, fields, checkout }) => (
  <aside className={`${CHECKOUT_NESTED_CARD_CLASS} lg:sticky lg:top-28`}>
    <h2 className={CHECKOUT_SUBHEADING_CLASS}>{copy.reviewTitle}</h2>
    {checkout.primaryItem ? (
      <OrderItemRow
        item={checkout.primaryItem}
        image={checkout.primaryItemImage}
      />
    ) : (
      <p className="mt-6 text-sm text-gray-500">{copy.emptyCart}</p>
    )}

    <dl className={`mt-6 space-y-1 p-4 text-sm text-[#364153] ${CHECKOUT_REVIEW_SURFACE_CLASS}`}>
      <div className="flex justify-between gap-3">
        <dt>{copy.nameLabel}</dt>
        <dd className="font-medium">{fields.firstName || CHECKOUT_EMPTY_PLACEHOLDER}</dd>
      </div>
      <div className="flex justify-between gap-3">
        <dt>{copy.addressLabel}</dt>
        <dd className="text-right font-medium">
          {[fields.street, fields.city, fields.zip].filter(Boolean).join(', ') ||
            CHECKOUT_EMPTY_PLACEHOLDER}
        </dd>
      </div>
      <div className="flex justify-between gap-3">
        <dt>{copy.dateTimeLabel}</dt>
        <dd className="text-right font-medium">
          {checkout.selectedDate?.iso} at {checkout.selectedTime}
        </dd>
      </div>
      <div className="flex justify-between gap-3">
        <dt>{copy.contactViaLabel}</dt>
        <dd className="font-medium">{checkout.contactLabel}</dd>
      </div>
    </dl>

    <PaymentNote label={copy.paymentNoteLabel} body={copy.paymentNoteBody} />

    <div className="mt-6 flex items-center justify-between gap-4">
      <Link to={ROUTES.HOME} className="text-sm font-medium hover:text-brand-orange">
        ← {copy.back}
      </Link>
      <button type="submit" className={CHECKOUT_CONFIRM_BUTTON_CLASS}>
        <Check size={CHECKOUT_CONFIRM_ICON_SIZE} aria-hidden="true" />
        {copy.confirmPay}
      </button>
    </div>
  </aside>
));

OrderSummary.displayName = 'OrderSummary';

const CheckoutView = memo(() => {
  const checkout = useCheckout();
  const { copy, fields } = checkout;

  return (
    <main className="mx-auto min-w-0 max-w-screen-2xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <Link
        to={ROUTES.HOME}
        className="mb-6 inline-flex items-center text-sm font-medium text-brand-ink hover:text-brand-orange"
      >
        ← {copy.back}
      </Link>

      <form
        aria-label={copy.formLabel}
        className={CHECKOUT_LAYOUT_CLASS}
        onSubmit={checkout.handleConfirm}
      >
        <div className={`${CHECKOUT_CARD_CLASS} flex flex-col gap-6`}>
          <section className="flex flex-col gap-6">
            <h1 className={CHECKOUT_SECTION_TITLE_CLASS}>{copy.personalTitle}</h1>
            <Field
              id="checkout-first-name"
              label={copy.firstName}
              value={fields.firstName}
              onChange={checkout.handleFieldChange('firstName')}
              placeholder={copy.firstNamePlaceholder}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="checkout-email"
                label={copy.email}
                type="email"
                value={fields.email}
                onChange={checkout.handleFieldChange('email')}
                placeholder={copy.emailPlaceholder}
              />
              <Field
                id="checkout-phone"
                label={copy.phone}
                type="tel"
                value={fields.phone}
                onChange={checkout.handleFieldChange('phone')}
                placeholder={copy.phonePlaceholder}
              />
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className={CHECKOUT_SECTION_TITLE_CLASS}>{copy.addressTitle}</h2>
            <Field
              id="checkout-street"
              label={copy.street}
              value={fields.street}
              onChange={checkout.handleFieldChange('street')}
              placeholder={copy.streetPlaceholder}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="checkout-city"
                label={copy.city}
                value={fields.city}
                onChange={checkout.handleFieldChange('city')}
                placeholder={copy.cityPlaceholder}
              />
              <Field
                id="checkout-zip"
                label={copy.zip}
                value={fields.zip}
                onChange={checkout.handleFieldChange('zip')}
                placeholder={copy.zipPlaceholder}
              />
            </div>

            <DatePicker
              copy={copy}
              dates={checkout.dates}
              selectedDateId={checkout.selectedDateId}
              monthYearLabel={checkout.monthYearLabel}
              onSelect={checkout.setSelectedDateId}
            />

            <div>
              <p className={`${CHECKOUT_DATE_HEADING_CLASS} mb-3`}>{copy.chooseTime}</p>
              <div className="flex flex-wrap gap-2">
                {checkout.timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => checkout.setSelectedTime(time)}
                    className={
                      time === checkout.selectedTime
                        ? CHECKOUT_TIME_BUTTON_ACTIVE
                        : CHECKOUT_TIME_BUTTON_IDLE
                    }
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <UploadSection copy={copy} />
          <ContactMethodSection
            copy={copy}
            contactMethod={checkout.contactMethod}
            onSelect={checkout.setContactMethod}
          />
        </div>

        <OrderSummary copy={copy} fields={fields} checkout={checkout} />
      </form>
    </main>
  );
});

CheckoutView.displayName = 'CheckoutView';

export default CheckoutView;
