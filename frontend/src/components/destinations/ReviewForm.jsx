import { useState } from 'react';
import StarRating from '../common/StarRating';
import { destinationService } from '../../services/destinationService';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ReviewForm({ destinationId, onReviewAdded }) {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({ rating: 5, title: '', comment: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.comment.trim()) { toast.error('Please write a comment'); return; }
    setLoading(true);
    try {
      const res = await destinationService.createReview(destinationId, form);
      toast.success('Review submitted!');
      onReviewAdded?.(res.data.review);
      setForm({ rating: 5, title: '', comment: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally { setLoading(false); }
  };

  if (!isAuthenticated) return (
    <div className="card p-6 text-center">
      <p className="text-gray-500 dark:text-gray-400 mb-4">Please sign in to leave a review</p>
      <Link to="/login" className="btn-primary">Sign In</Link>
    </div>
  );

  return (
    <div className="card p-6">
      <h3 className="font-bold text-gray-900 dark:text-white mb-6">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Rating</label>
          <StarRating rating={form.rating} interactive onRate={r => setForm(f => ({ ...f, rating: r }))} size={28} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title (optional)</label>
          <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="Summarize your experience..." className="input-field" maxLength={100} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Review *</label>
          <textarea value={form.comment} onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
            placeholder="Share your experience..." rows={4} className="input-field resize-none" maxLength={1000} required />
          <p className="text-xs text-gray-400 mt-1">{form.comment.length}/1000</p>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
