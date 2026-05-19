import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('/newsletter/subscribe', { email });
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Already subscribed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-primary-gradient overflow-hidden">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiMail size={28} className="text-white" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Nepal
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-white/80 mb-8">
            Get the latest travel tips, hidden gems, and trek guides delivered to your inbox.
          </motion.p>
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50" />
            <button type="submit" disabled={loading}
              className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2 disabled:opacity-70">
              {loading ? 'Subscribing...' : <><span>Subscribe</span><FiArrowRight size={16} /></>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
