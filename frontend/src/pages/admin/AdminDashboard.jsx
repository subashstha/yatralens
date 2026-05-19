import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiMapPin, FiMessageSquare, FiFileText, FiTrendingUp, FiEye, FiStar } from 'react-icons/fi';
import { adminService } from '../../services/adminService';
import { PageLoader } from '../../components/common/LoadingSkeleton';
import { formatRelativeDate } from '../../utils/helpers';

const statCards = (stats) => [
  { label: 'Total Users', value: stats.totalUsers, icon: FiUsers, color: 'bg-blue-500', change: '+12%' },
  { label: 'Destinations', value: stats.totalDestinations, icon: FiMapPin, color: 'bg-primary-600', change: '+5%' },
  { label: 'Reviews', value: stats.totalReviews, icon: FiMessageSquare, color: 'bg-green-500', change: '+18%' },
  { label: 'Blog Posts', value: stats.totalBlogs, icon: FiFileText, color: 'bg-purple-500', change: '+3%' },
];

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getStats()
      .then(r => setData(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="pt-20"><PageLoader /></div>;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="section-title">Admin Dashboard</h1>
            <p className="text-gray-400 mt-1">Manage Explore Nepal platform</p>
          </div>
          <div className="flex gap-3">
            {[
              { label: 'Destinations', path: '/admin/destinations' },
              { label: 'Users', path: '/admin/users' },
              { label: 'Blogs', path: '/admin/blogs' },
            ].map(link => (
              <Link key={link.path} to={link.path} className="btn-outline text-sm py-2">{link.label}</Link>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards(data?.stats || {}).map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon size={20} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-lg">{stat.change}</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value || 0}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top destinations */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiTrendingUp size={18} className="text-primary-600" /> Top Destinations
            </h3>
            <div className="space-y-3">
              {data?.topDestinations?.map((dest, i) => (
                <div key={dest._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 bg-primary-100 dark:bg-primary-950/30 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{dest.title}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <FiEye size={11} /> {dest.views} views
                        <span className="mx-1">·</span>
                        <FiStar size={11} /> {dest.averageRating?.toFixed(1) || 0}
                      </p>
                    </div>
                  </div>
                  <Link to={`/destinations/${dest._id}`} className="text-xs text-primary-600 hover:underline">View</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent users */}
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiUsers size={18} className="text-primary-600" /> Recent Users
            </h3>
            <div className="space-y-3">
              {data?.recentUsers?.map(user => (
                <div key={user._id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=DC143C&color=fff&size=32`}
                    alt={user.name} className="w-9 h-9 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 dark:text-gray-200 text-sm truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <p className="text-xs text-gray-400 shrink-0">{formatRelativeDate(user.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
