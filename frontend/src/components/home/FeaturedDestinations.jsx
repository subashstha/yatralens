import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { DestinationCardSkeleton } from '../common/LoadingSkeleton';
import { destinationService } from '../../services/destinationService';
import { truncateText } from '../../utils/helpers';

function HighlightCard({ dest }) {
  const image = dest.coverImage || dest.images?.[0]?.url || dest.images?.[0] || '';
  return (
    <Link
      to={`/destinations/${dest.slug || dest._id}`}
      className="group relative rounded-3xl overflow-hidden bg-primary-600 flex flex-col h-full"
      style={{ minHeight: '290px' }}
    >
      {image && (
        <img
          src={image}
          alt={dest.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-700/40 to-transparent" />

      {/* Arrow */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
        <FiArrowUpRight size={15} className="text-white" />
      </div>

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-white font-bold text-base uppercase tracking-wide leading-tight">
          {dest.title}
        </h3>
        <p className="text-white/75 text-xs mt-2 leading-relaxed">
          {truncateText(dest.shortDescription || dest.description, 90)}
        </p>
      </div>
    </Link>
  );
}

function PlaceCard({ dest }) {
  const image = dest.coverImage || dest.images?.[0]?.url || dest.images?.[0] || '';
  return (
    <Link
      to={`/destinations/${dest.slug || dest._id}`}
      className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700/50 transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Photo */}
      <div className="relative h-44 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={dest.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-700" />
        )}
        {/* Arrow badge */}
        <div className="absolute top-3 right-3 w-7 h-7 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <FiArrowUpRight size={13} className="text-gray-700 dark:text-gray-200" />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
          {dest.title}
        </h3>
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1.5 leading-relaxed">
          {truncateText(dest.shortDescription || dest.description, 80)}
        </p>
      </div>
    </Link>
  );
}

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    destinationService.getFeatured()
      .then(res => {
        const featured = res.data.destinations.slice(0, 8);
        if (featured.length > 0) return setDestinations(featured);
        return destinationService.getAll({ limit: 8, sort: '-views' })
          .then(r => setDestinations(r.data.destinations));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const [first, ...rest] = destinations;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
      <div className="container-custom">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between mb-10"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white uppercase tracking-tight leading-none">
            Most Visited<br />Places
          </h2>
          <Link
            to="/explore"
            className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-900 dark:border-white flex items-center justify-center hover:bg-gray-900 dark:hover:bg-white group transition-colors mt-1"
          >
            <FiArrowUpRight size={20} className="text-gray-900 dark:text-white group-hover:text-white dark:group-hover:text-gray-900 transition-colors" />
          </Link>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <DestinationCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {first && (
              <motion.div
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <HighlightCard dest={first} />
              </motion.div>
            )}
            {rest.map((dest, i) => (
              <motion.div
                key={dest._id}
                className="h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.07 }}
              >
                <PlaceCard dest={dest} />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
