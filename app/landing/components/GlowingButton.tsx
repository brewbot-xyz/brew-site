import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowingButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
}

const GlowingButton = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  href,
  onClick
}: GlowingButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    primary: "bg-brew-highlight hover:bg-brew-highlight/90 text-white shadow-[0_0_10px_rgba(182,30,18,0.5)]",
    secondary: "bg-brew-dark border border-brew-border hover:border-brew-highlight/50 hover:bg-brew-darker text-white"
  };
  
  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 py-3 text-lg"
  };
  
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );
  
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default GlowingButton;