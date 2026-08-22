import { Star } from 'lucide-react';

const STAR_COUNT = 5;

const StarRating = ({ rating }) => (
  <div
    role="img"
    aria-label={`${rating} out of ${STAR_COUNT} stars`}
    className="flex items-center gap-0.5"
  >
    {Array.from({ length: STAR_COUNT }, (_, index) => {
      const isFilled = index < rating;

      return (
        <Star
          key={index}
          size={14}
          className={isFilled ? 'fill-[#fc6f32] text-[#fc6f32]' : 'text-[#e5e7eb]'}
          aria-hidden="true"
        />
      );
    })}
  </div>
);

export default StarRating;
