import { motion } from 'framer-motion';
import { FileText, Presentation, Network, MoreHorizontal, Trash2, Edit2, Pin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale/zh-CN';
import { ProjectData, ProjectType } from '@/types/project';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProjectListItemProps {
  project: ProjectData;
  viewMode: 'list' | 'grid';
  onClick: (projectId: string) => void;
}

const getProjectIcon = (type: ProjectType) => {
  switch (type) {
    case 'note':
      return <FileText size={16} className="text-blue-600" />;
    case 'deck':
      return <Presentation size={16} className="text-orange-600" />;
    case 'mindmap':
      return <Network size={16} className="text-purple-600" />;
  }
};

const getProjectTypeLabel = (type: ProjectType) => {
  switch (type) {
    case 'note':
      return 'Note';
    case 'deck':
      return 'Deck';
    case 'mindmap':
      return 'Mindmap';
  }
};

export function ProjectListItem({ project, viewMode, onClick }: ProjectListItemProps) {
  const [showActions, setShowActions] = useState(false);

  const timeAgo = formatDistanceToNow(project.lastModified, {
    addSuffix: true,
    locale: zhCN,
  });

  if (viewMode === 'grid') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        onClick={() => onClick(project.id)}
        className="bg-white border border-stone-200 rounded-xl p-4 hover:border-orange-200 hover:shadow-md transition-all cursor-pointer group"
      >
        {/* Thumbnail or Icon */}
        <div className="w-full h-32 bg-stone-100 rounded-lg mb-3 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white border-2 border-stone-200 flex items-center justify-center">
            {getProjectIcon(project.type)}
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm text-stone-900 line-clamp-2 flex-1 group-hover:text-orange-700 transition-colors">
              {project.name}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-stone-100 rounded transition-opacity"
                >
                  <MoreHorizontal size={14} className="text-stone-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit2 size={14} className="mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pin size={14} className="mr-2" />
                  Pin
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 size={14} className="mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-mono">{project.sourcesCount} sources</span>
            <span>·</span>
            <span>{timeAgo}</span>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            {project.status === 'published' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Published
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                Draft
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // List View
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: 'rgb(249 250 251)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={() => onClick(project.id)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="h-16 flex items-center gap-4 px-4 border-b border-stone-200 hover:border-transparent cursor-pointer group"
    >
      {/* Type Icon */}
      <div className="flex-shrink-0">
        {getProjectIcon(project.type)}
      </div>

      {/* Project Name */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-stone-900 truncate group-hover:text-orange-700 transition-colors">
          {project.name}
        </h3>
      </div>

      {/* Type Label */}
      <div className="flex-shrink-0 w-20 text-xs text-stone-500 font-mono">
        {getProjectTypeLabel(project.type)}
      </div>

      {/* Sources Count */}
      <div className="flex-shrink-0 w-24 text-xs text-stone-500 font-mono">
        {project.sourcesCount} sources
      </div>

      {/* Last Modified */}
      <div className="flex-shrink-0 w-32 text-xs text-stone-500">
        {timeAgo}
      </div>

      {/* Status */}
      <div className="flex-shrink-0 w-24">
        {project.status === 'published' ? (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Published
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-stone-500">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
            Draft
          </span>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className={`p-1.5 hover:bg-stone-200 rounded transition-all ${
                showActions ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <MoreHorizontal size={16} className="text-stone-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit2 size={14} className="mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pin size={14} className="mr-2" />
              Pin
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 size={14} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}

