import { FiStar } from 'react-icons/fi';
import { HiStar } from 'react-icons/hi';

export default function StarRating({ rating = 0, maxRating = 5, size = 16, showNumber = false, interactive = false, onRate }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map(star => (
        <button key={star} type={interactive ? 'button' : undefined}
          onClick={interactive ? () => onRate?.(star) : undefined}
          className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}>
          {star <= Math.round(rating)
            ? <HiStar size={size} className="text-yellow-400" />
            : <FiStar size={size} className="text-gray-300 dark:text-gray-600" />
          }
        </button>
      ))}
      {showNumber && <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">{rating.toFixed(1)}</span>}
    </div>
  );
}
