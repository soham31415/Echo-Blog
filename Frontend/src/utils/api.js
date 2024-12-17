import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authService = {
  register: (username, email, password) => 
    api.post('/register', { uname: username, uemail: email, upassword: password }),
  
  login: (username, password) => 
    api.post('/login', { uname: username, upassword: password }),
  
  getUserProfile: (username) => 
    api.get(`/user/${username}`),
};

export const postService = {
  getAllPosts: (limit = 10, offset = 0) => 
    api.get(`/posts?limit=${limit}&offset=${offset}`),
  
  getPostById: (postId) => 
    api.get(`/posts/${postId}`),
  
  createPost: (postData) => 
    api.post('/addPost', postData),
  
  updatePost: (postId, postData) => 
    api.put(`/updatePost/${postId}`, postData),
  
  deletePost: (postId) => 
    api.delete(`/posts/${postId}`),
};

export const userService = {
  updateProfile: (username, userData) => 
    api.put(`/updateUser/${username}`, userData),
  
  deleteProfile: (username, password) => 
    api.delete(`/deleteUser/${username}`, { data: { upassword: password } }),
};