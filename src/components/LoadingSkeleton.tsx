import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-shimmer bg-[length:200%_100%]"></div>
      
      {/* Content Skeleton */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center space-x-4 mb-3">
          <div className="h-4 bg-slate-200 rounded w-24"></div>
          <div className="h-4 bg-slate-200 rounded w-16"></div>
        </div>

        {/* Title */}
        <div className="space-y-2 mb-3">
          <div className="h-6 bg-slate-200 rounded w-full"></div>
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
        </div>

        {/* Excerpt */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-2/3"></div>
        </div>

        {/* Read More Link */}
        <div className="h-4 bg-slate-200 rounded w-20"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;