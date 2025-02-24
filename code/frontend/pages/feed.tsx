import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Nav from '../components/Nav';

interface Post {
  id: number;
  content: string;
  image?: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    name: string;
    avatar?: string;
  };
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }
    fetch('http://localhost:5000/api/posts', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <div className="max-w-2xl mx-auto mt-20 p-5">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg p-5 mb-5 shadow">
            <div className="flex items-center mb-3">
              {post.author.avatar && (
                <img 
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div>
                <div className="font-bold">{post.author.name}</div>
                <div className="text-gray-600 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <p className="my-3">{post.content}</p>
            {post.image && (
              <img 
                src={post.image}
                alt="Post image"
                className="w-full rounded-lg mt-3"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}