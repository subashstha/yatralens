import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  const delta = 2;
  for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:border-primary-500 hover:text-primary-600 transition-colors">
        <FiChevronLeft size={18} />
      </button>
      {currentPage > 3 && (
        <>
          <button onClick={() => onPageChange(1)} className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 text-sm">1</button>
          {currentPage > 4 && <span className="text-gray-400">…</span>}
        </>
      )}
      {pages.map(page => (
        <button key={page} onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border text-sm font-medium transition-all ${
            page === currentPage
              ? 'bg-primary-600 border-primary-600 text-white shadow-glow'
              : 'border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:text-primary-600'
          }`}>{page}</button>
      ))}
      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && <span className="text-gray-400">…</span>}
          <button onClick={() => onPageChange(totalPages)} className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 text-sm">{totalPages}</button>
        </>
      )}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:border-primary-500 hover:text-primary-600 transition-colors">
        <FiChevronRight size={18} />
      </button>
    </div>
  );
}
