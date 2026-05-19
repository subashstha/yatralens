import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiEye, FiHeart, FiShare2, FiMessageSquare, FiArrowLeft } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi';
import { blogService } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import { formatRelativeDate, formatDate } from '../utils/helpers';
import { PageLoader } from '../components/common/LoadingSkeleton';
import toast from 'react-hot-toast';

export default function BlogDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    blogService.getOne(slug)
      .then(r => {
        setBlog(r.data.blog);
        setLikeCount(r.data.blog.likes?.length || 0);
        setLiked(r.data.blog.likes?.includes(user?._id));
      })
      .catch(() => navigate('/blog'))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const handleLike = async () => {
    if (!isAuthenticated) { toast.error('Please login to like'); return; }
    try {
      const res = await blogService.like(blog._id);
      setLiked(res.data.liked);
      setLikeCount(res.data.likes);
    } catch { toast.error('Failed'); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    if (!isAuthenticated) { toast.error('Please login'); return; }
    setSubmitting(true);
    try {
      const res = await blogService.addComment(blog._id, { comment });
      setBlog(prev => ({ ...prev, comments: res.data.comments }));
      setComment('');
      toast.success('Comment added!');
    } catch { toast.error('Failed'); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="pt-20"><PageLoader /></div>;
  if (!blog) return null;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-custom max-w-4xl py-8">
        <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-sm mb-8 transition-colors">
          <FiArrowLeft size={18} /> Back to Blog
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block text-xs bg-primary-600 text-white px-3 py-1 rounded-lg font-medium mb-4">{blog.category}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <img src={blog.author?.avatar || `https://ui-avatars.com/api/?name=${blog.author?.name}&background=DC143C&color=fff&size=32`}
                alt={blog.author?.name} className="w-8 h-8 rounded-full" />
              <span className="text-gray-600 dark:text-gray-400 font-medium">{blog.author?.name}</span>
            </div>
            <span>{formatDate(blog.createdAt)}</span>
            <span className="flex items-center gap-1"><FiClock size={14} /> {blog.readTime} min read</span>
            <span className="flex items-center gap-1"><FiEye size={14} /> {blog.views}</span>
          </div>
        </motion.div>

        {/* Featured image */}
        {blog.featuredImage && (
          <div className="rounded-2xl overflow-hidden mb-8 h-72 md:h-96">
            <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none mb-10 text-gray-700 dark:text-gray-300 leading-relaxed" style={{ lineHeight: '1.9' }}>
          {blog.content.split('\n').map((para, i) => para.trim() ? <p key={i}>{para}</p> : <br key={i} />)}
        </div>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
            {blog.tags.map(tag => (
              <span key={tag} className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-lg">#{tag}</span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 mb-10">
          <button onClick={handleLike} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all ${liked ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-600' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-red-300'}`}>
            {liked ? <HiHeart size={18} /> : <FiHeart size={18} />}
            <span className="font-medium">{likeCount}</span>
          </button>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-primary-300 transition-all">
            <FiShare2 size={18} /> Share
          </button>
        </div>

        {/* Comments */}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-6 flex items-center gap-2">
            <FiMessageSquare size={20} /> Comments ({blog.comments?.length || 0})
          </h3>
          <form onSubmit={handleComment} className="mb-8">
            <textarea value={comment} onChange={e => setComment(e.target.value)}
              placeholder={isAuthenticated ? 'Share your thoughts...' : 'Please login to comment'}
              disabled={!isAuthenticated} rows={3}
              className="input-field resize-none mb-3" maxLength={500} />
            {isAuthenticated ? (
              <button type="submit" disabled={submitting || !comment.trim()} className="btn-primary">
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            ) : (
              <Link to="/login" className="btn-primary inline-block">Sign in to Comment</Link>
            )}
          </form>
          <div className="space-y-4">
            {blog.comments?.map((c, i) => (
              <div key={i} className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                <img src={c.user?.avatar || `https://ui-avatars.com/api/?name=${c.user?.name}&background=DC143C&color=fff&size=32`}
                  alt={c.user?.name} className="w-9 h-9 rounded-full shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{c.user?.name}</span>
                    <span className="text-xs text-gray-400">{formatRelativeDate(c.createdAt)}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{c.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
