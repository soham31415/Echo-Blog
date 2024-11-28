import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts from API (simulating with a static array)
    const fetchPosts = async () => {
      const response = await fetch('/api/posts'); // Replace with real API
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to Echo Journal</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
