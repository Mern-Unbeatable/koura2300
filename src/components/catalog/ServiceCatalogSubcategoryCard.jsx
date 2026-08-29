import React, { memo, useCallback } from 'react';
import { Star } from 'lucide-react';
import {
  DEFAULT_SUBCATEGORY_COPY,
  SUBCATEGORY_CARD_CLASS,
  SUBCATEGORY_CARD_CONTENT_CLASS,
  SUBCATEGORY_CARD_IMAGE_CLASS,
  SUBCATEGORY_CARD_OVERLAY_CLASS,
  SUBCATEGORY_CARD_PRICE_CLASS,
  SUBCATEGORY_CARD_RATING_CLASS,
  SUBCATEGORY_CARD_RATING_TEXT_CLASS,
  SUBCATEGORY_CARD_TITLE_CLASS,
  SUBCATEGORY_RATING_STARS,
  SUBCATEGORY_STAR_SIZE_PX,
} from './subcategoryData';

const ServiceCatalogSubcategoryCard = memo(({ card, startingAtLabel, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(card.id);
  }, [card.id, onSelect]);

  const priceLabel =
    typeof startingAtLabel === 'function'
      ? startingAtLabel(card.startingPrice)
      : DEFAULT_SUBCATEGORY_COPY.startingAt(card.startingPrice);

  return (
    <button
      type="button"
      className={SUBCATEGORY_CARD_CLASS}
      onClick={handleClick}
      aria-label={card.title}
      data-testid={`subcategory-card-${card.id}`}
    >
      <img
        src={card.image}
        alt=""
        className={SUBCATEGORY_CARD_IMAGE_CLASS}
        loading="lazy"
      />
      <span className={SUBCATEGORY_CARD_OVERLAY_CLASS} aria-hidden="true" />
      <span className={SUBCATEGORY_CARD_CONTENT_CLASS}>
        <span className={SUBCATEGORY_CARD_TITLE_CLASS}>{card.title}</span>
        <span className={SUBCATEGORY_CARD_PRICE_CLASS}>{priceLabel}</span>
        <span className={SUBCATEGORY_CARD_RATING_CLASS}>
          {Array.from({ length: SUBCATEGORY_RATING_STARS }, (_, starIndex) => (
            <Star
              key={starIndex}
              size={SUBCATEGORY_STAR_SIZE_PX}
              fill="currentColor"
              aria-hidden="true"
            />
          ))}
          <span className={SUBCATEGORY_CARD_RATING_TEXT_CLASS}>{card.rating}</span>
        </span>
      </span>
    </button>
  );
});

ServiceCatalogSubcategoryCard.displayName = 'ServiceCatalogSubcategoryCard';

export default ServiceCatalogSubcategoryCard;
