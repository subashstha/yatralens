import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiBookmark, FiChevronDown, FiSearch } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Explore', path: '/explore' },
  { name: 'Categories', path: '/categories' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearch, setMobileSearch] = useState('');
  const userMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '/about';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handler = e => { if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50);
    const onKey = e => { if (e.key === 'Escape') setSearchOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleMobileSearch = (e) => {
    e.preventDefault();
    if (mobileSearch.trim()) {
      navigate(`/explore?search=${encodeURIComponent(mobileSearch.trim())}`);
      setIsOpen(false);
      setMobileSearch('');
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || isOpen ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <svg width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 4L38 27H12L25 4Z" className="fill-primary-400" opacity="0.6"/>
              <path d="M13 10L26 27H0L13 10Z" className="fill-primary-600"/>
              <path d="M13 10L16.5 17L13 15L9.5 17L13 10Z" fill="white" opacity="0.92"/>
              <path d="M25 4L27.5 10L25 8L22.5 10L25 4Z" fill="white" opacity="0.75"/>
            </svg>
            <div>
              <span className={`font-display font-bold text-lg tracking-tight transition-colors ${!scrolled && !isOpen && isHome ? 'text-white' : 'text-gray-900 dark:text-white'}`}>Explore</span>
              <span className="font-display font-bold text-lg text-primary-500 tracking-tight"> Nepal</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink key={link.path} to={link.path} end={link.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    !scrolled && !isOpen && isHome
                      ? isActive ? 'text-white underline underline-offset-4' : 'text-white/80 hover:text-white'
                      : isActive
                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-950/50 rounded-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'
                  }`
                }
              >{link.name}</NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5">
            {/* Search — desktop & mobile */}
            <button onClick={() => setSearchOpen(true)}
              className={`p-2 rounded-lg transition-colors ${!scrolled && !isOpen && isHome ? 'text-white/80 hover:text-white hover:bg-white/10' : 'btn-ghost'}`}
              aria-label="Search">
              <FiSearch size={20} />
            </button>

            {/* Theme toggle */}
            <button onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${!scrolled && !isOpen && isHome ? 'text-white/80 hover:text-white hover:bg-white/10' : 'btn-ghost'}`}
              aria-label="Toggle theme">
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* User avatar — desktop only */}
            {isAuthenticated ? (
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button onClick={() => setUserMenuOpen(v => !v)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${!scrolled && !isOpen && isHome ? 'hover:bg-white/10' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                  <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=DC143C&color=fff&size=40`}
                    alt={user?.name} className="w-8 h-8 rounded-full object-cover border-2 border-primary-500" />
                  <span className={`text-sm font-medium ${!scrolled && !isOpen && isHome ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}`}>{user?.name?.split(' ')[0]}</span>
                  <FiChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''} ${!scrolled && !isOpen && isHome ? 'text-white/70' : 'text-gray-400'}`} />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                      <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{user?.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{user?.email}</p>
                      </div>
                      {[
                        { icon: FiUser, label: 'My Dashboard', path: '/dashboard' },
                        { icon: FiBookmark, label: 'Saved Places', path: '/dashboard' },
                        ...(isAdmin ? [{ icon: FiSettings, label: 'Admin Panel', path: '/admin' }] : []),
                      ].map(item => (
                        <Link key={item.label} to={item.path} onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <item.icon size={16} /> {item.label}
                        </Link>
                      ))}
                      <button onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors w-full text-left">
                        <FiLogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login"
                  className={`text-sm font-medium px-5 py-2 rounded-full border transition-colors ${
                    !scrolled && !isOpen && isHome
                      ? 'border-white/60 text-white hover:border-white hover:bg-white/10'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600'
                  }`}>Sign In</Link>
                <Link to="/register" className="btn-primary text-sm py-2 rounded-full">Get Started</Link>
              </div>
            )}

            {/* Hamburger — mobile only */}
            <button onClick={() => setIsOpen(v => !v)}
              className={`md:hidden p-2 rounded-lg transition-colors ${!scrolled && !isOpen && isHome ? 'text-white/80 hover:text-white hover:bg-white/10' : 'btn-ghost'}`}>
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="container-custom py-4 flex flex-col gap-1">

              {/* Mobile search */}
              <form onSubmit={handleMobileSearch} className="flex items-center bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-2">
                <FiSearch className="ml-3 text-gray-400 flex-shrink-0" size={16} />
                <input type="text" value={mobileSearch} onChange={e => setMobileSearch(e.target.value)}
                  placeholder="Search destinations..."
                  className="flex-1 px-3 py-2.5 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none" />
                {mobileSearch && (
                  <button type="button" onClick={() => setMobileSearch('')} className="pr-2 text-gray-400">
                    <FiX size={14} />
                  </button>
                )}
              </form>

              {/* Nav links */}
              {navLinks.map(link => (
                <NavLink key={link.path} to={link.path} end={link.path === '/'} onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium ${isActive ? 'text-primary-600 bg-primary-50 dark:bg-primary-950/50' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`
                  }
                >{link.name}</NavLink>
              ))}

              {/* Mobile user section */}
              {isAuthenticated ? (
                <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
                  <div className="flex items-center gap-3 px-4 py-2 mb-1">
                    <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=DC143C&color=fff&size=40`}
                      alt={user?.name} className="w-9 h-9 rounded-full object-cover border-2 border-primary-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  {[
                    { icon: FiUser, label: 'My Dashboard', path: '/dashboard' },
                    { icon: FiBookmark, label: 'Saved Places', path: '/dashboard' },
                    ...(isAdmin ? [{ icon: FiSettings, label: 'Admin Panel', path: '/admin' }] : []),
                  ].map(item => (
                    <Link key={item.label} to={item.path} onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <item.icon size={16} /> {item.label}
                    </Link>
                  ))}
                  <button onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors w-full text-left">
                    <FiLogOut size={16} /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-800 mt-2">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="btn-outline flex-1 text-center text-sm py-2">Sign In</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary flex-1 text-center text-sm py-2">Get Started</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay (desktop + mobile) */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
            onClick={() => setSearchOpen(false)}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              onClick={e => e.stopPropagation()} className="w-full max-w-2xl">
              <form onSubmit={handleSearchSubmit}
                className="flex items-center bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden h-14 md:h-16">
                <FiSearch className="ml-4 md:ml-5 text-gray-400 flex-shrink-0" size={20} />
                <input ref={searchInputRef} type="text" value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search destinations, treks, places..."
                  className="flex-1 px-3 md:px-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-sm md:text-base" />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="p-2 text-gray-400 hover:text-gray-600">
                    <FiX size={16} />
                  </button>
                )}
                <button type="submit"
                  className="mr-2 md:mr-3 px-4 md:px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
                  Search
                </button>
              </form>
              <p className="text-white/50 text-xs text-center mt-3">Press Esc to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
