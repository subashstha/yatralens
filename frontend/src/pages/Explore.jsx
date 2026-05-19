import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiList, FiSliders, FiMap } from 'react-icons/fi';
import DestinationCard from '../components/destinations/DestinationCard';
import DestinationFilters from '../components/destinations/DestinationFilters';
import Pagination from '../components/common/Pagination';
import SearchBar from '../components/common/SearchBar';
import { DestinationCardSkeleton } from '../components/common/LoadingSkeleton';
import MapView from '../components/destinations/MapView';
import { destinationService } from '../services/destinationService';

const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest First' },
  { value: '-averageRating', label: 'Top Rated' },
  { value: '-views', label: 'Most Visited' },
  { value: 'budget.min', label: 'Budget: Low to High' },
  { value: '-budget.min', label: 'Budget: High to Low' },
];

const DISPLAY_CURRENCIES = ['NPR', 'USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY'];

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [showMap, setShowMap] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [displayCurrency, setDisplayCurrency] = useState('NPR');
  const [currencyRate, setCurrencyRate] = useState(1);
  const [ratesMap, setRatesMap] = useState({});
  const sortRef = useRef(null);
  const currencyRef = useRef(null);

  const [filters, setFilters] = useState({
    region: searchParams.get('region') || '',
    difficulty: searchParams.get('difficulty') || '',
    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
    minBudget: 0,
    maxBudget: 100000,
  });
  const [sort, setSort] = useState(searchParams.get('sort') || '-createdAt');
  const [page, setPage] = useState(1);

  const search = searchParams.get('search') || '';

  const fetchDestinations = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 12,
        sort,
        ...(search && { search }),
        ...(filters.region && { region: filters.region }),
        ...(filters.difficulty && { difficulty: filters.difficulty }),
        ...(filters.categories?.length && { category: filters.categories.join(',') }),
        ...(filters.minBudget > 0 && { minBudget: filters.minBudget }),
        ...(filters.maxBudget < 100000 && { maxBudget: filters.maxBudget }),
      };
      const res = await destinationService.getAll(params);
      setDestinations(res.data.destinations);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [page, sort, filters, search]);

  useEffect(() => {
    const t = setTimeout(fetchDestinations, 300);
    return () => clearTimeout(t);
  }, [fetchDestinations]);

  useEffect(() => {
    const handleClick = e => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
      if (currencyRef.current && !currencyRef.current.contains(e.target)) setCurrencyOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/NPR')
      .then(r => r.json())
      .then(data => { if (data.result === 'success') setRatesMap(data.rates); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setCurrencyRate(displayCurrency === 'NPR' ? 1 : (ratesMap[displayCurrency] || 1));
  }, [displayCurrency, ratesMap]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ region: '', difficulty: '', categories: [], minBudget: 0, maxBudget: 100000 });
    setPage(1);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
        <div className="container-custom">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-title mb-3">
            Explore Nepal
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-gray-500 dark:text-gray-400 mb-6">
            Discover {total > 0 ? `${total} incredible` : 'incredible'} destinations across Nepal
          </motion.p>
          <SearchBar initialValue={search} className="max-w-2xl" />
        </div>
      </div>

      <div className="container-custom mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 shrink-0">
            <DestinationFilters filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="text-gray-500 text-sm">
                {loading ? 'Searching...' : `${total} destinations found`}
                {search && <span className="font-medium text-gray-700 dark:text-gray-300"> for "{search}"</span>}
              </p>
              <div className="flex items-center gap-3">
                {/* Currency */}
                <div className="relative" ref={currencyRef}>
                  <button onClick={() => setCurrencyOpen(v => !v)}
                    className="flex items-center gap-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl pl-3 pr-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:border-primary-500 transition-colors whitespace-nowrap">
                    {displayCurrency}
                    <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform flex-shrink-0 ${currencyOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {currencyOpen && (
                    <div className="absolute right-0 top-full mt-1 w-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                      {DISPLAY_CURRENCIES.map(c => (
                        <button key={c} onClick={() => { setDisplayCurrency(c); setCurrencyOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${displayCurrency === c ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 font-medium' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Sort */}
                <div className="relative" ref={sortRef}>
                  <button onClick={() => setSortOpen(v => !v)}
                    className="flex items-center gap-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl pl-3 pr-3 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:border-primary-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 cursor-pointer transition-colors whitespace-nowrap">
                    {SORT_OPTIONS.find(o => o.value === sort)?.label}
                    <svg className={`w-3.5 h-3.5 text-gray-400 transition-transform flex-shrink-0 ${sortOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                      {SORT_OPTIONS.map(opt => (
                        <button key={opt.value} onClick={() => { setSort(opt.value); setPage(1); setSortOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sort === opt.value ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 font-medium' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* View mode */}
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                  <button onClick={() => setViewMode('grid')}
                    className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}>
                    <FiGrid size={16} />
                  </button>
                  <button onClick={() => setViewMode('list')}
                    className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}>
                    <FiList size={16} />
                  </button>
                  <button onClick={() => setShowMap(v => !v)}
                    className={`p-2.5 ${showMap ? 'bg-primary-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}>
                    <FiMap size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Map view */}
            {showMap && (
              <div className="mb-6">
                <MapView destinations={destinations} />
              </div>
            )}

            {/* Grid */}
            {loading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {Array.from({ length: 12 }).map((_, i) => <DestinationCardSkeleton key={i} />)}
              </div>
            ) : destinations.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No destinations found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters or search term</p>
                <button onClick={handleClearFilters} className="btn-primary">Clear Filters</button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {destinations.map((dest, i) => <DestinationCard key={dest._id} destination={dest} index={i} displayCurrency={displayCurrency} currencyRate={currencyRate} />)}
              </div>
            )}

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
