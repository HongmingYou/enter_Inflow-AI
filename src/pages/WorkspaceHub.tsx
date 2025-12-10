import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Grid, List, Activity } from 'lucide-react';
import { MOCK_DATA } from '@/components/inflow/data';
import { MOCK_PROJECTS } from '@/data/mockProjects';
import { AgentStreamCard } from '@/components/workspace/AgentStreamCard';
import { ProjectListItem } from '@/components/workspace/ProjectListItem';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function WorkspaceHub() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Sort MOCK_DATA by timestamp (most recent first)
  const agentIntelStream = useMemo(() => {
    return [...MOCK_DATA].sort((a, b) => {
      const timeA = a.timestamp || new Date(0);
      const timeB = b.timestamp || new Date(0);
      return timeB.getTime() - timeA.getTime();
    });
  }, []);

  const handleInvestigate = (cardId: number) => {
    // Navigate to Studio with source card ID
    navigate(`/app/workspace/new?source_card_id=${cardId}`);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/app/workspace/${projectId}`);
  };

  const handleNewProject = () => {
    navigate('/app/workspace/new');
  };

  // Calculate stats
  const activeAgents = new Set(MOCK_DATA.map(card => card.agent.type)).size;
  const newInsightsToday = MOCK_DATA.length;

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Header */}
      <header className="pt-20 pb-10 px-6 pl-[140px] border-b border-stone-200">
        <div className="max-w-[1600px] mx-auto">
          {/* Title Row */}
          <div className="flex items-end justify-between mb-2">
            <div>
              <h1 className="font-serif font-bold text-5xl text-stone-900 mb-2">
                Workspace
              </h1>
              <p className="text-sm text-stone-500 font-mono">
                <span className="inline-flex items-center gap-2">
                  <Activity size={14} className="text-orange-500" />
                  <span className="font-semibold text-stone-700">{activeAgents} Agents active</span>
                  <span>·</span>
                  <span className="font-semibold text-stone-700">{newInsightsToday} new insights</span>
                  collected today
                </span>
              </p>
            </div>

            <Button
              onClick={handleNewProject}
              size="lg"
              className="bg-stone-900 hover:bg-stone-800 text-white shadow-lg gap-2"
            >
              <Plus size={18} />
              New Project
            </Button>
          </div>
        </div>
      </header>

      <main className="px-6 pl-[140px] py-12">
        <div className="max-w-[1600px] mx-auto space-y-16">
          {/* Section A: Agent Intel Stream */}
          <section>
            <div className="mb-6">
              <h2 className="font-serif font-bold text-2xl text-stone-900 mb-2">
                Agent Intel Stream
              </h2>
              <p className="text-sm text-stone-500">
                Real-time insights and findings from your active agents
              </p>
            </div>

            {/* Horizontal Scroll Container */}
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex gap-4">
                <AnimatePresence mode="popLayout">
                  {agentIntelStream.map((card) => (
                    <AgentStreamCard
                      key={card.id}
                      data={card}
                      onInvestigate={handleInvestigate}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </section>

          {/* Section B: My Projects */}
          <section>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="font-serif font-bold text-2xl text-stone-900 mb-2">
                  My Projects
                </h2>
                <p className="text-sm text-stone-500">
                  {MOCK_PROJECTS.length} projects · {MOCK_PROJECTS.filter(p => p.status === 'published').length} published
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-white border border-stone-200 p-1 rounded-lg shadow-sm">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'list'
                      ? 'bg-stone-100 text-stone-900'
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'grid'
                      ? 'bg-stone-100 text-stone-900'
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <Grid size={16} />
                </button>
              </div>
            </div>

            {/* Projects Container */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {MOCK_PROJECTS.map((project) => (
                    <ProjectListItem
                      key={project.id}
                      project={project}
                      viewMode={viewMode}
                      onClick={handleProjectClick}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                {/* List Header */}
                <div className="h-12 flex items-center gap-4 px-4 bg-stone-50 border-b border-stone-200 text-xs font-mono uppercase tracking-wide text-stone-500">
                  <div className="flex-shrink-0 w-4"></div>
                  <div className="flex-1">Name</div>
                  <div className="flex-shrink-0 w-20">Type</div>
                  <div className="flex-shrink-0 w-24">Sources</div>
                  <div className="flex-shrink-0 w-32">Modified</div>
                  <div className="flex-shrink-0 w-24">Status</div>
                  <div className="flex-shrink-0 w-8"></div>
                </div>

                {/* List Items */}
                <AnimatePresence mode="popLayout">
                  {MOCK_PROJECTS.map((project) => (
                    <ProjectListItem
                      key={project.id}
                      project={project}
                      viewMode={viewMode}
                      onClick={handleProjectClick}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

