import type { UserMessageProps } from './types';

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] bg-[#FFF7ED] rounded-2xl rounded-tr-md px-4 py-3">
        <p className="text-stone-800 leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}
