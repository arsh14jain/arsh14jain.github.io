// Blog posts data
// Import markdown files
import homeServer from '../posts/home-server.md?raw';

export const blogPosts = [
  {
    slug: 'home-server',
    title: 'Turning my old HP laptop into a home server',
    date: '2025-11-08',
    markdown: homeServer,
    image: '/home-server.jpeg', // Optional: path to blog post image
    description: 'This is a description of my first blog post. It provides a brief overview of what readers can expect to learn from this article.'
  }
];

