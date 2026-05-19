import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiEye, FiHeart, FiMessageSquare } from 'react-icons/fi';
import { formatRelativeDate } from '../../utils/helpers';

export default function BlogCard({ blog, index = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
      <Link to={`/blog/${blog.slug}`} className="card group block hover:-translate-y-1 transition-transform duration-300">
        <div className="relative overflow-hidden h-48">
          <img src={blog.featuredImage || 'https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=600&q=80&fm=webp&fit=crop'}
            alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div className="absolute inset-0 bg-card-gradient" />
          <span className="absolute top-3 left-3 text-xs bg-primary-600 text-white px-2 py-1 rounded-lg font-medium">{blog.category}</span>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors mb-2">
            {blog.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><FiClock size={12} /> {blog.readTime} min read</span>
              <span className="flex items-center gap-1"><FiEye size={12} /> {blog.views || 0}</span>
              <span className="flex items-center gap-1"><FiHeart size={12} /> {blog.likes?.length || 0}</span>
            </div>
            <span>{formatRelativeDate(blog.createdAt)}</span>
          </div>
          {blog.author && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <img src={blog.author.avatar || `https://ui-avatars.com/api/?name=${blog.author.name}&background=DC143C&color=fff&size=32`}
                alt={blog.author.name} className="w-7 h-7 rounded-full object-cover" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{blog.author.name}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
