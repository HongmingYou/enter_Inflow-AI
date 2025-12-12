import { useState } from 'react';
import { Check, ChevronDown, GitBranch, Lock, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { RepositorySelectorProps, Repository } from './types';

// Mock repositories for demo
const MOCK_REPOSITORIES: Repository[] = [
  { id: '1', name: 'frontend-app', fullName: 'acme/frontend-app', isPrivate: false, language: 'TypeScript', starCount: 124 },
  { id: '2', name: 'backend-api', fullName: 'acme/backend-api', isPrivate: true, language: 'Python', starCount: 89 },
  { id: '3', name: 'mobile-app', fullName: 'acme/mobile-app', isPrivate: true, language: 'Swift', starCount: 56 },
  { id: '4', name: 'design-system', fullName: 'acme/design-system', isPrivate: false, language: 'TypeScript', starCount: 234 },
  { id: '5', name: 'data-pipeline', fullName: 'acme/data-pipeline', isPrivate: true, language: 'Python', starCount: 12 },
];

export function RepositorySelector({ 
  repositories, 
  selectedIds, 
  onSelectionChange 
}: RepositorySelectorProps) {
  // Use mock data if no repositories provided
  const repoList = repositories && repositories.length > 0 ? repositories : MOCK_REPOSITORIES;
  const [isOpen, setIsOpen] = useState(false);

  const toggleRepository = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter(i => i !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const selectedCount = selectedIds.length;

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 border-stone-200 rounded-xl hover:border-orange-300 transition-colors"
      >
        <div className="flex items-center gap-2">
          <GitBranch size={18} className="text-stone-400" />
          <span className="text-stone-700">
            {selectedCount === 0 
              ? 'Select repositories...' 
              : `${selectedCount} ${selectedCount === 1 ? 'repository' : 'repositories'} selected`
            }
          </span>
        </div>
        <ChevronDown 
          size={18} 
          className={`text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-[100] w-full bottom-full mb-2 bg-white border-2 border-stone-200 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto">
              {repoList.map((repo) => {
                const isSelected = selectedIds.includes(repo.id);
                return (
                  <button
                    key={repo.id}
                    onClick={() => toggleRepository(repo.id)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 text-left
                      hover:bg-stone-50 transition-colors
                      ${isSelected ? 'bg-orange-50' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center
                        ${isSelected 
                          ? 'bg-orange-500 border-orange-500' 
                          : 'border-stone-300'
                        }
                      `}>
                        {isSelected && <Check size={12} className="text-white" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-stone-900">{repo.name}</span>
                          {repo.isPrivate ? (
                            <Lock size={12} className="text-stone-400" />
                          ) : (
                            <Globe size={12} className="text-stone-400" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <span>{repo.fullName}</span>
                          {repo.language && (
                            <>
                              <span>·</span>
                              <span>{repo.language}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {selectedCount > 0 && (
              <div className="border-t border-stone-200 px-4 py-2 bg-stone-50">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Confirm Selection
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
