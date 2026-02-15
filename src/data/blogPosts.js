// Blog posts data
// Import markdown files
import homeServer from '../posts/home-server.md?raw';
import llmInferenceEngine from '../posts/llm-inference-engine.md?raw';
import geospatialIndexVisualizer from '../posts/geospatial-index-visualizer.md?raw';

export const blogPosts = [
  {
    slug: 'home-server',
    title: 'Turning my old HP laptop into a home server',
    date: '2025-11-08',
    markdown: homeServer,
    image: '/home-server.jpeg', // Optional: path to blog post image
    description:
      'How I turned an old HP laptop into a quiet, power-efficient home server for backups, media and self-hosted tools.',
  },
  {
    slug: 'llm-inference-engine',
    title: 'Teaching a tiny LLM to remember: prompt caching in a home‑grown inference engine',
    date: '2025-12-10',
    markdown: llmInferenceEngine,
    description:
      'How I built a tiny prompt cache into a home-grown LLM inference engine, wired it into a REPL, and used it to reuse tokenization work across prompts.',
  },
  {
    slug: 'geospatial-index-visualizer',
    title: 'How spatial indexes actually find things near you',
    date: '2026-02-15',
    markdown: geospatialIndexVisualizer,
    image: '/geo-quadtree.jpeg',
    description:
      'Built an interactive visualizer to compare how five spatial indexing algorithms — Brute Force, Geohash, Quadtree, S2, and H3 — search for nearby points on a map.',
  },
];

