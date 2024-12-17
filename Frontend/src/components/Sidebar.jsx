import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const categories = [
    'Technology', 
    'Programming', 
    'Lifestyle', 
    'Travel', 
    'Design', 
    'Personal Development'
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <Link 
                to={`/category/${category.toLowerCase()}`} 
                className="text-gray-700 hover:text-blue-500 transition-colors"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Popular Posts</h3>
        <ul className="space-y-3">
          {[
            { title: 'Introduction to React', link: '/post/1' },
            { title: 'JavaScript Best Practices', link: '/post/2' },
            { title: 'Design Trends 2024', link: '/post/3' }
          ].map(post => (
            <li key={post.title}>
              <Link 
                to={post.link} 
                className="text-gray-700 hover:text-blue-500 truncate block"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
        <form className="space-y-3">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;