import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiBookmark, FiSettings, FiCamera } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import DestinationCard from '../components/destinations/DestinationCard';
import { PageLoader } from '../components/common/LoadingSkeleton';
import toast from 'react-hot-toast';

const tabs = [
  { id: 'profile', label: 'Profile', icon: FiUser },
  { id: 'saved', label: 'Saved', icon: FiBookmark },
  { id: 'settings', label: 'Settings', icon: FiSettings },
];

export default function UserDashboard() {
  const { user, updateUser, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', bio: user?.bio || '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const avatarInputRef = useRef(null);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return; }
    setAvatarUploading(true);
    try {
      const uploadRes = await authService.uploadAvatar(file);
      const avatarUrl = uploadRes.data.url;
      const profileRes = await authService.updateProfile({ name: user.name, bio: user.bio || '', avatar: avatarUrl });
      updateUser(profileRes.data.user);
      toast.success('Avatar updated!');
    } catch { toast.error('Failed to upload avatar'); }
    finally { setAvatarUploading(false); e.target.value = ''; }
  };

  useEffect(() => {
    if (activeTab === 'saved') {
      setSavedLoading(true);
      authService.saveDestination &&
      import('../services/api').then(({ default: api }) =>
        api.get('/users/saved')
          .then(r => setSavedDestinations(r.data.destinations))
          .catch(console.error)
          .finally(() => setSavedLoading(false))
      );
    }
  }, [activeTab]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await authService.updateProfile(profileForm);
      updateUser(res.data.user);
      toast.success('Profile updated!');
    } catch { toast.error('Failed to update profile'); }
    finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) { toast.error('Passwords do not match'); return; }
    setSaving(true);
    try {
      await authService.changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      toast.success('Password changed!');
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setSaving(false); }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-custom max-w-6xl py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 text-center mb-6">
              <div className="relative inline-block mb-4">
                <button onClick={() => avatarInputRef.current?.click()} disabled={avatarUploading}
                  className="relative group block w-24 h-24 rounded-2xl overflow-hidden mx-auto focus:outline-none">
                  <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=DC143C&color=fff&size=128`}
                    alt={user?.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {avatarUploading
                      ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      : <FiCamera size={20} className="text-white" />}
                  </div>
                </button>
                <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                {isAdmin && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">Admin</span>
                )}
              </div>
              <h2 className="font-bold text-gray-900 dark:text-white">{user?.name}</h2>
              <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
              {user?.bio && <p className="text-gray-500 text-sm mt-3 leading-relaxed">{user.bio}</p>}
            </div>
            <nav className="card overflow-hidden">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 border-r-2 border-primary-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}>
                  <tab.icon size={16} /> {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6">Edit Profile</h3>
                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                    <input type="text" value={profileForm.name} onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
                      className="input-field" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
                    <textarea value={profileForm.bio} onChange={e => setProfileForm(f => ({ ...f, bio: e.target.value }))}
                      className="input-field resize-none" rows={3} placeholder="Tell us about yourself..." maxLength={300} />
                    <p className="text-xs text-gray-400 mt-1">{profileForm.bio.length}/300</p>
                  </div>
                  <button type="submit" disabled={saving} className="btn-primary">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </motion.div>
            )}

            {activeTab === 'saved' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6">Saved Destinations ({savedDestinations.length})</h3>
                {savedLoading ? <PageLoader /> : savedDestinations.length === 0 ? (
                  <div className="text-center py-16 card">
                    <p className="text-4xl mb-3">🔖</p>
                    <p className="text-gray-400">No saved destinations yet. Explore and bookmark places you love!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {savedDestinations.map((dest, i) => <DestinationCard key={dest._id} destination={dest} index={i} />)}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6">Change Password</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  {[
                    { field: 'currentPassword', label: 'Current Password', placeholder: 'Enter current password' },
                    { field: 'newPassword', label: 'New Password', placeholder: 'Min 6 characters' },
                    { field: 'confirmPassword', label: 'Confirm New Password', placeholder: 'Repeat new password' },
                  ].map(({ field, label, placeholder }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
                      <input type="password" value={pwForm[field]} onChange={e => setPwForm(f => ({ ...f, [field]: e.target.value }))}
                        placeholder={placeholder} className="input-field" required />
                    </div>
                  ))}
                  <button type="submit" disabled={saving} className="btn-primary">
                    {saving ? 'Saving...' : 'Change Password'}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
