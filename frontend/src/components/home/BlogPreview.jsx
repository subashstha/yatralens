import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import BlogCard from '../blog/BlogCard';
import { BlogCardSkeleton } from '../common/LoadingSkeleton';
import { blogService } from '../../services/blogService';

export default function BlogPreview() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogService.getAll({ limit: 3 })
      .then(res => setBlogs(res.data.blogs))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && blogs.length === 0) return null;

  return (
    <section className="py-20 overflow-hidden">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">Travel Guides</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="section-title">Stories from Nepal</motion.h2>
          </div>
          <Link to="/blog" className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all">
            All Articles <FiArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <BlogCardSkeleton key={i} />)
            : blogs.map((blog, i) => <BlogCard key={blog._id} blog={blog} index={i} />)
          }
        </div>
      </div>
    </section>
  );
}
