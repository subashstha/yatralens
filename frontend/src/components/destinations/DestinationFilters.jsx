import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiCheck } from 'react-icons/fi';
import { REGIONS, DIFFICULTIES, CATEGORIES } from '../../utils/constants';

function BudgetRangeSlider({ minBudget, maxBudget, onChange }) {
  const trackRef = useRef(null);
  const draggingRef = useRef(null);
  const valRef = useRef({ minBudget, maxBudget, onChange });
  valRef.current = { minBudget, maxBudget, onChange };

  useEffect(() => {
    const onMove = (e) => {
      if (!draggingRef.current || !trackRef.current) return;
      const { minBudget, maxBudget, onChange } = valRef.current;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const val = Math.round((ratio * 100000) / 1000) * 1000;
      if (draggingRef.current === 'min') onChange('minBudget', Math.min(val, maxBudget - 5000));
      else onChange('maxBudget', Math.max(val, minBudget + 5000));
    };
    const onUp = () => { draggingRef.current = null; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  const minPct = (minBudget / 100000) * 100;
  const maxPct = (maxBudget / 100000) * 100;

  return (
    <div className="relative h-6 flex items-center select-none" ref={trackRef}>
      <div className="absolute w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div
        className="absolute h-1.5 bg-primary-600 rounded-full pointer-events-none"
        style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
      />
      <div
        className="absolute w-4 h-4 rounded-full bg-primary-600 border-2 border-white dark:border-gray-900 shadow cursor-grab active:cursor-grabbing touch-none z-10"
        style={{ left: `calc(${minPct}% - 8px)` }}
        onPointerDown={(e) => { e.preventDefault(); draggingRef.current = 'min'; }}
      />
      <div
        className="absolute w-4 h-4 rounded-full bg-primary-600 border-2 border-white dark:border-gray-900 shadow cursor-grab active:cursor-grabbing touch-none z-10"
        style={{ left: `calc(${maxPct}% - 8px)` }}
        onPointerDown={(e) => { e.preventDefault(); draggingRef.current = 'max'; }}
      />
    </div>
  );
}

function FilterPanel({ filters, onChange, onClear }) {
  return (
    <div className="space-y-6">

      {/* Region */}
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm uppercase tracking-wide">Region</h4>
        <div className="space-y-2">
          {['All Regions', ...REGIONS].map(region => {
            const active = region === 'All Regions' ? !filters.region : filters.region === region;
            return (
              <div
                key={region}
                onClick={() => onChange('region', region === 'All Regions' ? '' : region)}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className={`w-4 h-4 rounded-full flex-shrink-0 transition-all border-2 ${
                  active
                    ? 'border-primary-600 border-[5px]'
                    : 'border-gray-300 dark:border-gray-600'
                }`} />
                <span className={`text-sm transition-colors ${
                  active
                    ? 'text-primary-600 font-medium'
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                }`}>{region}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm uppercase tracking-wide">Difficulty</h4>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map(diff => (
            <button key={diff} type="button"
              onClick={() => onChange('difficulty', filters.difficulty === diff ? '' : diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filters.difficulty === diff
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}>{diff}</button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm uppercase tracking-wide">Category</h4>
        <div className="space-y-2">
          {CATEGORIES.map(cat => {
            const active = filters.categories?.includes(cat.name);
            return (
              <div
                key={cat.name}
                onClick={() => {
                  const current = filters.categories || [];
                  onChange('categories', active ? current.filter(c => c !== cat.name) : [...current, cat.name]);
                }}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all ${
                  active
                    ? 'bg-primary-600 border-primary-600'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {active && <FiCheck size={10} className="text-white" strokeWidth={3} />}
                </div>
                <span className={`text-sm transition-colors ${
                  active
                    ? 'text-primary-600 font-medium'
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                }`}>
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Range */}
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 text-sm uppercase tracking-wide">Budget (NPR)</h4>
        <div className="flex justify-between text-xs font-semibold text-primary-600 mb-3">
          <span>{Number(filters.minBudget || 0).toLocaleString()}</span>
          <span>{Number(filters.maxBudget || 100000).toLocaleString()}</span>
        </div>
        <BudgetRangeSlider
          minBudget={filters.minBudget || 0}
          maxBudget={filters.maxBudget || 100000}
          onChange={onChange}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Free</span>
          <span>NPR 1,00,000</span>
        </div>
      </div>

      <button onClick={onClear} className="w-full flex items-center justify-center gap-2 text-sm text-red-500 hover:text-red-600 py-2 border border-red-200 dark:border-red-900 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
        <FiX size={14} /> Clear Filters
      </button>
    </div>
  );
}

export default function DestinationFilters({ filters, onChange, onClear }) {
  const [showMobile, setShowMobile] = useState(false);

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden lg:block">
        <div className="card p-6 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FiFilter size={18} /> Filters
            </h3>
          </div>
          <FilterPanel filters={filters} onChange={onChange} onClear={onClear} />
        </div>
      </div>

      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button onClick={() => setShowMobile(true)}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:border-primary-500 hover:text-primary-600 transition-colors">
          <FiFilter size={16} /> Filters
          {Object.values(filters).some(v => v && (Array.isArray(v) ? v.length > 0 : true)) && (
            <span className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">!</span>
          )}
        </button>
      </div>

      {/* Mobile filter drawer */}
      {showMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobile(false)} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white">Filters</h3>
              <button onClick={() => setShowMobile(false)} className="text-gray-400 hover:text-gray-600"><FiX size={22} /></button>
            </div>
            <FilterPanel filters={filters} onChange={onChange} onClear={onClear} />
          </motion.div>
        </div>
      )}
    </>
  );
}
