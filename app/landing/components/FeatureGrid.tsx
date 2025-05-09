
import React from 'react';
import { cn } from '@/lib/utils';
import FeatureCard from './FeatureCard';

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureGridProps {
  features: Feature[];
  className?: string;
  columns?: 2 | 3 | 4;
}

const FeatureGrid = ({ features, className, columns = 3 }: FeatureGridProps) => {
  const gridColumns = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={cn(`grid gap-6 ${gridColumns[columns]}`, className)}>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  );
};

export default FeatureGrid;
