import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">MyBlog</h3>
          <p className="text-gray-400">
            A platform for sharing ideas, stories, and knowledge.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/create-post" className="hover:text-gray-300">Create Post</Link></li>
            <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Categories</h4>
          <ul className="space-y-2">
            <li><Link to="/category/technology" className="hover:text-gray-300">Technology</Link></li>
            <li><Link to="/category/programming" className="hover:text-gray-300">Programming</Link></li>
            <li><Link to="/category/lifestyle" className="hover:text-gray-300">Lifestyle</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">Twitter</a>
            <a href="#" className="hover:text-gray-300">LinkedIn</a>
            <a href="#" className="hover:text-gray-300">GitHub</a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 pt-4 border-t border-gray-700">
        <p className="text-gray-400">
          © {new Date().getFullYear()} MyBlog. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;