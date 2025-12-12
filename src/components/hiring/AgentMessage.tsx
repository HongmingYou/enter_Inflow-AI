import type { AgentMessageProps } from './types';

export function AgentMessage({ content, children }: AgentMessageProps) {
  return (
    <div className="flex flex-col gap-3 max-w-[85%]">
      <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-stone-100">
        <p className="font-serif text-stone-800 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
      {children && (
        <div className="ml-2">
          {children}
        </div>
      )}
    </div>
  );
}
