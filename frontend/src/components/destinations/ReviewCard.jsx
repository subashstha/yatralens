import { FiThumbsUp, FiTrash2 } from 'react-icons/fi';
import StarRating from '../common/StarRating';
import { formatRelativeDate } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import { destinationService } from '../../services/destinationService';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ReviewCard({ review, destinationId, onDelete }) {
  const { user, isAuthenticated } = useAuth();
  const [helpful, setHelpful] = useState(review.helpful || 0);
  const isOwner = user?._id === review.user?._id;
  const isAdmin = user?.role === 'admin';

  const handleHelpful = async () => {
    if (!isAuthenticated) { toast.error('Please login'); return; }
    try {
      const res = await destinationService.markReviewHelpful(destinationId, review._id);
      setHelpful(res.data.helpful);
    } catch { toast.error('Failed'); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await destinationService.deleteReview(destinationId, review._id);
      toast.success('Review deleted');
      onDelete?.(review._id);
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={review.user?.avatar || `https://ui-avatars.com/api/?name=${review.user?.name}&background=DC143C&color=fff&size=40`}
            alt={review.user?.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{review.user?.name}</p>
            <p className="text-gray-400 text-xs">{formatRelativeDate(review.createdAt)}</p>
          </div>
        </div>
        <StarRating rating={review.rating} size={14} />
      </div>
      {review.title && <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">{review.title}</h4>}
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{review.comment}</p>
      {review.photos?.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {review.photos.map((photo, i) => (
            <img key={i} src={photo} alt="" className="w-20 h-16 object-cover rounded-lg shrink-0" />
          ))}
        </div>
      )}
      <div className="flex items-center justify-between text-xs">
        <button onClick={handleHelpful} className="flex items-center gap-1.5 text-gray-400 hover:text-primary-600 transition-colors">
          <FiThumbsUp size={14} /> <span>{helpful} helpful</span>
        </button>
        {(isOwner || isAdmin) && (
          <button onClick={handleDelete} className="flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors">
            <FiTrash2 size={14} /> Delete
          </button>
        )}
      </div>
    </div>
  );
}
