import { FiCompass, FiTrendingUp, FiCoffee, FiStar, FiZap, FiSun, FiNavigation, FiMap } from 'react-icons/fi';

export const API_BASE_URL = '/api/v1';

export const REGIONS = ['Koshi', 'Madhesh', 'Bagmati', 'Gandaki', 'Lumbini', 'Karnali', 'Sudurpashchim'];

export const DIFFICULTIES = ['Easy', 'Moderate', 'Hard', 'Extreme'];

export const CATEGORY_ICONS = {
  'Trekking': FiCompass,
  'Hiking': FiTrendingUp,
  'Cafe': FiCoffee,
  'Hidden Gem': FiStar,
  'Adventure': FiZap,
  'Religious': FiSun,
  'Short Ride': FiNavigation,
  'Weekend Trip': FiMap,
};

export const CATEGORIES = [
  { name: 'Trekking', icon: FiCompass, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { name: 'Hiking', icon: FiTrendingUp, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  { name: 'Cafe', icon: FiCoffee, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
  { name: 'Hidden Gem', icon: FiStar, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  { name: 'Adventure', icon: FiZap, color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  { name: 'Religious', icon: FiSun, color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
  { name: 'Short Ride', icon: FiNavigation, color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200' },
  { name: 'Weekend Trip', icon: FiMap, color: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200' },
];

export const DIFFICULTY_COLORS = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Moderate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Hard: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Extreme: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter', 'All Year'];

export const BLOG_CATEGORIES = ['Trek Guide', 'Budget Travel', 'Local Experience', 'Adventure', 'Culture', 'Food', 'Photography', 'Tips'];

export const NEPAL_CENTER = [28.3949, 84.1240];

export const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=DC143C&color=fff&size=128';
