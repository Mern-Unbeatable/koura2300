import {
  buildChatOfferFromProducts,
  createEmptyOfferProduct,
  hasOfferValidationErrors,
  parseOfferPrice,
  resetOfferProductSequence,
  validateOfferProducts,
} from '../bookingsCreateOfferUtils';
import { BOOKINGS_CREATE_OFFER_COPY } from '../bookingsCreateOfferCopy';

describe('bookingsCreateOfferUtils', () => {
  beforeEach(() => {
    resetOfferProductSequence();
  });

  it('creates empty products with unique ids', () => {
    const first = createEmptyOfferProduct();
    const second = createEmptyOfferProduct();

    expect(first).toEqual({
      id: 'offer-product-1',
      productName: '',
      quantity: '',
      price: '',
    });
    expect(second.id).toBe('offer-product-2');
  });

  it('parses currency-like price values', () => {
    expect(parseOfferPrice('$85')).toBe(85);
    expect(parseOfferPrice('40.5')).toBe(40.5);
    expect(parseOfferPrice('abc')).toBeNull();
  });

  it('validates required product fields inline', () => {
    const products = [createEmptyOfferProduct()];
    const errors = validateOfferProducts(products);

    expect(hasOfferValidationErrors(errors)).toBe(true);
    expect(errors[products[0].id]).toEqual({
      productName: BOOKINGS_CREATE_OFFER_COPY.errors.productNameRequired,
      quantity: BOOKINGS_CREATE_OFFER_COPY.errors.quantityRequired,
      price: BOOKINGS_CREATE_OFFER_COPY.errors.priceRequired,
    });
  });

  it('builds a chat offer payload from valid products', () => {
    const products = [
      {
        id: 'p1',
        productName: '200A Main Breaker Panel',
        quantity: '1 unit',
        price: '85',
      },
      {
        id: 'p2',
        productName: 'Circuit Breakers 15A',
        quantity: '6 pcs',
        price: '$30',
      },
    ];

    expect(buildChatOfferFromProducts('BK-001', products)).toEqual({
      bookingId: 'BK-001',
      lineItems: [
        {
          id: 'p1',
          item: '200A Main Breaker Panel',
          quantity: '1 unit',
          cost: 85,
          costLabel: '$85',
        },
        {
          id: 'p2',
          item: 'Circuit Breakers 15A',
          quantity: '6 pcs',
          cost: 30,
          costLabel: '$30',
        },
      ],
      totalLabel: '$115',
    });
  });
});
