import React from 'react';
import Hero from '../components/Hero';
import BlogList from '../components/BlogList';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <BlogList />
    </div>
  );
};

export default Home;