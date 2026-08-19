import React, { memo } from 'react';
import { Check, Mail, Phone, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../../config';
import useCheckout from '../../hooks/useCheckout';
import {
  CHECKOUT_CARD_CLASS,
  CHECKOUT_CONFIRM_BUTTON_CLASS,
  CHECKOUT_CONTACT_ACTIVE,
  CHECKOUT_CONTACT_IDLE,
  CHECKOUT_CONTACT_METHODS,
  CHECKOUT_DATE_BUTTON_ACTIVE,
  CHECKOUT_DATE_BUTTON_IDLE,
  CHECKOUT_INPUT_CLASS,
  CHECKOUT_SECTION_TITLE_CLASS,
  CHECKOUT_TIME_BUTTON_ACTIVE,
  CHECKOUT_TIME_BUTTON_IDLE,
  CHECKOUT_UPLOAD_CLASS,
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

const CheckoutView = memo(() => {
  const checkout = useCheckout();
  const { copy, fields, primaryItem } = checkout;

  const handleConfirm = (event) => {
    event.preventDefault();
    toast.success(copy.confirmSuccess);
  };

  return (
    <main className="mx-auto min-w-0 max-w-screen-2xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <Link
        to={ROUTES.HOME}
        className="mb-6 inline-flex items-center text-sm font-medium text-brand-ink hover:text-brand-orange"
      >
        ← {copy.back}
      </Link>

      <form
        className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]"
        onSubmit={handleConfirm}
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

            <div>
              <p className="mb-3 text-lg font-bold text-[#0b1e3d]">{copy.chooseDate}</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {checkout.dates.map((date) => (
                  <button
                    key={date.id}
                    type="button"
                    onClick={() => checkout.setSelectedDateId(date.id)}
                    className={
                      date.id === checkout.selectedDateId
                        ? CHECKOUT_DATE_BUTTON_ACTIVE
                        : CHECKOUT_DATE_BUTTON_IDLE
                    }
                  >
                    <span className="text-xs text-gray-500">{date.weekday}</span>
                    <span className="text-lg font-semibold">{date.day}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-lg font-bold text-[#0b1e3d]">{copy.chooseTime}</p>
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

          <section className="rounded-2xl border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-[#0b1e3d]">{copy.uploadTitle}</h2>
            <label className={`${CHECKOUT_UPLOAD_CLASS} mt-4`}>
              <Upload size={36} aria-hidden="true" className="mb-3 text-gray-400" />
              {copy.uploadHint}
              <input type="file" className="sr-only" accept="image/jpeg,image/png,video/mp4" multiple />
            </label>
          </section>

          <section className="rounded-2xl border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-[#0b1e3d]">{copy.contactTitle}</h2>
            <p className="mt-1 text-sm text-gray-500">{copy.contactHint}</p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => checkout.setContactMethod(CHECKOUT_CONTACT_METHODS.PHONE)}
                className={
                  checkout.contactMethod === CHECKOUT_CONTACT_METHODS.PHONE
                    ? CHECKOUT_CONTACT_ACTIVE
                    : CHECKOUT_CONTACT_IDLE
                }
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-orange text-white">
                  <Phone size={22} aria-hidden="true" />
                </span>
                <span className="font-semibold">{copy.phoneSms}</span>
              </button>
              <button
                type="button"
                onClick={() => checkout.setContactMethod(CHECKOUT_CONTACT_METHODS.EMAIL)}
                className={
                  checkout.contactMethod === CHECKOUT_CONTACT_METHODS.EMAIL
                    ? CHECKOUT_CONTACT_ACTIVE
                    : CHECKOUT_CONTACT_IDLE
                }
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-600">
                  <Mail size={22} aria-hidden="true" />
                </span>
                <span className="font-semibold">{copy.emailContact}</span>
              </button>
            </div>
          </section>
        </div>

        <aside className={`${CHECKOUT_CARD_CLASS} lg:sticky lg:top-28`}>
          <h2 className="text-2xl font-semibold text-[#191c1f]">{copy.reviewTitle}</h2>
          {primaryItem ? (
            <div className="mt-6 flex items-start justify-between gap-3 border-b border-gray-200 pb-4">
              <div>
                <p className="font-semibold">{primaryItem.title}</p>
                <p className="text-sm text-gray-500">{copy.assemblySuffix(primaryItem.quantity ?? 1)}</p>
              </div>
              <p className="font-bold">${primaryItem.price}</p>
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-500">{copy.emptyCart}</p>
          )}

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-gray-500">{copy.nameLabel}</dt>
              <dd className="font-medium">{fields.firstName || '—'}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-gray-500">{copy.addressLabel}</dt>
              <dd className="text-right font-medium">
                {[fields.street, fields.city, fields.zip].filter(Boolean).join(', ') || '—'}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-gray-500">{copy.dateTimeLabel}</dt>
              <dd className="text-right font-medium">
                {checkout.selectedDate?.iso} at {checkout.selectedTime}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-gray-500">{copy.contactViaLabel}</dt>
              <dd className="font-medium">{checkout.contactLabel}</dd>
            </div>
          </dl>

          <p className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-[#0b1e3d]">{copy.paymentNote}</p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <Link to={ROUTES.HOME} className="text-sm font-medium hover:text-brand-orange">
              ← {copy.back}
            </Link>
            <button type="submit" className={CHECKOUT_CONFIRM_BUTTON_CLASS}>
              <Check size={18} aria-hidden="true" />
              {copy.confirmPay}
            </button>
          </div>
        </aside>
      </form>
    </main>
  );
});

CheckoutView.displayName = 'CheckoutView';

export default CheckoutView;
