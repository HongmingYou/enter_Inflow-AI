import { useState, useCallback, useEffect } from 'react';
import { Eye, Shield, ShieldCheck, Bell, BellRing, Slack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConversationPanel } from './ConversationPanel';
import { ChoiceCard } from './ChoiceCard';
import { RepositorySelector } from './RepositorySelector';
import { OfferLetter } from './OfferLetter';
import type { 
  InterviewFlowProps, 
  InterviewStage, 
  InterviewConfig, 
  Message,
  ScopeLevel,
  NotificationFrequency,
} from './types';

const generateId = () => Math.random().toString(36).substr(2, 9);

const SCOPE_OPTIONS: { level: ScopeLevel; title: string; description: string; icon: React.ReactNode }[] = [
  {
    level: 'observer',
    title: 'Observer',
    description: 'Read-only access. I will monitor and report, but never take action.',
    icon: <Eye size={20} />,
  },
  {
    level: 'reviewer',
    title: 'Reviewer',
    description: 'I can add comments and suggestions to PRs, but cannot approve or merge.',
    icon: <Shield size={20} />,
  },
  {
    level: 'gatekeeper',
    title: 'Gatekeeper',
    description: 'Full access to review, approve, and enforce code quality standards.',
    icon: <ShieldCheck size={20} />,
  },
];

const NOTIFICATION_OPTIONS: { frequency: NotificationFrequency; title: string; description: string; icon: React.ReactNode }[] = [
  {
    frequency: 'realtime',
    title: 'Real-time',
    description: 'Get notified immediately when something needs your attention.',
    icon: <BellRing size={20} />,
  },
  {
    frequency: 'hourly',
    title: 'Hourly Digest',
    description: 'Receive a summary every hour with all updates.',
    icon: <Bell size={20} />,
  },
  {
    frequency: 'daily',
    title: 'Daily Digest',
    description: 'Get a daily summary each morning.',
    icon: <Bell size={20} />,
  },
];

