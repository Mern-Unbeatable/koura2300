import { BOOKINGS_CREATE_OFFER_COPY } from './bookingsCreateOfferCopy';

let productSequence = 0;

export const createEmptyOfferProduct = () => {
  productSequence += 1;

  return {
    id: `offer-product-${productSequence}`,
    productName: '',
    quantity: '',
    price: '',
  };
};

export const resetOfferProductSequence = () => {
  productSequence = 0;
};

export const parseOfferPrice = (value) => {
  const normalized = String(value).replace(/[^0-9.]/g, '');
  const amount = Number.parseFloat(normalized);

  if (Number.isNaN(amount) || amount < 0) {
    return null;
  }

  return amount;
};

export const formatOfferPriceLabel = (amount) => `$${amount}`;

export const validateOfferProduct = (product) => {
  const errors = {};

  if (!product.productName.trim()) {
    errors.productName = BOOKINGS_CREATE_OFFER_COPY.errors.productNameRequired;
  }

  if (!product.quantity.trim()) {
    errors.quantity = BOOKINGS_CREATE_OFFER_COPY.errors.quantityRequired;
  }

  if (!product.price.trim()) {
    errors.price = BOOKINGS_CREATE_OFFER_COPY.errors.priceRequired;
  } else if (parseOfferPrice(product.price) === null) {
    errors.price = BOOKINGS_CREATE_OFFER_COPY.errors.priceInvalid;
  }

  return errors;
};

export const validateOfferProducts = (products) =>
  products.reduce((accumulator, product) => {
    const productErrors = validateOfferProduct(product);
    if (Object.keys(productErrors).length > 0) {
      accumulator[product.id] = productErrors;
    }
    return accumulator;
  }, {});

export const hasOfferValidationErrors = (errorsByProductId) =>
  Object.keys(errorsByProductId).length > 0;

export const buildChatOfferFromProducts = (bookingId, products) => {
  const lineItems = products.map((product) => {
    const amount = parseOfferPrice(product.price) ?? 0;

    return {
      id: product.id,
      item: product.productName.trim(),
      quantity: product.quantity.trim(),
      cost: amount,
      costLabel: formatOfferPriceLabel(amount),
    };
  });

  const total = lineItems.reduce((sum, lineItem) => sum + lineItem.cost, 0);

  return {
    bookingId,
    lineItems,
    totalLabel: formatOfferPriceLabel(total),
  };
};
