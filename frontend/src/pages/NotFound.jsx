import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiCompass } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        <div className="text-8xl mb-6">🏔️</div>
        <h1 className="font-display text-6xl font-bold text-gray-900 dark:text-white mb-3">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Lost in the Mountains</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          This trail doesn't exist yet. Let's get you back on the right path through Nepal.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/" className="btn-primary flex items-center gap-2"><FiHome size={18} /> Go Home</Link>
          <Link to="/explore" className="btn-outline flex items-center gap-2"><FiCompass size={18} /> Explore</Link>
        </div>
      </motion.div>
    </div>
  );
}
