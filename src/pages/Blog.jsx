import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
  useEffect(() => {
    document.title = 'Blog | Arsh Jain';
  }, []);

  // Group posts by year
  const postsByYear = blogPosts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  // Sort years in descending order
  const years = Object.keys(postsByYear).sort((a, b) => b - a);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <div className="blog-page">
      <h1 className="blog-page-title">Blog</h1>
      <div className="blog-container">
        {years.map(year => (
          <div key={year} className="blog-year-group">
            <h2 className="blog-year">{year}</h2>
            <div className="blog-posts-list">
              {postsByYear[year].map(post => (
                <Link 
                  key={post.slug} 
                  to={`/post/${post.slug}`} 
                  className="blog-post-item"
                >
                  <div className="blog-post-content">
                    <span className="blog-post-date">{formatDate(post.date)}</span>
                    <div className="blog-post-text">
                      <span className="blog-post-title">{post.title}</span>
                      {post.description && (
                        <p className="blog-post-description">{post.description}</p>
                      )}
                    </div>
                  </div>
                  {post.image && (
                    <div className="blog-post-image-wrapper">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="blog-post-image"
                      />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;