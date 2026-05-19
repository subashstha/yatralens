export const formatCurrency = (amount, currency = 'NPR') => {
  if (!amount) return 'Free';
  return `${currency} ${amount.toLocaleString()}`;
};

export const formatBudget = (budget) => {
  if (!budget || (!budget.min && !budget.max)) return 'Contact for price';
  const curr = budget.currency || 'NPR';
  if (budget.min === budget.max) return formatCurrency(budget.min, curr);
  return `${curr} ${budget.min?.toLocaleString()} - ${budget.max?.toLocaleString()}`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const getDurationText = (duration) => {
  if (!duration) return '';
  const { min, max, unit } = duration;
  if (min === max) return `${min} ${unit}`;
  return `${min}-${max} ${unit}`;
};

export const getAltitudeText = (altitude) => {
  if (!altitude || altitude === 0) return '';
  return `${altitude.toLocaleString()}m`;
};

export const getImageUrl = (url, fallback = '/placeholder.jpg') => {
  if (!url) return fallback;
  return url;
};

export const slugify = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const cn = (...classes) => classes.filter(Boolean).join(' ');
