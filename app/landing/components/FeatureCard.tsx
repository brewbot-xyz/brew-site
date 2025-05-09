
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const FeatureCard = ({ title, description, icon, className, children }: FeatureCardProps) => {
  return (
    <div className={cn("bg-brew-card border border-brew-border rounded-xl p-6 flex flex-col h-full transition-all duration-300 hover:border-brew-highlight/50", className)}>
      {icon && <div className="mb-4 text-brew-highlight">{icon}</div>}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-brew-text-secondary mb-4">{description}</p>
      {children}
    </div>
  );
};

export default FeatureCard;
