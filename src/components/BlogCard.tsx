import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <article 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden border border-slate-200 animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center text-sm text-slate-500 mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(post.createdAt)}
          </div>
          {post.author && (
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
          <Link to={`/post/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt || `${post.content.replace(/<[^>]*>/g, '').substring(0, 120)}...`}
        </p>

        {/* Read More Link */}
        <Link
          to={`/post/${post.id}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium group/link"
        >
          Read More
          <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;