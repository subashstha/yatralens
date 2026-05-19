import { DIFFICULTY_COLORS, CATEGORIES } from '../../utils/constants';

export function DifficultyBadge({ difficulty }) {
  const colorClass = DIFFICULTY_COLORS[difficulty] || 'bg-gray-100 text-gray-800';
  return (
    <span className={`badge ${colorClass}`}>{difficulty}</span>
  );
}

export function CategoryBadge({ category }) {
  const cat = CATEGORIES.find(c => c.name === category);
  const Icon = cat?.icon;
  return (
    <span className={`badge inline-flex items-center gap-1 ${cat?.color || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}>
      {Icon && <Icon size={11} />} {category}
    </span>
  );
}

export function RegionBadge({ region }) {
  return (
    <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
      📍 {region}
    </span>
  );
}
