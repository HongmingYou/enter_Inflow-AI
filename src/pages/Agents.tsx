import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Github, Mail, Twitter, CheckCircle2, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InterviewRoom } from '@/components/hiring/index';
import type { AgentCard } from '@/components/hiring/types';

const AGENTS: AgentCard[] = [
  {
    id: 'github-monitor',
    name: 'GitHub Monitor',
    displayName: 'Dev Sentinel',
    tagline: "I keep your code clean and your PRs moving. Nothing slips through my watch.",
    description: 'Monitors your repositories, tracks PR reviews, deployment status, and code quality metrics in real-time.',
    icon: Github,
    category: 'monitoring',
    status: 'active',
    capabilities: ['PR tracking', 'Code reviews', 'CI/CD monitoring', 'Issue management'],
    skills: ['Code Review Analysis', 'PR Quality Scoring', 'CI/CD Pipeline Monitoring', 'Branch Protection', 'Merge Conflict Detection'],
    permissions: ['Read Access to GitHub', 'Repository Webhook Access', 'PR Comment Access'],
    teamsServed: 1247,
    rating: 4.9,
    reviews: 328,
    price: 'Active',
  },
  {
    id: 'email-monitor',
    name: 'Email Monitor',
    displayName: 'Inbox Assistant',
    tagline: "I filter the noise so you focus on what matters. Your inbox, finally tamed.",
    description: 'Scans your inbox, filters important messages, and surfaces actionable items that need your attention.',
    icon: Mail,
    category: 'monitoring',
    status: 'active',
    capabilities: ['Smart filtering', 'Priority detection', 'Auto-categorization', 'Follow-up reminders'],
    skills: ['Email Priority Scoring', 'Smart Categorization', 'Sender Reputation', 'Action Item Extraction', 'Thread Summarization'],
    permissions: ['Read Access to Gmail/Outlook', 'Email Metadata Access'],
    teamsServed: 892,
    rating: 4.7,
    reviews: 215,
    price: 'Active',
  },
  {
    id: 'social-monitor',
    name: 'Social Monitor',
    displayName: 'Brand Watcher',
    tagline: "I track every mention of your brand. Stay ahead of the conversation, always.",
    description: 'Tracks social media mentions, competitor activity, and industry trends across multiple platforms.',
    icon: Twitter,
    category: 'monitoring',
    status: 'available',
    capabilities: ['Mention tracking', 'Sentiment analysis', 'Competitor insights', 'Trend detection'],
    skills: ['Real-time Mention Tracking', 'Sentiment Analysis', 'Competitor Monitoring', 'Trend Detection', 'Influencer Identification'],
    permissions: ['Read Access to Twitter/X', 'LinkedIn Company Page Access', 'Social Listening API Access'],
    teamsServed: 634,
    rating: 4.6,
    reviews: 156,
    price: '$29/mo',
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    displayName: 'Insight Engine',
    tagline: "I turn your data into decisions. See patterns you never knew existed.",
    description: 'Analyzes your data sources, generates insights, and creates automated reports on key metrics.',
    icon: Sparkles,
    category: 'analysis',
    status: 'available',
    capabilities: ['Data analysis', 'Report generation', 'Trend forecasting', 'Anomaly detection'],
    skills: ['Statistical Analysis', 'Trend Forecasting', 'Anomaly Detection', 'Custom Report Generation', 'Data Visualization'],
    permissions: ['Read Access to Analytics Platforms', 'Database Query Access', 'Export Data Access'],
    teamsServed: 423,
    rating: 4.8,
    reviews: 98,
    price: '$49/mo',
  },
  {
    id: 'workflow-automator',
    name: 'Workflow Automator',
    displayName: 'Task Orchestrator',
    tagline: "I automate your repetitive tasks. Free yourself for the work that matters.",
    description: 'Automates repetitive tasks, creates workflows, and integrates with your favorite tools.',
    icon: Bot,
    category: 'automation',
    status: 'coming-soon',
    capabilities: ['Task automation', 'Workflow builder', 'API integrations', 'Smart triggers'],
    skills: ['Workflow Design', 'API Integration', 'Conditional Logic', 'Scheduled Tasks', 'Error Handling'],
    permissions: ['Integration API Access', 'Webhook Configuration', 'Task Execution Rights'],
    teamsServed: 0,
    rating: 0,
    reviews: 0,
    price: 'Coming Soon',
  },
];

