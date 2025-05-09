import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  className?: string;
}

const StatCard = ({ value, label, icon, className }: StatCardProps) => {
  return (
    <div className={cn("bg-brew-card border border-brew-border rounded-lg p-4 flex flex-col items-center transition-all duration-300 hover:border-brew-highlight/50", className)}>
      {icon && <div className="mb-2 text-brew-highlight">{icon}</div>}
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-brew-text-secondary text-sm">{label}</div>
    </div>
  );
};

export default StatCard;
