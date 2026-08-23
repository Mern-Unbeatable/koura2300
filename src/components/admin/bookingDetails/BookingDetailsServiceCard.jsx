import { Check, Settings, X } from 'lucide-react';
import BookingDetailsCard from './BookingDetailsCard';
import {
  BOOKING_DETAILS_LIST_ICON_SIZE,
  BOOKING_DETAILS_LIST_ITEM_CLASS,
  BOOKING_DETAILS_LIST_TITLE_CLASS,
  BOOKING_DETAILS_LISTS_GRID_CLASS,
  BOOKING_DETAILS_SERVICE_BLOCK_CLASS,
  BOOKING_DETAILS_SERVICE_COLLECTED_CLASS,
  BOOKING_DETAILS_SERVICE_COLLECTED_EMPHASIS_CLASS,
  BOOKING_DETAILS_SERVICE_DESCRIPTION_CLASS,
  BOOKING_DETAILS_SERVICE_EYEBROW_CLASS,
  BOOKING_DETAILS_SERVICE_FOOTER_CLASS,
  BOOKING_DETAILS_SERVICE_PRICE_CLASS,
  BOOKING_DETAILS_SERVICE_PRICE_SUFFIX_CLASS,
  BOOKING_DETAILS_SERVICE_TITLE_CLASS,
} from './bookingDetailsData';

const ServiceList = ({ title, items, tone }) => (
  <div>
    <p className={BOOKING_DETAILS_LIST_TITLE_CLASS}>{title}</p>
    <ul className="mt-2">
      {items.map((item) => (
        <li key={item} className={BOOKING_DETAILS_LIST_ITEM_CLASS}>
          {tone === 'include' ? (
            <Check
              size={BOOKING_DETAILS_LIST_ICON_SIZE}
              className="mt-0.5 shrink-0 text-[#00a63e]"
              aria-hidden="true"
            />
          ) : (
            <X
              size={BOOKING_DETAILS_LIST_ICON_SIZE}
              className="mt-0.5 shrink-0 text-[#fb2c36]"
              aria-hidden="true"
            />
          )}
          <span className={tone === 'exclude' ? 'text-[#62748e]' : undefined}>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const BookingDetailsServiceCard = ({ copy, service }) => (
  <BookingDetailsCard title={copy.sections.serviceInformation} icon={Settings}>
    <div className={BOOKING_DETAILS_SERVICE_BLOCK_CLASS}>
      <p className={BOOKING_DETAILS_SERVICE_EYEBROW_CLASS}>{copy.labels.title}</p>
      <h3 className={BOOKING_DETAILS_SERVICE_TITLE_CLASS}>{service.title}</h3>
    </div>

    <div className={BOOKING_DETAILS_SERVICE_BLOCK_CLASS}>
      <p className={BOOKING_DETAILS_SERVICE_EYEBROW_CLASS}>{copy.labels.description}</p>
      <p className={BOOKING_DETAILS_SERVICE_DESCRIPTION_CLASS}>{service.description}</p>
    </div>

    <div className={BOOKING_DETAILS_LISTS_GRID_CLASS}>
      <ServiceList title={copy.labels.included} items={service.inclusions} tone="include" />
      <ServiceList title={copy.labels.notIncluded} items={service.exclusions} tone="exclude" />
    </div>

    <div
      data-testid="booking-details-service-price"
      className={BOOKING_DETAILS_SERVICE_FOOTER_CLASS}
    >
      <div>
        <p className="text-xs font-medium leading-4 text-[#90a1b9]">{copy.labels.startingPrice}</p>
        <p className="pt-0.5">
          <span className={BOOKING_DETAILS_SERVICE_PRICE_CLASS}>{service.startingPrice}</span>{' '}
          <span className={BOOKING_DETAILS_SERVICE_PRICE_SUFFIX_CLASS}>{copy.labels.onwards}</span>
        </p>
      </div>
      <div>
        <p className={BOOKING_DETAILS_SERVICE_COLLECTED_CLASS}>{copy.labels.collectedAfter}</p>
        <p className={BOOKING_DETAILS_SERVICE_COLLECTED_EMPHASIS_CLASS}>{copy.labels.completion}</p>
      </div>
    </div>
  </BookingDetailsCard>
);

export default BookingDetailsServiceCard;