export function InterviewFlow({ agent, onComplete }: InterviewFlowProps) {
  const [stage, setStage] = useState<InterviewStage>('introduction');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  
  const [config, setConfig] = useState<InterviewConfig>({
    selectedRepositories: [],
    scopeLevel: 'reviewer',
    notificationFrequency: 'daily',
    slackConnected: false,
  });

  const addMessage = useCallback((type: Message['type'], content: string, component?: React.ReactNode) => {
    setMessages(prev => [...prev, {
      id: generateId(),
      type,
      content,
      timestamp: new Date(),
      component,
    }]);
  }, []);

  const simulateTyping = useCallback((callback: () => void, delay = 1000) => {
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      callback();
    }, delay);
  }, []);

  // Initial greeting
  useEffect(() => {
    simulateTyping(() => {
      addMessage('agent', `Hello! I'm ${agent.displayName}, and I'm excited to meet you.

${agent.tagline}

Before we start working together, I'd like to understand your needs better. First, which repositories would you like me to monitor?`);
    }, 1500);
  }, [agent.displayName, agent.tagline, addMessage, simulateTyping]);

  const handleRepositorySelection = (ids: string[]) => {
    setConfig(prev => ({ ...prev, selectedRepositories: ids }));
  };

  const confirmRepositories = () => {
    if (config.selectedRepositories.length === 0) return;
    
    addMessage('user', `I've selected ${config.selectedRepositories.length} repositories.`);
    
    simulateTyping(() => {
      setStage('scope');
      addMessage('agent', `Excellent choice! Now, let's talk about my access level.

How much authority would you like me to have? I can work as an Observer (read-only), Reviewer (can comment), or Gatekeeper (full review authority).`);
    });
  };

  const selectScope = (level: ScopeLevel) => {
    setConfig(prev => ({ ...prev, scopeLevel: level }));
  };

  const confirmScope = () => {
    const scopeOption = SCOPE_OPTIONS.find(o => o.level === config.scopeLevel);
    addMessage('user', `I'd like you to work as a ${scopeOption?.title}.`);
    
    simulateTyping(() => {
      setStage('communication');
      addMessage('agent', `Perfect. As a ${scopeOption?.title}, ${scopeOption?.description.toLowerCase()}

Now, how often would you like me to notify you about updates? I can also connect to Slack for seamless communication.`);
    });
  };

  const selectNotification = (frequency: NotificationFrequency) => {
    setConfig(prev => ({ ...prev, notificationFrequency: frequency }));
  };

  const connectSlack = () => {
    setConfig(prev => ({ ...prev, slackConnected: true }));
    addMessage('user', 'Slack connected successfully!');
  };

  const proceedToOffer = () => {
    const freqOption = NOTIFICATION_OPTIONS.find(o => o.frequency === config.notificationFrequency);
    addMessage('user', `${freqOption?.title} notifications${config.slackConnected ? ', with Slack connected' : ''}.`);
    
    simulateTyping(() => {
      setStage('offer');
      addMessage('agent', `Wonderful! I'm ready to join your team.

Here's my offer letter with all the details we've discussed. Review the terms and sign when you're ready. I'm looking forward to working with you!`);
    }, 1200);
  };

  const handleSign = () => {
    setIsSigned(true);
    
    setTimeout(() => {
      addMessage('agent', `🎉 Thank you for hiring me! I'm now connected to your repositories and ready to start.

You'll find me in your team dashboard. Let's build something great together!`);
      
      setTimeout(() => {
        onComplete(config);
      }, 2000);
    }, 1500);
  };

  // Render interactive components based on stage
  const renderStageContent = () => {
    switch (stage) {
      case 'introduction':
        return (
          <div className="p-4 border-t border-stone-200 bg-stone-50/50">
            <div className="space-y-3">
              <RepositorySelector
                selectedIds={config.selectedRepositories}
                onSelectionChange={handleRepositorySelection}
              />
              {config.selectedRepositories.length > 0 && (
                <Button 
                  onClick={confirmRepositories}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Continue with {config.selectedRepositories.length} repositories
                </Button>
              )}
            </div>
          </div>
        );
      
      case 'scope':
        return (
          <div className="p-4 border-t border-stone-200 bg-stone-50/50">
            <div className="space-y-3">
              {SCOPE_OPTIONS.map((option) => (
                <ChoiceCard
                  key={option.level}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  isSelected={config.scopeLevel === option.level}
                  onClick={() => selectScope(option.level)}
                />
              ))}
              <Button 
                onClick={confirmScope}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                Continue as {SCOPE_OPTIONS.find(o => o.level === config.scopeLevel)?.title}
              </Button>
            </div>
          </div>
        );
      
      case 'communication':
        return (
          <div className="p-4 border-t border-stone-200 bg-stone-50/50">
            <div className="space-y-3">
              {NOTIFICATION_OPTIONS.map((option) => (
                <ChoiceCard
                  key={option.frequency}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  isSelected={config.notificationFrequency === option.frequency}
                  onClick={() => selectNotification(option.frequency)}
                />
              ))}
              
              <div className="pt-3 border-t border-stone-200">
                {!config.slackConnected ? (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={connectSlack}
                  >
                    <Slack size={18} className="mr-2" />
                    Connect Slack (Optional)
                  </Button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-green-600 py-2">
                    <Slack size={18} />
                    <span className="font-medium">Slack Connected</span>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={proceedToOffer}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                Review Offer Letter
              </Button>
            </div>
          </div>
        );
      
      case 'offer':
        return (
          <div className="p-4 border-t border-stone-200 bg-stone-50/50">
            <OfferLetter
              agent={agent}
              config={config}
              onSign={handleSign}
              isSigned={isSigned}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ConversationPanel 
        messages={messages} 
        isThinking={isThinking}
      />
      {renderStageContent()}
    </div>
  );
}
