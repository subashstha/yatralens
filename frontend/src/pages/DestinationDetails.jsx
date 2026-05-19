import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiMapPin, FiClock, FiTrendingUp, FiDollarSign, FiCalendar, FiSun,
  FiAlertTriangle, FiBookmark, FiShare2, FiChevronLeft, FiStar
} from 'react-icons/fi';
import { HiBookmark } from 'react-icons/hi';
import { destinationService } from '../services/destinationService';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { DifficultyBadge, CategoryBadge } from '../components/common/Badge';
import StarRating from '../components/common/StarRating';
import ReviewCard from '../components/destinations/ReviewCard';
import ReviewForm from '../components/destinations/ReviewForm';
import MapView from '../components/destinations/MapView';
import { PageLoader } from '../components/common/LoadingSkeleton';
import { formatBudget, getDurationText, getAltitudeText } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();
  const [destination, setDestination] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [saving, setSaving] = useState(false);

  const isSaved = user?.savedDestinations?.includes(destination?._id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, reviewRes] = await Promise.all([
          destinationService.getOne(id),
          destinationService.getReviews(id).catch(() => ({ data: { reviews: [] } })),
        ]);
        setDestination(destRes.data.destination);
        setReviews(reviewRes.data.reviews);
      } catch { navigate('/explore'); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!isAuthenticated) { toast.error('Please login'); return; }
    setSaving(true);
    try {
      const res = await authService.saveDestination(destination._id);
      updateUser({ ...user, savedDestinations: res.data.savedDestinations });
      toast.success(res.data.saved ? 'Saved!' : 'Removed');
    } catch { toast.error('Failed'); }
    finally { setSaving(false); }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: destination.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    }
  };

  if (loading) return <div className="pt-20"><PageLoader /></div>;
  if (!destination) return null;

  const allImages = destination.images?.length ? destination.images : [destination.coverImage].filter(Boolean);

  return (
    <div className="min-h-screen pt-20">
      {/* Back button */}
      <div className="container-custom py-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors">
          <FiChevronLeft size={18} /> Back to Explore
        </button>
      </div>

      {/* Image Gallery */}
      <div className="container-custom mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-80 md:h-[500px]">
          <div className="md:col-span-2 rounded-2xl overflow-hidden cursor-pointer" onClick={() => setActiveImage(0)}>
            <img src={allImages[0] || 'https://source.unsplash.com/1200x800/?nepal'}
              alt={destination.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-3">
            {allImages.slice(1, 3).map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden cursor-pointer" onClick={() => setActiveImage(i + 1)}>
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
            {allImages.length === 0 && Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {destination.category?.map(cat => <CategoryBadge key={cat} category={cat} />)}
                <DifficultyBadge difficulty={destination.difficulty} />
              </div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{destination.title}</h1>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={handleSave} disabled={saving} className="p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 transition-colors">
                    {isSaved ? <HiBookmark size={20} className="text-primary-600" /> : <FiBookmark size={20} className="text-gray-500" />}
                  </button>
                  <button onClick={handleShare} className="p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 transition-colors">
                    <FiShare2 size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-500 text-sm">
                <span className="flex items-center gap-1"><FiMapPin size={14} /> {destination.district}, {destination.region}</span>
                {destination.altitude > 0 && <span className="flex items-center gap-1"><FiTrendingUp size={14} /> {getAltitudeText(destination.altitude)}</span>}
                <span className="flex items-center gap-1"><FiClock size={14} /> {getDurationText(destination.duration)}</span>
                {destination.reviewCount > 0 && (
                  <span className="flex items-center gap-1">
                    <FiStar size={14} className="text-yellow-400" />
                    <strong>{destination.averageRating.toFixed(1)}</strong>
                    <span>({destination.reviewCount} reviews)</span>
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{destination.description}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: FiDollarSign, label: 'Budget', value: formatBudget(destination.budget) },
                { icon: FiCalendar, label: 'Best Season', value: destination.bestSeason?.join(', ') || 'All Year' },
                { icon: FiClock, label: 'Duration', value: getDurationText(destination.duration) },
                { icon: FiTrendingUp, label: 'Difficulty', value: destination.difficulty },
              ].map(item => (
                <div key={item.label} className="card p-4 text-center">
                  <item.icon size={20} className="text-primary-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Tips */}
            {destination.tips?.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FiAlertTriangle size={18} className="text-amber-500" /> Travel Tips
                </h3>
                <ul className="space-y-3">
                  {destination.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-5 h-5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">{i + 1}</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Itinerary */}
            {destination.itinerary?.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-xl">Suggested Itinerary</h3>
                <div className="space-y-4">
                  {destination.itinerary.map((day, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                          {day.day}
                        </div>
                        {i < destination.itinerary.length - 1 && <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2" />}
                      </div>
                      <div className="pb-4 flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Day {day.day}: {day.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{day.description}</p>
                        {day.accommodation && <p className="text-xs text-gray-400 mt-1">🏠 {day.accommodation}</p>}
                        {day.distance && <p className="text-xs text-gray-400">📏 {day.distance}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities */}
            {destination.activities?.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Activities</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.activities.map(act => (
                    <span key={act} className="px-3 py-1.5 bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 rounded-xl text-sm">
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            {destination.location?.coordinates && (
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-xl">Location</h3>
                <MapView
                  destinations={[destination]}
                  center={[destination.location.coordinates[1], destination.location.coordinates[0]]}
                  zoom={12}
                  height="350px"
                />
              </div>
            )}

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white text-xl">
                  Reviews ({destination.reviewCount || 0})
                </h3>
                {destination.averageRating > 0 && (
                  <div className="flex items-center gap-2">
                    <StarRating rating={destination.averageRating} showNumber size={20} />
                  </div>
                )}
              </div>
              <ReviewForm destinationId={destination._id} onReviewAdded={review => setReviews(prev => [review, ...prev])} />
              <div className="space-y-4 mt-6">
                {reviews.map(review => (
                  <ReviewCard key={review._id} review={review} destinationId={destination._id}
                    onDelete={id => setReviews(prev => prev.filter(r => r._id !== id))} />
                ))}
                {reviews.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p className="text-4xl mb-2">💬</p>
                    <p>No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="card p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Info</h3>
              <dl className="space-y-3 text-sm">
                {[
                  { label: 'Region', value: destination.region },
                  { label: 'District', value: destination.district },
                  { label: 'Altitude', value: getAltitudeText(destination.altitude) || 'N/A' },
                  { label: 'Best Season', value: destination.bestSeason?.join(', ') || 'All Year' },
                  { label: 'Budget', value: formatBudget(destination.budget) },
                  { label: 'Duration', value: getDurationText(destination.duration) },
                  ...(destination.permits?.length ? [{ label: 'Permits', value: destination.permits.join(', ') }] : []),
                  ...(destination.weatherInfo ? [{ label: 'Weather', value: destination.weatherInfo }] : []),
                  ...(destination.roadCondition ? [{ label: 'Road', value: destination.roadCondition }] : []),
                ].map(({ label, value }) => value && (
                  <div key={label} className="flex justify-between gap-2">
                    <dt className="text-gray-400 shrink-0">{label}</dt>
                    <dd className="font-medium text-gray-700 dark:text-gray-300 text-right">{value}</dd>
                  </div>
                ))}
              </dl>

              {destination.tags?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-gray-400 text-xs mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {destination.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-lg">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Nearby */}
            {destination.nearbyPlaces?.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Nearby Places</h3>
                <div className="space-y-3">
                  {destination.nearbyPlaces.map(place => (
                    <Link key={place._id} to={`/destinations/${place.slug || place._id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                      <img src={place.coverImage || `https://source.unsplash.com/80x80/?nepal`}
                        alt={place.title} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-medium text-sm text-gray-800 dark:text-gray-200 group-hover:text-primary-600">{place.title}</p>
                        <p className="text-xs text-gray-400">{place.category?.[0]}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
