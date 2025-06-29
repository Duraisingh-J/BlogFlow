import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-8 animate-fadeIn">
            <Sparkles className="h-4 w-4 mr-2" />
            Useful Daily Insights
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 animate-fadeIn">
            Stay Ahead with{' '}
            Stay Ahead with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
              Smart Insights
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fadeIn">
            Discover the latest trends in technology, business intelligence, and innovation. 
            We deliver fresh, actionable insights every day to keep you informed and inspired.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn">
            <a
              href="#latest-posts"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explore Latest Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <button className="inline-flex items-center px-8 py-3 border border-slate-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors duration-200 shadow-sm">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fadeIn">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">365+</div>
              <div className="text-slate-600 mt-1">Daily Posts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">50K+</div>
              <div className="text-slate-600 mt-1">Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">99%</div>
              <div className="text-slate-600 mt-1">AI Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 transform rotate-3 scale-110"></div>
      </div>
    </section>
  );
};

export default Hero;