import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiKey, FiCopy, FiCheck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SPECIAL = '!@#$%^&*_+-=';
const ALL = UPPER + LOWER + DIGITS + SPECIAL;

function generateStrongPassword() {
  const pick = (set) => { const r = new Uint32Array(1); crypto.getRandomValues(r); return set[r[0] % set.length]; };
  const arr = new Uint32Array(14);
  crypto.getRandomValues(arr);
  const base = Array.from(arr, n => ALL[n % ALL.length]);
  base[0] = pick(UPPER); base[1] = pick(LOWER); base[2] = pick(DIGITS); base[3] = pick(SPECIAL);
  for (let i = base.length - 1; i > 0; i--) {
    const s = new Uint32Array(1); crypto.getRandomValues(s);
    const j = s[0] % (i + 1);
    [base[i], base[j]] = [base[j], base[i]];
  }
  return base.join('');
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [copied, setCopied] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSuggest = () => {
    const pwd = generateStrongPassword();
    setSuggestion(pwd);
    setForm(f => ({ ...f, password: pwd, confirmPassword: pwd }));
    setShowPassword(true);
  };

  const handleCopySuggestion = async () => {
    await navigator.clipboard.writeText(suggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Join YatraLens</h1>
            <p className="text-gray-400 mt-1 text-sm">Start your Nepal adventure today</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl p-3 text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { field: 'name', label: 'Full Name', type: 'text', icon: FiUser, placeholder: 'John Doe' },
              { field: 'email', label: 'Email Address', type: 'email', icon: FiMail, placeholder: 'you@example.com' },
            ].map(({ field, label, type, icon: Icon, placeholder }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type={type} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    placeholder={placeholder} required className="input-field pl-11" />
                </div>
              </div>
            ))}

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <button type="button" onClick={handleSuggest}
                  className="flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  <FiKey size={12} /> Suggest strong password
                </button>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Min 6 characters" required className="input-field pl-11 pr-12" />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {/* Suggestion box */}
              {suggestion && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-2 bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 rounded-xl px-3 py-2.5">
                  <FiKey size={13} className="text-primary-500 flex-shrink-0" />
                  <span className="flex-1 font-mono text-xs text-gray-800 dark:text-gray-100 tracking-wide break-all">
                    {suggestion}
                  </span>
                  <button type="button" onClick={handleCopySuggestion}
                    className="text-gray-400 hover:text-primary-600 transition-colors flex-shrink-0 p-0.5" title="Copy">
                    {copied ? <FiCheck size={13} className="text-green-500" /> : <FiCopy size={13} />}
                  </button>
                </motion.div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type={showPassword ? 'text' : 'password'} value={form.confirmPassword}
                  onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                  placeholder="Repeat password" required className="input-field pl-11 pr-12" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:underline">Sign in</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
