import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function SearchBar({ placeholder = 'Search destinations...', className = '', size = 'md', initialValue = '' }) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
  };

  const sizeClasses = {
    sm: 'h-11 text-sm',
    md: 'h-14 text-base',
    lg: 'h-16 text-lg',
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className={`flex items-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden ${sizeClasses[size]}`}>
        <FiSearch className="ml-4 text-gray-400 shrink-0" size={size === 'lg' ? 22 : 18} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} className="mr-2 p-1 text-gray-400 hover:text-gray-600">
            <FiX size={16} />
          </button>
        )}
        <motion.button type="submit" whileTap={{ scale: 0.97 }}
          className="mr-2 flex items-center gap-1.5 px-3 sm:px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors flex-shrink-0">
          <FiSearch size={16} className="sm:hidden" />
          <span className="hidden sm:inline">Search</span>
        </motion.button>
      </div>
    </form>
  );
}
