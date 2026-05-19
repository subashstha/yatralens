import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categoryService } from '../services/categoryService';
import DestinationCard from '../components/destinations/DestinationCard';
import { PageLoader, DestinationCardSkeleton } from '../components/common/LoadingSkeleton';

export default function CategoryDetails() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getOne(slug)
      .then(r => { setCategory(r.data.category); setDestinations(r.data.destinations); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="pt-20"><PageLoader /></div>;
  if (!category) return <div className="pt-20 text-center">Category not found</div>;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
        <div className="container-custom">
          <Link to="/categories" className="text-primary-600 text-sm hover:underline mb-4 block">← All Categories</Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title mb-3">{category.name}</motion.h1>
          {category.description && <p className="text-gray-500 dark:text-gray-400 max-w-2xl">{category.description}</p>}
          <p className="text-primary-600 font-semibold mt-2">{destinations.length} destinations</p>
        </div>
      </div>
      <div className="container-custom mt-10">
        {destinations.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🗺️</p>
            <p className="text-gray-400">No destinations in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations.map((dest, i) => <DestinationCard key={dest._id} destination={dest} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
