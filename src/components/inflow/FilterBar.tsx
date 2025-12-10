import { motion } from 'framer-motion';
import { Mail, Github, Twitter, Slack, FileText, Trello } from 'lucide-react';
import { CategoryType, SourcePlatform } from './types';

interface FilterBarProps {
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  selectedSource: SourcePlatform | 'all';
  onSourceChange: (source: SourcePlatform | 'all') => void;
}

const categories: { value: CategoryType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'business', label: 'Business' },
  { value: 'product', label: 'Product' },
  { value: 'competitor', label: 'Competitor' },
];

const sources: { value: SourcePlatform | 'all'; icon: React.ComponentType<{ size: number; className?: string }>; label: string }[] = [
  { value: 'all', icon: () => <span className="text-xs font-bold">ALL</span>, label: 'All' },
  { value: 'gmail', icon: Mail, label: 'Gmail' },
  { value: 'github', icon: Github, label: 'GitHub' },
  { value: 'twitter', icon: Twitter, label: 'Twitter' },
  { value: 'slack', icon: Slack, label: 'Slack' },
  { value: 'linear', icon: Trello, label: 'Linear' },
  { value: 'notion', icon: FileText, label: 'Notion' },
];

export function FilterBar({ 
  selectedCategory, 
  onCategoryChange, 
  selectedSource, 
  onSourceChange 
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
      {/* Category Tabs - macOS style segmented control */}
      <div className="flex items-center gap-1 bg-stone-100/50 rounded-lg p-1">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className="relative px-4 py-1.5 text-sm font-medium transition-colors rounded-md"
          >
            {selectedCategory === category.value && (
              <motion.div
                layoutId="category-bg"
                className="absolute inset-0 bg-white rounded-md shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${
                selectedCategory === category.value
                  ? 'text-stone-900'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              {category.label}
            </span>
          </button>
        ))}
      </div>

      {/* Source Icons - Secondary Filter */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
        <span className="text-xs text-stone-400 font-mono uppercase tracking-wider mr-2 whitespace-nowrap">
          Source:
        </span>
        {sources.map((source) => {
          const Icon = source.icon;
          const isSelected = selectedSource === source.value;
          
          return (
            <button
              key={source.value}
              onClick={() => onSourceChange(source.value)}
              title={source.label}
              className={`relative p-2 rounded-lg transition-all hover:bg-stone-100 ${
                isSelected
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              <Icon size={14} className={isSelected ? 'text-white' : ''} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

