import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CommandDisplayProps {
  children: ReactNode;
  className?: string;
  user?: {
    name: string;
    avatarUrl: string;
};
  reply?: string;
  accent?: string;
}

const CommandDisplay = ({ children, className, user, reply }: CommandDisplayProps) => {
  return (
    <div className={cn("bg-brew-card border border-brew-border rounded-xl p-4 overflow-hidden", className)}>
      {user && (
        <div className="flex items-center mb-2">
          {user.avatarUrl && (
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <span className="font-medium text-white">{user.name}</span>
          {reply && (
            <span className="ml-2 text-brew-text-muted">{reply}</span>
          )}
        </div>
      )}
      <div className="text-brew-text-primary">
        {children}
      </div>
    </div>
  );
};

export default CommandDisplay;
