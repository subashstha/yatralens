import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMap } from 'react-icons/fi';
import { categoryService } from '../../services/categoryService';
import { CATEGORY_ICONS } from '../../utils/constants';

const categoryGradients = [
  'from-blue-500 to-blue-700', 'from-green-500 to-green-700', 'from-amber-500 to-amber-700',
  'from-purple-500 to-purple-700', 'from-red-500 to-red-700', 'from-orange-500 to-orange-700',
  'from-cyan-500 to-cyan-700', 'from-teal-500 to-teal-700',
];

export default function CategoriesGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getAll()
      .then(res => setCategories(res.data.categories))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && categories.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">Browse by Category</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-title">
            What Kind of Adventure?
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-subtitle mx-auto">
            From soul-searching treks to hidden local cafes — find your perfect Nepal experience
          </motion.p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {(loading ? Array.from({ length: 8 }) : categories).map((cat, i) => (
            loading ? (
              <div key={i} className="h-32 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
            ) : (
              <motion.div key={cat._id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={`/categories/${cat.slug}`}
                  className={`group relative h-32 rounded-2xl bg-gradient-to-br ${categoryGradients[i % categoryGradients.length]} flex flex-col items-center justify-center gap-2 overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  {(() => { const Icon = CATEGORY_ICONS[cat.name] || FiMap; return <Icon size={32} className="text-white" />; })()}
                  <span className="text-white font-semibold text-sm">{cat.name}</span>
                  <span className="text-white/70 text-xs">{cat.destinationCount} places</span>
                </Link>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
