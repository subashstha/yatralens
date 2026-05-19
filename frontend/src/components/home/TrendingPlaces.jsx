import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import DestinationCard from '../destinations/DestinationCard';
import { DestinationCardSkeleton } from '../common/LoadingSkeleton';
import { destinationService } from '../../services/destinationService';

export default function TrendingPlaces() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    destinationService.getTrending()
      .then(res => {
        const trending = res.data.destinations;
        if (trending.length > 0) return setDestinations(trending);
        return destinationService.getAll({ limit: 4, sort: '-createdAt' })
          .then(r => setDestinations(r.data.destinations));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && destinations.length === 0) return null;

  return (
    <section className="py-20 overflow-hidden">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-amber-500 font-semibold text-sm uppercase tracking-wider mb-2 flex items-center gap-1">
              <FiTrendingUp size={14} /> Trending Now
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="section-title">What's Hot Right Now</motion.h2>
          </div>
          <Link to="/explore?sort=-views" className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all">
            See All <FiArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <DestinationCardSkeleton key={i} />)
            : destinations.slice(0, 4).map((dest, i) => <DestinationCard key={dest._id} destination={dest} index={i} />)
          }
        </div>
      </div>
    </section>
  );
}

