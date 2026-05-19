import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiTrash2, FiEye, FiHeart, FiMessageSquare } from 'react-icons/fi';
import { blogService } from '../../services/blogService';
import { PageLoader } from '../../components/common/LoadingSkeleton';
import Pagination from '../../components/common/Pagination';
import { formatRelativeDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const fetchData = () => {
    setLoading(true);
    blogService.getAll({ page, limit: 15 })
      .then(r => { setBlogs(r.data.blogs); setTotal(r.data.total); setTotalPages(r.data.totalPages); })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [page]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await blogService.delete(id);
      toast.success('Blog deleted');
      fetchData();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Blogs</h1>
            <p className="text-gray-400 text-sm mt-1">{total} articles total</p>
          </div>
          <Link to="/admin" className="btn-outline text-sm py-2">← Dashboard</Link>
        </div>

        {loading ? <PageLoader /> : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {['Article', 'Author', 'Category', 'Stats', 'Date', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {blogs.map(blog => (
                    <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-5 py-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <img src={blog.featuredImage || `https://source.unsplash.com/40x40/?nepal`}
                            alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                          <p className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm leading-snug">{blog.title}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500">{blog.author?.name}</td>
                      <td className="px-5 py-4"><span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">{blog.category}</span></td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3 text-gray-400 text-xs">
                          <span className="flex items-center gap-1"><FiEye size={11} /> {blog.views}</span>
                          <span className="flex items-center gap-1"><FiHeart size={11} /> {blog.likes?.length || 0}</span>
                          <span className="flex items-center gap-1"><FiMessageSquare size={11} /> {blog.comments?.length || 0}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-xs">{formatRelativeDate(blog.createdAt)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/blog/${blog.slug}`}
                            className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors">
                            <FiEye size={16} />
                          </Link>
                          <button onClick={() => handleDelete(blog._id, blog.title)}
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
