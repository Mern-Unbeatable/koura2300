import {
  BOOKINGS_CREATE_OFFER_ERROR_TEXT_CLASS,
  BOOKINGS_CREATE_OFFER_FIELD_CLASS,
  BOOKINGS_CREATE_OFFER_FIELDS_STACK_CLASS,
  BOOKINGS_CREATE_OFFER_INPUT_CLASS,
  BOOKINGS_CREATE_OFFER_INPUT_ERROR_CLASS,
  BOOKINGS_CREATE_OFFER_LABEL_CLASS,
} from './bookingsCreateOfferData';

const getInputClassName = (hasError) =>
  `${BOOKINGS_CREATE_OFFER_INPUT_CLASS}${
    hasError ? ` ${BOOKINGS_CREATE_OFFER_INPUT_ERROR_CLASS}` : ''
  }`;

const OfferProductFields = ({ product, errors = {}, copy, onFieldChange }) => {
  const nameId = `${product.id}-name`;
  const quantityId = `${product.id}-quantity`;
  const priceId = `${product.id}-price`;

  return (
    <div className={BOOKINGS_CREATE_OFFER_FIELDS_STACK_CLASS} data-testid={`offer-product-${product.id}`}>
      <div className={BOOKINGS_CREATE_OFFER_FIELD_CLASS}>
        <label htmlFor={nameId} className={BOOKINGS_CREATE_OFFER_LABEL_CLASS}>
          {copy.productName}
        </label>
        <input
          id={nameId}
          type="text"
          value={product.productName}
          placeholder={copy.productNamePlaceholder}
          className={getInputClassName(Boolean(errors.productName))}
          onChange={(event) => onFieldChange(product.id, 'productName', event.target.value)}
        />
        {errors.productName ? (
          <p className={BOOKINGS_CREATE_OFFER_ERROR_TEXT_CLASS}>{errors.productName}</p>
        ) : null}
      </div>

      <div className={BOOKINGS_CREATE_OFFER_FIELD_CLASS}>
        <label htmlFor={quantityId} className={BOOKINGS_CREATE_OFFER_LABEL_CLASS}>
          {copy.quantity}
        </label>
        <input
          id={quantityId}
          type="text"
          value={product.quantity}
          placeholder={copy.quantityPlaceholder}
          className={getInputClassName(Boolean(errors.quantity))}
          onChange={(event) => onFieldChange(product.id, 'quantity', event.target.value)}
        />
        {errors.quantity ? (
          <p className={BOOKINGS_CREATE_OFFER_ERROR_TEXT_CLASS}>{errors.quantity}</p>
        ) : null}
      </div>

      <div className={BOOKINGS_CREATE_OFFER_FIELD_CLASS}>
        <label htmlFor={priceId} className={BOOKINGS_CREATE_OFFER_LABEL_CLASS}>
          {copy.price}
        </label>
        <input
          id={priceId}
          type="text"
          value={product.price}
          placeholder={copy.pricePlaceholder}
          className={getInputClassName(Boolean(errors.price))}
          onChange={(event) => onFieldChange(product.id, 'price', event.target.value)}
        />
        {errors.price ? (
          <p className={BOOKINGS_CREATE_OFFER_ERROR_TEXT_CLASS}>{errors.price}</p>
        ) : null}
      </div>
    </div>
  );
};

export default OfferProductFields;
