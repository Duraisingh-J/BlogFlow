import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { marked } from 'marked';
import MarkdownIt from 'markdown-it';
import { getBlogPost } from '../lib/firebase';
import { BlogPost } from '../types/blog';

const BlogDetail: React.FC = () => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
});
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('No post ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const blogPost = await getBlogPost(id);
        if (blogPost) {
          setPost(blogPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to fetch blog post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || 'Check out this blog post',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            {/* Back Button Skeleton */}
            <div className="h-10 bg-slate-200 rounded w-32 mb-8"></div>
            
            {/* Title Skeleton */}
            <div className="space-y-4 mb-6">
              <div className="h-8 bg-slate-200 rounded w-full"></div>
              <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            </div>

            {/* Meta Skeleton */}
            <div className="flex space-x-6 mb-8">
              <div className="h-5 bg-slate-200 rounded w-32"></div>
              <div className="h-5 bg-slate-200 rounded w-24"></div>
            </div>

            {/* Image Skeleton */}
            <div className="w-full h-96 bg-slate-200 rounded-xl mb-8"></div>

            {/* Content Skeleton */}
            <div className="space-y-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="h-4 bg-slate-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Post Not Found</h1>
          <p className="text-slate-600 mb-6">
            {error || "The blog post you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 group transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center text-slate-600 text-sm mb-6 gap-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(post.createdAt)}
            </div>
            {post.author && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
            )}
            <button
              onClick={handleShare}
              className="flex items-center hover:text-primary-600 transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </header>

        {/* Article Content */}
       <div 
  className="prose prose-lg max-w-none prose-slate prose-headings:text-slate-900 prose-headings:font-bold prose-p:mt-4 prose-p:text-justify prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md"
  dangerouslySetInnerHTML={{ __html: md.render(post.content) }}
/>


        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-slate-600">
              Published on {formatDate(post.createdAt)}
              {post.author && ` by ${post.author}`}
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share this post
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogDetail;