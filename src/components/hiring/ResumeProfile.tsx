import { Star, Users, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ResumeProfileProps } from './types';

export function ResumeProfile({ agent }: ResumeProfileProps) {
  const Icon = agent.icon;
  
  return (
    <div className="h-full flex flex-col bg-stone-50/50 p-6 overflow-y-auto">
      {/* Avatar & Name */}
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 animate-pulse">
            <Icon size={48} className="text-orange-600" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </div>
        <h2 className="text-xl font-bold text-stone-900">{agent.displayName}</h2>
        <p className="text-sm text-stone-500 mt-1">{agent.name}</p>
      </div>

      {/* Tagline */}
      <div className="mb-6 p-4 bg-white rounded-xl border border-stone-200">
        <p className="font-serif text-stone-700 italic text-center">
          "{agent.tagline}"
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-stone-900">
            <Users size={16} className="text-stone-400" />
            <span className="font-bold">{agent.teamsServed.toLocaleString()}</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">Teams Served</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-stone-900">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-bold">{agent.rating}</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">{agent.reviews} Reviews</p>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {agent.skills.map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="text-xs bg-white border border-stone-200"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Required Permissions */}
      <div className="mt-auto">
        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">
          Required Permissions
        </h3>
        <div className="space-y-2">
          {agent.permissions.map((permission) => (
            <div 
              key={permission}
              className="flex items-center gap-2 text-sm text-stone-600 bg-white px-3 py-2 rounded-lg border border-stone-200"
            >
              <Lock size={14} className="text-stone-400" />
              <span>{permission}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mt-6 pt-4 border-t border-stone-200 text-center">
        <div className="text-2xl font-bold text-orange-600">{agent.price}</div>
        <p className="text-xs text-stone-500 mt-1">Billed monthly</p>
      </div>
    </div>
  );
}
