import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Message sent! We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-12 mb-12">
        <div className="container-custom text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title mb-3">Get in Touch</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="section-subtitle mx-auto">
            Have a question, suggestion, or just want to share your Nepal experience? We'd love to hear from you.
          </motion.p>
        </div>
      </div>

      <div className="container-custom max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: FiMail, title: 'Email Us', value: 'hello@explorenepal.com', sub: 'We reply within 24 hours' },
              { icon: FiPhone, title: 'Call Us', value: '+977 9800000000', sub: 'Mon–Fri, 9am–6pm NST' },
              { icon: FiMapPin, title: 'Visit Us', value: 'Thamel, Kathmandu', sub: 'Nepal 44600' },
            ].map(item => (
              <div key={item.title} className="card p-5 flex items-start gap-4">
                <div className="w-11 h-11 bg-primary-50 dark:bg-primary-950/30 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-0.5">{item.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 card p-8">
            <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Name</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="John Doe" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com" required className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                <input type="text" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  placeholder="How can we help?" required className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Your message..." rows={5} required className="input-field resize-none" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
                {loading ? 'Sending...' : <><FiSend size={16} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
