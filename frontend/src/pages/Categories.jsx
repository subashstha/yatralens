import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMap } from 'react-icons/fi';
import { categoryService } from '../services/categoryService';
import { PageLoader } from '../components/common/LoadingSkeleton';
import { CATEGORY_ICONS } from '../utils/constants';

const gradients = [
  'from-blue-500 to-indigo-700', 'from-green-500 to-teal-700', 'from-amber-500 to-orange-600',
  'from-purple-500 to-violet-700', 'from-red-500 to-rose-700', 'from-orange-500 to-red-600',
  'from-cyan-500 to-blue-600', 'from-teal-500 to-green-700',
];

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getAll().then(r => setCategories(r.data.categories)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="pt-20"><PageLoader /></div>;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
        <div className="container-custom text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">All Categories</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title mb-3">Browse by Experience</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="section-subtitle mx-auto">
            Find exactly what kind of Nepal adventure you're looking for
          </motion.p>
        </div>
      </div>
      <div className="container-custom mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div key={cat._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="hover:scale-105 hover:-translate-y-1 transition-transform duration-300 hover:z-10 relative">
              <Link to={`/categories/${cat.slug}`}
                className={`group relative h-48 rounded-2xl bg-gradient-to-br ${gradients[i % gradients.length]} flex flex-col items-center justify-center gap-3 overflow-hidden shadow-card hover:shadow-xl transition-shadow duration-300`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                {(() => { const Icon = CATEGORY_ICONS[cat.name] || FiMap; return <Icon size={48} className="text-white" />; })()}
                <div className="text-center">
                  <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                  <p className="text-white/70 text-sm">{cat.destinationCount} destinations</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
