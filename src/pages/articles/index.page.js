import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { POSTS_PATH, postFilePaths } from 'utils/mdx';
import { formatTimecode } from 'utils/timecode';

export { Articles as default } from './Articles';

export function getStaticProps() {
  // Initialize posts array
  const allPosts = postFilePaths.map(filePath => {
    try {
      // Read the file content
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
      const { data, content } = matter(source);

      // Calculate reading time and format it
      const { time } = readingTime(content);
      const timecode = formatTimecode(time);

      // Return the post data
      return {
        ...data,
        timecode,
        slug: filePath.replace(/\.mdx?$/, ''),
      };
    } catch (error) {
      // Log the error and skip the post
      console.error(`Error processing file ${filePath}:`, error);
      return null;
    }
  }).filter(Boolean);  // Remove any null entries in case of errors

  // Identify the featured post
  const featured = allPosts.find(post => post?.featured);

  // Filter out the featured post and sort the remaining ones by date
  const posts = allPosts
    .filter(post => post && (!featured || post.slug !== featured.slug)) // Check if featured exists
    .sort((a, b) => {
      return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();  // Handle missing dates
    })
    .reverse();

  return {
    props: { posts, featured: featured || null },  // Ensure featured is either a post or null
  };
}
