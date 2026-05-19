import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiMapPin, FiBookmark, FiEye, FiTrendingUp } from 'react-icons/fi';
import { HiBookmark } from 'react-icons/hi';
import { DifficultyBadge, CategoryBadge } from '../common/Badge';
import { formatBudget, truncateText } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CURRENCY_SYMBOLS = { NPR: 'NPR', USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥' };

export default function DestinationCard({ destination, index = 0, displayCurrency = 'NPR', currencyRate = 1 }) {
  const { user, isAuthenticated, updateUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const isSaved = user?.savedDestinations?.includes(destination._id);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login to save destinations'); return; }
    setSaving(true);
    try {
      const res = await authService.saveDestination(destination._id);
      updateUser({ ...user, savedDestinations: res.data.savedDestinations });
      toast.success(res.data.saved ? 'Destination saved!' : 'Removed from saved');
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/destinations/${destination.slug || destination._id}`} className="card group block hover:-translate-y-1 transition-transform duration-300">
        {/* Image */}
        <div className="relative overflow-hidden h-56 rounded-t-2xl [transform:translateZ(0)]">
          <img
            src={destination.coverImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80&fm=webp&fit=crop'}
            alt={destination.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-card-gradient" />
          {/* Save button */}
          <button onClick={handleSave} disabled={saving}
            className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/40 transition-colors">
            {isSaved ? <HiBookmark size={18} className="text-primary-400" /> : <FiBookmark size={18} className="text-white" />}
          </button>
          {/* Badges on image */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {destination.category?.slice(0, 2).map(cat => (
              <span key={cat} className="text-xs bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg">{cat}</span>
            ))}
          </div>
          {destination.isTrending && (
            <div className="absolute top-3 left-3 flex items-center gap-1 text-xs bg-amber-500 text-white px-2 py-1 rounded-lg font-semibold">
              <FiTrendingUp size={11} /> Trending
            </div>
          )}
          {destination.isFeatured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 text-xs bg-primary-600 text-white px-2 py-1 rounded-lg font-semibold">
              <FiStar size={11} /> Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-tight line-clamp-1 group-hover:text-primary-600 transition-colors">
              {destination.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
            <FiMapPin size={12} />
            <span>{destination.district || destination.region}</span>
            <span className="mx-1">·</span>
            <span>{destination.region}</span>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
            {destination.shortDescription}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {destination.averageRating > 0 ? (
                <>
                  <span className="text-yellow-400">★</span>
                  <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{destination.averageRating.toFixed(1)}</span>
                  <span className="text-gray-400 text-xs">({destination.reviewCount})</span>
                </>
              ) : (
                <span className="text-gray-400 text-xs">No reviews yet</span>
              )}
            </div>
            <div className="text-right">
              {destination.budget?.min > 0 && (
                <p className="text-xs text-gray-400">From</p>
              )}
              <p className="text-sm font-bold text-primary-600">
                {destination.budget?.min > 0 ? (() => {
                  const converted = destination.budget.min * currencyRate;
                  const sym = CURRENCY_SYMBOLS[displayCurrency] || displayCurrency;
                  if (displayCurrency === 'NPR') return `NPR ${converted.toLocaleString()}`;
                  if (displayCurrency === 'JPY') return `${sym}${Math.round(converted).toLocaleString()}`;
                  return `${sym}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                })() : 'Free'}
              </p>
            </div>
          </div>

          {destination.difficulty && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <DifficultyBadge difficulty={destination.difficulty} />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
