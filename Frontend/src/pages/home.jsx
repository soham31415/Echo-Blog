import React, { useState, useEffect } from 'react';
import { postService } from '../utils/api';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPosts();
        setPosts(response.data.posts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar could go here */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
            {posts.map(post => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </div>
          <div className="hidden md:block">
            {/* Sidebar with categories, popular posts, etc. */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul>
                <li>Technology</li>
                <li>Travel</li>
                <li>Lifestyle</li>
                <li>Programming</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;