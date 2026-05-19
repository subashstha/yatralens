import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiEye, FiStar } from 'react-icons/fi';
import { destinationService } from '../../services/destinationService';
import { PageLoader } from '../../components/common/LoadingSkeleton';
import Pagination from '../../components/common/Pagination';
import toast from 'react-hot-toast';

export default function ManageDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchData = () => {
    setLoading(true);
    destinationService.getAll({ page, limit: 15, ...(search && { search }) })
      .then(r => { setDestinations(r.data.destinations); setTotal(r.data.total); setTotalPages(r.data.totalPages); })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [page, search]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await destinationService.delete(id);
      toast.success('Destination deleted');
      fetchData();
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Destinations</h1>
            <p className="text-gray-400 text-sm mt-1">{total} destinations total</p>
          </div>
          <Link to="/admin" className="btn-outline text-sm py-2">← Dashboard</Link>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search destinations..." className="input-field pl-11 py-2.5" />
        </div>

        {loading ? <PageLoader /> : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {['Destination', 'Region', 'Category', 'Difficulty', 'Rating', 'Views', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {destinations.map(dest => (
                    <tr key={dest._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={dest.coverImage || `https://source.unsplash.com/40x40/?nepal`}
                            alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{dest.title}</p>
                            <p className="text-gray-400 text-xs">{dest.district}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{dest.region}</td>
                      <td className="px-5 py-4"><span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">{dest.category?.[0]}</span></td>
                      <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{dest.difficulty}</td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1 text-yellow-500">
                          <FiStar size={12} /> {dest.averageRating?.toFixed(1) || 0}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <FiEye size={12} /> {dest.views || 0}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/destinations/${dest.slug || dest._id}`}
                            className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors">
                            <FiEye size={16} />
                          </Link>
                          <button onClick={() => handleDelete(dest._id, dest.title)}
                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors">
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
