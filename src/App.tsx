import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<BlogPost />} />
            <Route path="/about" element={
              <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-2xl">
                  <h1 className="text-4xl font-bold text-slate-900 mb-6">About BlogFlow</h1>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    BlogFlow is an AI-powered platform that delivers daily insights on technology, 
                    business intelligence, and innovation. Our advanced AI agent curates and creates 
                    high-quality content to keep you informed about the latest trends and developments 
                    in the digital world.
                  </p>
                </div>
              </div>
            } />
            <Route path="/contact" element={
              <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-2xl">
                  <h1 className="text-4xl font-bold text-slate-900 mb-6">Contact Us</h1>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    Have questions or suggestions? We'd love to hear from you. 
                    Reach out to our team for any inquiries about BlogFlow.
                  </p>
                  <div className="space-y-4">
                    <p className="text-slate-600">
                      <strong>Email:</strong> hello@blogflow.ai
                    </p>
                    <p className="text-slate-600">
                      <strong>Support:</strong> support@blogflow.ai
                    </p>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;