export default function Agents() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | AgentCard['category']>('all');
  const [selectedAgent, setSelectedAgent] = useState<AgentCard | null>(null);
  const [isInterviewOpen, setIsInterviewOpen] = useState(false);

  const filteredAgents = selectedCategory === 'all' 
    ? AGENTS 
    : AGENTS.filter(agent => agent.category === selectedCategory);

  const activeAgents = AGENTS.filter(a => a.status === 'active');

  const getStatusBadge = (status: AgentCard['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case 'available':
        return <Badge variant="outline">Available</Badge>;
      case 'coming-soon':
        return <Badge variant="secondary">Coming Soon</Badge>;
    }
  };

  const handleInterviewClick = (agent: AgentCard) => {
    setSelectedAgent(agent);
    setIsInterviewOpen(true);
  };

  const handleHireComplete = (agentId: string) => {
    console.log(`Agent ${agentId} hired successfully!`);
    setIsInterviewOpen(false);
    setSelectedAgent(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/50 backdrop-blur-sm">
        <div className="px-6 py-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-500 shadow-lg">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900">AI Workforce</h1>
              <p className="text-stone-600 mt-1">Hire AI agents to automate your workflow</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 size={16} className="text-green-500" />
              <span className="text-stone-600">
                <span className="font-semibold text-stone-900">{activeAgents.length}</span> agents working
              </span>
            </div>
            <div className="text-stone-300">·</div>
            <div className="text-sm text-stone-600">
              Scanned <span className="font-semibold text-stone-900">2,847</span> events today
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all" onClick={() => setSelectedCategory('all')}>
              All Agents
            </TabsTrigger>
            <TabsTrigger value="monitoring" onClick={() => setSelectedCategory('monitoring')}>
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="analysis" onClick={() => setSelectedCategory('analysis')}>
              Analysis
            </TabsTrigger>
            <TabsTrigger value="automation" onClick={() => setSelectedCategory('automation')}>
              Automation
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent, index) => {
                const Icon = agent.icon;
                
                return (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-300 relative overflow-hidden cursor-pointer"
                      onClick={() => agent.status === 'available' && handleInterviewClick(agent)}
                    >
                      {/* Glow effect for active agents */}
                      {agent.status === 'active' && (
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-400/5 pointer-events-none" />
                      )}

                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          {/* Avatar with breathing animation */}
                          <div className="relative">
                            <div className={`p-3 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 group-hover:from-orange-200 group-hover:to-orange-300 transition-all ${agent.status === 'available' ? 'animate-pulse' : ''}`}>
                              <Icon size={24} className="text-orange-600" />
                            </div>
                            {agent.status === 'active' && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            )}
                          </div>
                          {getStatusBadge(agent.status)}
                        </div>
                        
                        <CardTitle className="text-xl">{agent.displayName}</CardTitle>
                        {/* Tagline in first person */}
                        <CardDescription className="text-stone-600 mt-2 font-serif italic">
                          "{agent.tagline}"
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          {/* Skills/Capabilities */}
                          <div>
                            <div className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">
                              Capabilities
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {agent.capabilities.slice(0, 3).map((capability) => (
                                <Badge 
                                  key={capability} 
                                  variant="secondary" 
                                  className="text-xs"
                                >
                                  {capability}
                                </Badge>
                              ))}
                              {agent.capabilities.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{agent.capabilities.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Stats: teams served, rating */}
                          {agent.teamsServed > 0 && (
                            <div className="flex items-center gap-4 pt-2 text-sm text-stone-500">
                              <div className="flex items-center gap-1">
                                <Users size={14} />
                                <span>{agent.teamsServed.toLocaleString()} teams</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                <span>{agent.rating}</span>
                                <span className="text-stone-400">({agent.reviews})</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="flex flex-col gap-2">
                        {agent.status === 'active' ? (
                          <Button variant="outline" className="w-full" disabled>
                            <CheckCircle2 size={16} className="mr-2" />
                            Currently Active
                          </Button>
                        ) : agent.status === 'available' ? (
                          <>
                            <Button 
                              className="w-full bg-orange-500 hover:bg-orange-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleInterviewClick(agent);
                              }}
                            >
                              Interview
                            </Button>
                            <div className="text-sm text-stone-500 text-center">
                              {agent.price} | Available
                            </div>
                          </>
                        ) : (
                          <Button variant="secondary" className="w-full" disabled>
                            Coming Soon
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-stone-900 mb-3">
              Need a Custom Agent?
            </h2>
            <p className="text-stone-600 mb-6">
              We can build custom AI agents tailored to your specific workflow and business needs.
            </p>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Sparkles size={18} className="mr-2" />
              Request Custom Agent
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Interview Room Modal */}
      {selectedAgent && (
        <InterviewRoom
          agent={selectedAgent}
          isOpen={isInterviewOpen}
          onClose={() => {
            setIsInterviewOpen(false);
            setSelectedAgent(null);
          }}
          onHire={handleHireComplete}
        />
      )}
    </div>
  );
}
