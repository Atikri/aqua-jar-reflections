
import { useParams, Navigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  
  // Parse the ID correctly - ensure it's treated as a number for comparison
  const numericId = id ? parseInt(id, 10) : 0;
  
  console.log("BlogPost rendering with ID:", numericId, "Raw ID string:", id);
  console.log("Location state:", location.state);
  
  // Find the blog post with the matching ID from URL params
  const post = blogPosts.find(post => post.id === numericId);
  
  // If no post is found, redirect to 404 page
  if (!post) {
    console.error("No post found with ID:", numericId);
    return <Navigate to="/404" replace />;
  }

  useEffect(() => {
    // Only load markdown content if the post has a markdownFile
    const loadMarkdownContent = async () => {
      if (post.markdownFile) {
        try {
          // Remove leading slash for front-end file references
          const filePathWithoutLeadingSlash = post.markdownFile.replace(/^\//, '');
          console.log("Attempting to load markdown from:", filePathWithoutLeadingSlash);
          const response = await fetch(`/${filePathWithoutLeadingSlash}`);
          if (!response.ok) {
            throw new Error(`Failed to load markdown: ${response.status}`);
          }
          const content = await response.text();
          console.log("Markdown content loaded successfully");
          setMarkdownContent(content);
        } catch (error) {
          console.error("Error loading markdown:", error);
          setMarkdownContent("**Error loading markdown content**");
        }
      }
    };

    console.log("useEffect running for post:", post.id, post.title);
    
    // Clear any existing content first (important for switching between posts)
    setMarkdownContent(null);
    
    if (post.markdownFile) {
      loadMarkdownContent();
    }
    
    // Clean up function to clear markdown content when unmounting or post changes
    return () => {
      console.log("Cleaning up markdown content for post:", post.id);
      setMarkdownContent(null);
    };
  }, [numericId, post]); // Use numericId and post as dependencies

  console.log("Rendering post:", post.title, "Post ID:", post.id, "Has markdown:", !!post.markdownFile);

  return (
    <Layout>
      <article className="py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/blogs" className="flex items-center text-aqua-dark hover:text-aqua mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> 返回博客列表
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.author}</span>
              <span>•</span>
              <Badge variant="outline">{post.category}</Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
          
          {/* Render HTML content if available */}
          {post.content && (
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
          
          {/* Render Markdown content if available */}
          {post.markdownFile && markdownContent && (
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownContent}
              </ReactMarkdown>
            </div>
          )}
          
          {/* Show loading indicator while markdown is loading */}
          {post.markdownFile && !markdownContent && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-aqua border-t-transparent"></div>
            </div>
          )}
          
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button asChild variant="outline">
                <Link to="/blogs">返回博客列表</Link>
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600">分享：</span>
                <Button size="icon" variant="ghost">
                  <span className="sr-only">分享到微信</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.667 18.583a.803.803 0 01-.397-.11l-3.86 1.93.106-3.255a7.062 7.062 0 01-3.121-5.807C1.395 6.495 5.15 2.75 9.667 2.75c3.593 0 6.717 2.356 7.803 5.617-.121-.118-.245-.234-.375-.345.004.16.007.32.007.048 0 4.296-3.761 7.784-8.417 7.784-.309 0-.614-.017-.915-.05-.009 1.217-.022 2.117-.103 2.78z"/>
                    <path d="M22.605 22.452l.09-2.77a5.995 5.995 0 01-2.647-4.921c0-3.308 2.694-6.003 6.002-6.003 3.309 0 6.003 2.695 6.003 6.003 0 3.308-2.694 6.003-6.002 6.003-.264 0-.527-.017-.784-.051-.097 1.043-.102 1.739-.662 1.739z"/>
                  </svg>
                </Button>
                <Button size="icon" variant="ghost">
                  <span className="sr-only">分享到微博</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.098 20.323c-3.977 0-7.215-1.391-7.215-3.109 0-1.719 3.238-3.109 7.215-3.109 3.977 0 7.215 1.39 7.215 3.109 0 1.718-3.238 3.109-7.215 3.109zm5.482-8.052c-.184-.614-1.848-.217-1.543-1.518.303-1.301 2.889.504 1.543 1.518zm1.143-1.763c-1.05-.273-3.537.047-2.834-1.211.703-1.258 3.071.855 2.834 1.211zM21.191 5.415c-.728-6.024-11.312-4.642-15.774-1.42C1.596 6.512.39 9.982 2.465 12.062c2.074 2.08 5.542.889 8.63-1.131 3.087-2.02 10.093-2.503 10.093 3.687 0 2.051-2.382 8.108-9.73 8.108-5.089 0-9.267-3.083-9.267-6.887 0-3.803 4.585-5.97 9.83-5.97 4.222 0 7.082 1.282 8.397 1.928 1.315.646 2.162.356 1.794-.83-.367-1.187-3.138-3.511-5.306-4.279C14.717 5.92 6.42 6.915 6.42 12.531c0 5.615 6.721 10.536 14.907 10.536 8.186 0 12.13-5.313 12.13-9.477 0-4.165-4.83-8.691-12.266-8.175z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
