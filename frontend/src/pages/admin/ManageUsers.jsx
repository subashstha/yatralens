import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiTrash2, FiShield } from 'react-icons/fi';
import { adminService } from '../../services/adminService';
import { Link } from 'react-router-dom';
import { PageLoader } from '../../components/common/LoadingSkeleton';
import { formatDate } from '../../utils/helpers';
import Pagination from '../../components/common/Pagination';
import toast from 'react-hot-toast';

function RoleSelect({ userId, currentRole, onRoleChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <div className="relative inline-block" ref={ref}>
      <button onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-1.5 text-xs pl-2.5 pr-2 py-1 rounded-lg border font-medium cursor-pointer focus:outline-none transition-colors ${currentRole === 'admin' ? 'bg-primary-50 dark:bg-primary-950/30 border-primary-200 text-primary-700' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}>
        {currentRole === 'admin' ? 'Admin' : 'User'}
        <svg className={`w-3 h-3 text-gray-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden py-1">
          {['user', 'admin'].map(role => (
            <button key={role} onClick={() => { onRoleChange(userId, role); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs capitalize transition-colors ${currentRole === role ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const fetchData = () => {
    setLoading(true);
    adminService.getUsers({ page, limit: 20 })
      .then(r => { setUsers(r.data.users); setTotal(r.data.total); })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, [page]);

  const handleRoleChange = async (id, role) => {
    try {
      const res = await adminService.updateUserRole(id, role);
      setUsers(prev => prev.map(u => u._id === id ? res.data.user : u));
      toast.success('Role updated');
    } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"?`)) return;
    try {
      await adminService.deleteUser(id);
      toast.success('User deleted');
      fetchData();
    } catch { toast.error('Failed'); }
  };

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
            <p className="text-gray-400 text-sm mt-1">{total} users total</p>
          </div>
          <Link to="/admin" className="btn-outline text-sm py-2">← Dashboard</Link>
        </div>

        <div className="relative mb-6 max-w-sm">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search users..." className="input-field pl-11 py-2.5" />
        </div>

        {loading ? <PageLoader /> : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {['User', 'Email', 'Role', 'Joined', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filtered.map(user => (
                    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=DC143C&color=fff&size=32`}
                            alt="" className="w-9 h-9 rounded-xl object-cover" />
                          <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500">{user.email}</td>
                      <td className="px-5 py-4">
                        <RoleSelect userId={user._id} currentRole={user.role} onRoleChange={handleRoleChange} />
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-xs">{formatDate(user.createdAt)}</td>
                      <td className="px-5 py-4">
                        <button onClick={() => handleDelete(user._id, user.name)}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors">
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
