import React, { memo } from 'react';
import { LANDING_CHAT_COPY } from './landingChatCopy';
import {
  LANDING_CHAT_PRODUCT_CARD_CLASS,
  LANDING_CHAT_PRODUCT_IMAGE_CLASS,
  LANDING_CHAT_PRODUCT_PRICE_CLASS,
  LANDING_CHAT_PRODUCT_TITLE_CLASS,
  LANDING_CHAT_PRODUCTS_BUBBLE_CLASS,
  LANDING_CHAT_PRODUCTS_ROW_CLASS,
  LANDING_CHAT_TIME_CLASS,
} from './landingChatData';

const LandingChatProductCard = memo(({ product }) => (
  <article className={LANDING_CHAT_PRODUCT_CARD_CLASS}>
    <img
      src={product.image}
      alt={product.imageAlt}
      width={122}
      height={74}
      className={LANDING_CHAT_PRODUCT_IMAGE_CLASS}
      loading="lazy"
    />
    <p className={LANDING_CHAT_PRODUCT_TITLE_CLASS}>{product.title}</p>
    <p className={LANDING_CHAT_PRODUCT_PRICE_CLASS}>
      {LANDING_CHAT_COPY.pricePrefix} {product.priceLabel}
    </p>
  </article>
));

LandingChatProductCard.displayName = 'LandingChatProductCard';

const LandingChatProductsMessage = memo(({ message }) => (
  <div className="flex justify-start">
    <div className={LANDING_CHAT_PRODUCTS_BUBBLE_CLASS}>
      <div className={LANDING_CHAT_PRODUCTS_ROW_CLASS}>
        {message.products.map((product) => (
          <LandingChatProductCard key={product.id} product={product} />
        ))}
      </div>
      <p className={LANDING_CHAT_TIME_CLASS}>{message.time}</p>
    </div>
  </div>
));

LandingChatProductsMessage.displayName = 'LandingChatProductsMessage';

export default LandingChatProductsMessage;
