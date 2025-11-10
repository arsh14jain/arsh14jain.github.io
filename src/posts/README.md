# Blog Posts

This directory contains markdown files for blog posts.

## Adding a New Blog Post

1. Create a new `.md` file in this directory with the slug as the filename (e.g., `my-new-post.md`)

2. Write your blog post content in markdown format. You can use:
   - Headings (`#`, `##`, `###`)
   - Paragraphs
   - Lists (ordered and unordered)
   - Links
   - Code blocks
   - And all other standard markdown features

3. Add the post metadata to `/src/data/blogPosts.js`:
   ```javascript
   import myNewPost from '../posts/my-new-post.md?raw';
   
   export const blogPosts = [
     // ... existing posts
     {
       slug: 'my-new-post',
       title: 'My New Post',
       date: '2025-12-01',
       markdown: myNewPost
     }
   ];
   ```

4. The post will automatically appear on the blog page and be accessible at `/post/my-new-post`

## Example Markdown Structure

```markdown
This is the first paragraph of your blog post.

## A Section Heading

More content here with **bold** and *italic* text.

- List item 1
- List item 2

[Link text](https://example.com)
```

Note: Do not include the title in the markdown file - it's already specified in `blogPosts.js`.

