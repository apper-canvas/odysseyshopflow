import React from 'react';
import { cn } from '@/utils/cn';

const Badge = React.forwardRef(({ 
  className, 
  variant = "default",
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-900",
    primary: "bg-gradient-to-r from-primary to-red-500 text-white",
    secondary: "bg-gradient-to-r from-secondary to-blue-700 text-white",
    success: "bg-gradient-to-r from-success to-green-600 text-white",
    warning: "bg-gradient-to-r from-warning to-yellow-600 text-white",
    error: "bg-gradient-to-r from-error to-red-600 text-white",
    outline: "border border-gray-300 text-gray-700"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;