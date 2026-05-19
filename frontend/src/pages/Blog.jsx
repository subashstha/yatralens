import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import BlogCard from '../components/blog/BlogCard';
import Pagination from '../components/common/Pagination';
import { BlogCardSkeleton } from '../components/common/LoadingSkeleton';
import { blogService } from '../services/blogService';
import { BLOG_CATEGORIES } from '../utils/constants';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    blogService.getAll({ page, limit: 9, ...(category && { category }), ...(search && { search }) })
      .then(r => { setBlogs(r.data.blogs); setTotal(r.data.total); setTotalPages(r.data.totalPages); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, category, search]);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
        <div className="container-custom text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">Travel Journal</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title mb-3">Stories from the Trail</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="section-subtitle mx-auto">
            Trek guides, budget tips, local experiences, and more from Nepal's finest travelers
          </motion.p>
        </div>
      </div>
      <div className="container-custom mt-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search articles..." className="input-field pl-10 w-60 py-2" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setCategory(''); setPage(1); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!category ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
              All
            </button>
            {BLOG_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setCategory(cat); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => <BlogCardSkeleton key={i} />)
            : blogs.map((blog, i) => <BlogCard key={blog._id} blog={blog} index={i} />)
          }
        </div>
        {!loading && blogs.length === 0 && (
          <div className="text-center py-16"><p className="text-4xl mb-3">📝</p><p className="text-gray-400">No articles found.</p></div>
        )}
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
