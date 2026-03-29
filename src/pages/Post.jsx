import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '../data/blogPosts';
import Mermaid from '../components/Mermaid';

const Post = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Arsh Jain`;
    } else {
      document.title = 'Post Not Found | Arsh Jain';
    }
  }, [post]);

  if (!post) {
    return (
      <article className="post">
        <header className="post-header">
          <h1>Post Not Found</h1>
        </header>
        <div className="post-content">
          <p>The blog post you're looking for doesn't exist.</p>
          <p><Link to="/blog">Return to blog</Link></p>
        </div>
      </article>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <article className="post">
      <div className="post-content">
        <ReactMarkdown
          components={{
            code({ className, children, ...props }) {
              const match = /language-mermaid/.test(className || '');
              if (match) {
                return <Mermaid chart={String(children).trim()} />;
              }
              return <code className={className} {...props}>{children}</code>;
            },
          }}
        >{post.markdown}</ReactMarkdown>
      </div>
    </article>
  );
};

export default Post;

